import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Users, Heart, Shield, MessageCircle, Baby, Home, Crown, Sparkles, Clock, TrendingUp, Gamepad2 } from "lucide-react";

const suggestionSchema = z.object({
  title: z.string()
    .trim()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z.string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" })
});

const COMMUNITY_THREADS = [
  {
    id: "football-banter",
    title: "Football Banter",
    description: "Match discussions, transfer gossip, and legendary banter with fellow fans",
    icon: Gamepad2,
    color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
    iconColor: "text-emerald-600",
    members: "4.5k",
    posts: 312,
    lastActive: "just now",
    trending: true
  },
  {
    id: "parenting",
    title: "Parenting",
    description: "Navigate the beautiful chaos of raising children, share wins and struggles",
    icon: Baby,
    color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
    iconColor: "text-pink-600",
    members: "2.1k",
    posts: 89,
    lastActive: "2 min ago",
    trending: true
  },
  {
    id: "mens-cave",
    title: "Men's Cave",
    description: "A brotherhood for authentic conversations about masculinity and mental health",
    icon: Shield,
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    iconColor: "text-blue-600",
    members: "1.8k",
    posts: 156,
    lastActive: "5 min ago",
    trending: false
  },
  {
    id: "broken-but-healed",
    title: "Broken but Healed",
    description: "Stories of resilience, recovery, and finding light in the darkest moments",
    icon: Heart,
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    iconColor: "text-green-600",
    members: "3.2k",
    posts: 234,
    lastActive: "1 min ago",
    trending: true
  },
  {
    id: "sexualities-and-sex",
    title: "Sexualities and Sex",
    description: "Open, honest discussions about intimacy, identity, and sexual wellness",
    icon: Sparkles,
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    iconColor: "text-purple-600",
    members: "1.9k",
    posts: 67,
    lastActive: "12 min ago",
    trending: false
  },
  {
    id: "real-life-confessions",
    title: "Real Life Confessions",
    description: "Anonymous safe space to share your deepest secrets and truths",
    icon: MessageCircle,
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    iconColor: "text-orange-600",
    members: "2.7k",
    posts: 445,
    lastActive: "3 min ago",
    trending: true
  },
  {
    id: "unspoken-marriages",
    title: "Unspoken Marriages",
    description: "The real talk about relationships, love, and partnership challenges",
    icon: Crown,
    color: "bg-red-50 border-red-200 hover:bg-red-100",
    iconColor: "text-red-600",
    members: "2.3k",
    posts: 178,
    lastActive: "8 min ago",
    trending: false
  },
  {
    id: "womens-circle",
    title: "Women's Circle",
    description: "Sisterhood, empowerment, and support through all seasons of womanhood",
    icon: Users,
    color: "bg-teal-50 border-teal-200 hover:bg-teal-100",
    iconColor: "text-teal-600",
    members: "2.9k",
    posts: 198,
    lastActive: "4 min ago",
    trending: true
  },
  {
    id: "family",
    title: "Family",
    description: "Complex family dynamics, generational healing, and creating new traditions",
    icon: Home,
    color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
    iconColor: "text-indigo-600",
    members: "2.0k",
    posts: 134,
    lastActive: "15 min ago",
    trending: false
  }
];

interface ThreadsListProps {
  onThreadSelect: (threadId: string) => void;
}

export default function ThreadsList({ onThreadSelect }: ThreadsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [threadTitle, setThreadTitle] = useState("");
  const [threadDescription, setThreadDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCreateThread = async () => {
    try {
      // Validate input
      const validated = suggestionSchema.parse({
        title: threadTitle,
        description: threadDescription
      });

      setIsSubmitting(true);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to suggest a community",
          variant: "destructive",
        });
        return;
      }

      // Insert suggestion into database
      const { error } = await supabase
        .from('community_suggestions')
        .insert({
          title: validated.title,
          description: validated.description,
          suggested_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Suggestion submitted!",
        description: "Your community suggestion has been submitted for admin review. You'll be notified once it's reviewed.",
      });

      setThreadTitle("");
      setThreadDescription("");
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error("Error submitting suggestion:", error);
        toast({
          title: "Error",
          description: "Failed to submit suggestion. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">All Communities</h2>
          <p className="text-slate-600">Choose a community to join the conversation</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Create New Thread
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Community Thread</DialogTitle>
              <DialogDescription>
                Share your idea for a new community discussion thread.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Thread Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Tech Enthusiasts"
                  value={threadTitle}
                  onChange={(e) => setThreadTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this community thread is about..."
                  value={threadDescription}
                  onChange={(e) => setThreadDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                onClick={handleCreateThread}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Suggestion"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 animate-fade-in">
        {COMMUNITY_THREADS.map(thread => {
          const IconComponent = thread.icon;
          return (
            <div
              key={thread.id}
              className={`${thread.color} rounded-2xl border transition-all duration-200 p-6 flex flex-col cursor-pointer transform hover:scale-105`}
              onClick={() => onThreadSelect(thread.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-white/80 ${thread.iconColor}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-800">{thread.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {thread.members}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {thread.posts} posts
                      </span>
                    </div>
                  </div>
                </div>
                {thread.trending && (
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>

              <p className="text-slate-700 mb-4 flex-1 leading-relaxed">
                {thread.description}
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  Active {thread.lastActive}
                </div>
                <Button 
                  variant="outline" 
                  className="text-primary hover:text-primary hover:bg-accent font-medium w-full border-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onThreadSelect(thread.id);
                  }}
                >
                  Join Discussion →
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
