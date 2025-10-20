import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Share2, Trophy, Users, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FootballBanter = () => {
  const [newComment, setNewComment] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "RedDevil23",
      time: "2 hours ago",
      content: "Ten Hag masterclass today! That tactical setup was pure genius. 🔴⚪",
      likes: 45,
      comments: 12,
      liked: false
    },
    {
      id: 2,
      author: "BlueIsTheColour",
      time: "3 hours ago",
      content: "Chelsea's new signing is looking sharp! Can't wait for the derby match. 💙",
      likes: 32,
      comments: 8,
      liked: false
    },
    {
      id: 3,
      author: "Gunner4Life",
      time: "5 hours ago",
      content: "Arsenal top of the league! This is our year boys! 🔴⚪ #COYG",
      likes: 67,
      comments: 24,
      liked: false
    },
    {
      id: 4,
      author: "KopiteKing",
      time: "6 hours ago",
      content: "Liverpool's pressing game is back! Klopp has the boys fired up again 🔥",
      likes: 89,
      comments: 31,
      liked: false
    }
  ]);
  const { toast } = useToast();

  const handlePost = () => {
    if (!newComment.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      author: "You",
      time: "Just now",
      content: newComment,
      likes: 0,
      comments: 0,
      liked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewComment("");
    toast({
      title: "Posted!",
      description: "Your banter has been shared with the community",
    });
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleWhatsAppJoin = () => {
    window.open("https://chat.whatsapp.com/football-banter-group", "_blank");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-50/40">
      <Header />
      
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Community Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">Football Banter</h1>
          </div>
          <p className="text-lg opacity-90 mb-4">
            Match discussions, transfer gossip, and legendary banter with fellow fans
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>4.5k members</span>
            </div>
            <span className="text-emerald-200">•</span>
            <span className="text-emerald-200">Active now</span>
          </div>
        </div>

        {/* Post Input */}
        <Card className="p-6 mb-6">
          <div className="flex gap-4">
            <Avatar>
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                placeholder="Share your hot take or banter..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePost()}
                className="mb-3"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Keep it friendly and respectful!
                </span>
                <Button 
                  onClick={handlePost}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={!newComment.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Banter Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{post.author}</span>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </div>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.liked ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'
                      }`}
                    >
                      <ThumbsUp className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Community Guidelines */}
        <Card className="mt-8 p-6 bg-emerald-50 border-emerald-200">
          <h3 className="font-semibold text-emerald-900 mb-3">Community Guidelines</h3>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li>• Keep the banter friendly and fun - no personal attacks</li>
            <li>• Respect all clubs and their supporters</li>
            <li>• No hate speech, racism, or discrimination</li>
            <li>• Share memes, opinions, and hot takes freely</li>
            <li>• Join our WhatsApp group for live match discussions</li>
          </ul>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default FootballBanter;