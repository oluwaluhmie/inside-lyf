
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, MessageCircle, Share, Send, Users, TrendingUp } from "lucide-react";

interface ThreadViewProps {
  threadId: string;
  onBack: () => void;
}

const THREAD_DATA: Record<string, any> = {
  "parenting": {
    title: "Parenting",
    description: "Navigate the beautiful chaos of raising children, share wins and struggles",
    members: "2.1k",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  "mens-cave": {
    title: "Men's Cave", 
    description: "A brotherhood for authentic conversations about masculinity and mental health",
    members: "1.8k",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  }
};

const SAMPLE_POSTS = [
  {
    id: 1,
    author: "Sarah M.",
    avatar: "SM",
    timeAgo: "2 hours ago",
    content: "Just had one of those days where nothing went according to plan with my 3-year-old. Meltdown in the grocery store, refused to nap, and I found crayon marks on the wall. But then at bedtime, she hugged me and said 'I love you mama' and suddenly it all felt worth it. Anyone else have days like this?",
    likes: 24,
    replies: 8,
    isLiked: false
  },
  {
    id: 2,
    author: "Mike T.",
    avatar: "MT",
    timeAgo: "4 hours ago", 
    content: "Feeling overwhelmed as a single dad. My ex moved across the country and now it's just me and my 8-year-old son. Work is demanding, school events are constant, and I feel like I'm failing at everything. How do other single parents manage it all?",
    likes: 31,
    replies: 12,
    isLiked: true
  },
  {
    id: 3,
    author: "Anonymous",
    avatar: "A",
    timeAgo: "6 hours ago",
    content: "My teenager came out to me yesterday. I want to be supportive but I honestly don't know what to say or do. I love them unconditionally but I'm scared I'll say the wrong thing. Any advice from parents who've been through this?",
    likes: 18,
    replies: 15,
    isLiked: false
  }
];

export default function ThreadView({ threadId, onBack }: ThreadViewProps) {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  
  const threadData = THREAD_DATA[threadId] || {
    title: "Community Thread",
    description: "Join the conversation",
    members: "1k",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: "You",
        avatar: "Y",
        timeAgo: "Just now",
        content: newPost,
        likes: 0,
        replies: 0,
        isLiked: false
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Communities
        </Button>
      </div>

      {/* Thread Header */}
      <div className={`${threadData.bgColor} rounded-2xl p-6 border`}>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${threadData.color} mb-2`}>
              {threadData.title}
            </h1>
            <p className="text-slate-700 mb-4">{threadData.description}</p>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {threadData.members} members
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Very Active
              </span>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            Join Community
          </Button>
        </div>
      </div>

      {/* New Post Section */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Share your thoughts</h3>
        <div className="space-y-4">
          <Textarea
            placeholder="What's on your mind? Share your experience, ask for advice, or just let it out..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Anonymous</Badge>
              <span className="text-sm text-slate-500">Your post will be anonymous by default</span>
            </div>
            <Button 
              onClick={handleSubmitPost}
              disabled={!newPost.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </div>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Recent Discussions</h3>
        {posts.map(post => (
          <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-slate-800">{post.author}</span>
                  <span className="text-sm text-slate-500">{post.timeAgo}</span>
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 ${post.isLiked ? 'text-red-500' : 'text-slate-500'}`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-slate-500">
                    <MessageCircle className="w-4 h-4" />
                    {post.replies}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-slate-500">
                    <Share className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
