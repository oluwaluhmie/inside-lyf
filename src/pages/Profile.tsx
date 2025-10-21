import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import MobileNav from "../components/MobileNav";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Heart, MessageCircle, Bookmark, Edit, Calendar, Feather, Sparkles, Award, Loader2 } from "lucide-react";
import StoriesGrid from "../components/StoriesGrid";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("stories");
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userStories, setUserStories] = useState<any[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: "",
    bio: "",
    avatar_url: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
        setEditForm({
          full_name: data?.full_name || "",
          bio: data?.bio || "",
          avatar_url: data?.avatar_url || ""
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    const fetchUserStories = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUserStories(data || []);
      } catch (error) {
        console.error('Error fetching user stories:', error);
      } finally {
        setLoadingStories(false);
      }
    };

    fetchUserStories();

    if (!user) return;

    // Set up real-time subscription for posts
    const channel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchUserStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      if (!user) return;
      
      try {
        const { count, error } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (error) throw error;
        setCommentsCount(count || 0);
      } catch (error) {
        console.error('Error fetching comments count:', error);
      }
    };

    fetchCommentsCount();

    if (!user) return;

    // Set up real-time subscription for comments
    const channel = supabase
      .channel('comments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchCommentsCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-4">Please log in to view your profile</p>
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const displayName = profile.full_name || profile.email || "User";
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  
  const userStats = {
    storiesShared: userStories.length,
    relates: userStories.reduce((sum, story) => sum + (story.like_count || 0), 0),
    comments: commentsCount,
    totalViews: userStories.reduce((sum, story) => sum + (story.view_count || 0), 0),
  };

  const badges = [
    { icon: Feather, label: "Storyteller", color: "text-primary" },
    { icon: Sparkles, label: "Empath", color: "text-secondary" },
    { icon: Award, label: "Uplifter", color: "text-primary" },
  ];

  const handleEditProfile = () => {
    setAvatarPreview(profile?.avatar_url || "");
    setAvatarFile(null);
    setIsEditDialogOpen(true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      let avatarUrl = editForm.avatar_url;

      // Upload avatar if a new file was selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, {
            upsert: true
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        avatarUrl = publicUrl;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          bio: editForm.bio,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setProfile({
        ...profile,
        full_name: editForm.full_name,
        bio: editForm.bio,
        avatar_url: avatarUrl
      });

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsEditDialogOpen(false);
      setAvatarFile(null);
      setAvatarPreview("");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Profile Header Card */}
        <div className="bg-card rounded-3xl shadow-lg border border-border p-6 sm:p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-lg">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={displayName} className="w-full h-full rounded-full object-cover" />
              ) : (
                initials
              )}
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-2">{displayName}</h1>
              {profile.bio && (
                <p className="text-lg text-muted-foreground italic mb-4">
                  "{profile.bio}"
                </p>
              )}
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2" onClick={handleEditProfile}>
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-secondary/20 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary mb-1">
                {userStats.storiesShared}
              </div>
              <div className="text-sm text-muted-foreground">Stories Shared</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary mb-1">
                {userStats.relates}
              </div>
              <div className="text-sm text-muted-foreground">Relates</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary mb-1">
                {userStats.comments}
              </div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </div>
            <div className="text-center p-4 bg-secondary/20 rounded-2xl hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary mb-1">
                {userStats.totalViews}
              </div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
          </div>

          {/* Badge Display Row */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Icon className={`w-5 h-5 ${badge.color}`} />
                  <span className="font-medium text-foreground">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-8 bg-card rounded-2xl p-2 shadow-md">
            <TabsTrigger value="stories" className="rounded-xl">
              My Stories
            </TabsTrigger>
            <TabsTrigger value="reflections" className="rounded-xl">
              My Reflections
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-xl">
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="animate-fade-in">
            <div className="mb-6 flex justify-between items-center">
              <h2>My Stories</h2>
              <Link to="/write">
                <Button className="gap-2">
                  <Edit className="w-4 h-4" />
                  Write New Story
                </Button>
              </Link>
            </div>
            
            {loadingStories ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : userStories.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-3xl border border-border">
                <p className="text-muted-foreground mb-4">You haven't shared any stories yet</p>
                <Link to="/write">
                  <Button>Share Your First Story</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userStories.map((story) => (
                  <Link
                    key={story.id}
                    to={`/story/${story.id}`}
                    className="bg-card rounded-3xl p-6 border border-border hover:shadow-xl transition-all hover:scale-105"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {story.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {story.like_count || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {story.view_count || 0} views
                      </span>
                      <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                        story.status === 'published' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {story.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reflections" className="animate-fade-in">
            <div className="grid lg:grid-cols-[1fr_300px] gap-8">
              {/* Reflections List */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2>My Reflections</h2>
                  <Link to="/reflect">
                    <Button className="gap-2">
                      <Calendar className="w-4 h-4" />
                      New Reflection
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {[
                    { date: "Today", prompt: "What moment made you grateful?", text: "Connecting with old friends reminded me how important community is..." },
                    { date: "Yesterday", prompt: "Who would you thank?", text: "I'd thank my mentor for believing in me when I didn't believe in myself..." },
                    { date: "2 days ago", prompt: "What did you learn today?", text: "I learned that vulnerability isn't weakness, it's courage..." },
                  ].map((reflection, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-3xl p-6 border border-border hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">{reflection.date}</span>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{reflection.prompt}</h3>
                      <p className="text-foreground/80">{reflection.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar Streak Sidebar */}
              <div className="space-y-6">
                <div className="bg-card rounded-3xl p-6 border border-border shadow-md">
                  <h3 className="font-semibold mb-4">Reflection Streak</h3>
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-primary mb-2">7</div>
                    <div className="text-sm text-muted-foreground">Days in a row</div>
                  </div>
                  {/* Mini Calendar */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="font-semibold text-muted-foreground">{day}</div>
                    ))}
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg flex items-center justify-center ${
                          i < 7 ? 'bg-primary text-primary-foreground' : 'bg-secondary/30'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="bg-card rounded-3xl p-6 border border-border shadow-md">
                  <h3 className="font-semibold mb-4">For You</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-secondary/20 rounded-xl">
                      <p className="text-sm font-medium mb-1">Stories you might relate to</p>
                      <p className="text-xs text-muted-foreground">Based on your reflections</p>
                    </div>
                    <div className="p-3 bg-secondary/20 rounded-xl">
                      <p className="text-sm font-medium mb-1">12 readers found comfort</p>
                      <p className="text-xs text-muted-foreground">In your latest post</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="animate-fade-in">
            <h2 className="mb-6">Saved Stories</h2>
            <StoriesGrid />
          </TabsContent>
        </Tabs>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile information. Changes will be visible to other community members.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture</Label>
                {avatarPreview && (
                  <div className="flex justify-center mb-4">
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="w-24 h-24 rounded-full object-cover border-2 border-border"
                    />
                  </div>
                )}
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <p className="text-xs text-muted-foreground">
                  Upload an image file to use as your profile picture
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      
      <ScrollToTop />
      <Footer />
      <MobileNav />
    </div>
  );
}
