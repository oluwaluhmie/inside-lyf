
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, Mail, Calendar, MapPin, MessageSquare, Heart, Trophy, Shield, Edit } from "lucide-react";

const MOCK_USER_PROFILES = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah@email.com",
    avatar: "/placeholder.svg",
    role: "Premium User",
    isPremium: true,
    premiumId: "PM-2024-001",
    joinDate: "January 15, 2024",
    location: "San Francisco, CA",
    bio: "Mother of two, passionate about mindful parenting and community building.",
    stats: {
      posts: 45,
      comments: 128,
      likes: 342,
      following: 67,
      followers: 89
    },
    badges: ["Early Adopter", "Community Helper", "Storyteller"],
    recentActivity: [
      { type: "post", content: "Shared a story about overcoming postpartum depression", date: "2 hours ago" },
      { type: "comment", content: "Commented on 'Finding balance as a working mom'", date: "5 hours ago" },
      { type: "like", content: "Liked 'The importance of self-care'", date: "1 day ago" }
    ],
    circles: ["Parenting", "Women's Circle", "Broken but Healed"]
  },
  {
    id: 2,
    name: "Mark Johnson",
    email: "mark@email.com",
    avatar: "/placeholder.svg",
    role: "Moderator",
    isPremium: false,
    joinDate: "February 3, 2024",
    location: "Austin, TX",
    bio: "Advocate for men's mental health and authentic masculinity.",
    stats: {
      posts: 32,
      comments: 95,
      likes: 234,
      following: 45,
      followers: 156
    },
    badges: ["Moderator", "Mental Health Advocate", "Trusted Voice"],
    recentActivity: [
      { type: "moderate", content: "Approved 5 posts in Men's Cave", date: "1 hour ago" },
      { type: "post", content: "Started discussion about vulnerability", date: "3 hours ago" },
      { type: "comment", content: "Provided support in crisis thread", date: "6 hours ago" }
    ],
    circles: ["Men's Cave", "Broken but Healed"],
    moderatedCircles: ["Men's Cave"]
  }
];

interface UserProfileManagementProps {
  userRole?: 'admin' | 'moderator';
}

export default function UserProfileManagement({ userRole = 'admin' }: UserProfileManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const filteredUsers = MOCK_USER_PROFILES.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewUserProfile = (user: any) => {
    setSelectedUser(user);
    setIsProfileDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">User Profiles</h3>
        </div>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {user.isPremium && (
                      <div className="absolute -top-1 -right-1 bg-amber-600 rounded-full p-1">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{user.name}</CardTitle>
                      {user.isPremium && (
                        <Badge className="bg-amber-100 text-amber-800 text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">{user.email}</CardDescription>
                    {user.isPremium && user.premiumId && (
                      <div className="text-xs text-amber-600 font-mono">
                        ID: {user.premiumId}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <Badge variant={user.role.includes('Moderator') ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{user.stats.posts} posts</span>
                  <span>{user.stats.followers} followers</span>
                  <span>Joined {user.joinDate.split(' ')[0]}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => viewUserProfile(user)}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* User Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="circles">Circles</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                      <AvatarFallback className="text-lg">
                        {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {selectedUser.isPremium && (
                      <div className="absolute -top-2 -right-2 bg-amber-600 rounded-full p-2">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                      <Badge variant={selectedUser.role.includes('Moderator') ? 'default' : 'secondary'}>
                        {selectedUser.role}
                      </Badge>
                      {selectedUser.isPremium && (
                        <Badge className="bg-amber-100 text-amber-800">
                          Premium Member
                        </Badge>
                      )}
                    </div>
                    {selectedUser.isPremium && selectedUser.premiumId && (
                      <div className="mb-2">
                        <span className="text-sm text-muted-foreground">Premium ID: </span>
                        <span className="font-mono text-sm bg-amber-50 px-2 py-1 rounded">
                          {selectedUser.premiumId}
                        </span>
                      </div>
                    )}
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedUser.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Joined {selectedUser.joinDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedUser.location}
                      </div>
                    </div>
                    <p className="mt-3 text-sm">{selectedUser.bio}</p>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold">{selectedUser.stats.posts}</div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <div className="font-semibold">{selectedUser.stats.comments}</div>
                      <div className="text-sm text-muted-foreground">Comments</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <div className="font-semibold">{selectedUser.stats.likes}</div>
                      <div className="text-sm text-muted-foreground">Likes</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <User className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="font-semibold">{selectedUser.stats.following}</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <User className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <div className="font-semibold">{selectedUser.stats.followers}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Badges & Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.badges.map((badge: string) => (
                      <Badge key={badge} variant="outline" className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <h3 className="font-semibold">Recent Activity</h3>
                <div className="space-y-3">
                  {selectedUser.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="mt-1">
                        {activity.type === 'post' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'comment' && <MessageSquare className="w-4 h-4 text-green-600" />}
                        {activity.type === 'like' && <Heart className="w-4 h-4 text-red-600" />}
                        {activity.type === 'moderate' && <Shield className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.content}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="circles" className="space-y-4">
                <h3 className="font-semibold">Community Circles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedUser.circles.map((circle: string) => (
                    <div key={circle} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{circle}</span>
                      <Badge variant="secondary">Member</Badge>
                    </div>
                  ))}
                </div>
                
                {selectedUser.moderatedCircles && (
                  <>
                    <h3 className="font-semibold mt-6">Moderated Circles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedUser.moderatedCircles.map((circle: string) => (
                        <div key={circle} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{circle}</span>
                          <Badge>Moderator</Badge>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <h3 className="font-semibold">Profile Settings</h3>
                {userRole === 'admin' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Account Status</h4>
                        <p className="text-sm text-muted-foreground">Manage user account status</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Role Management</h4>
                        <p className="text-sm text-muted-foreground">Change user role and permissions</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Role
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Account Actions</h4>
                        <p className="text-sm text-muted-foreground">Suspend or restrict account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
