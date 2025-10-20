
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, MessageCircle, Share, Send, Users, TrendingUp, Star, Trophy } from "lucide-react";

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
    bgColor: "bg-pink-50",
    topStory: {
      title: "How I learned to embrace imperfect parenting",
      excerpt: "After years of trying to be the 'perfect parent', I discovered that showing my vulnerabilities actually made me a better mom...",
      contributions: 127,
      lastContribution: "3 hours ago"
    }
  },
  "mens-cave": {
    title: "Men's Cave", 
    description: "A brotherhood for authentic conversations about masculinity and mental health",
    members: "1.8k",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    topStory: {
      title: "Breaking the silence: Men and mental health",
      excerpt: "It took me 35 years to admit I needed help. Here's what I wish someone had told me earlier about vulnerability and strength...",
      contributions: 89,
      lastContribution: "1 hour ago"
    }
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
  const [topStoryContribution, setTopStoryContribution] = useState("");
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  
  const threadData = THREAD_DATA[threadId] || {
    title: "Community Thread",
    description: "Join the conversation",
    members: "1k",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    topStory: {
      title: "Share your story with the community",
      excerpt: "This is where community members come together to build a collective story...",
      contributions: 0,
      lastContribution: "Never"
    }
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

  const handleTopStoryContribution = () => {
    if (topStoryContribution.trim()) {
      // In a real app, this would submit to the top story
      setTopStoryContribution("");
      // Show success feedback
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
      </div>

      {/* Top Story Section */}
      <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-full bg-amber-100">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-amber-800">Community Top Story</h3>
              <p className="text-sm text-amber-700">Everyone contributes to build this story together</p>
            </div>
            <Badge className="ml-auto bg-amber-100 text-amber-800 border-amber-200">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-lg text-slate-800 mb-2">{threadData.topStory.title}</h4>
            <p className="text-slate-700 leading-relaxed mb-3">{threadData.topStory.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {threadData.topStory.contributions} contributions
              </span>
              <span>Last contribution: {threadData.topStory.lastContribution}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Textarea
              placeholder="Add your part to this community story..."
              value={topStoryContribution}
              onChange={(e) => setTopStoryContribution(e.target.value)}
              className="bg-white border-amber-200 focus:border-amber-400"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                View Full Story
              </Button>
              <Button 
                onClick={handleTopStoryContribution}
                disabled={!topStoryContribution.trim()}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Contribute
              </Button>
            </div>
          </div>
        </div>
      </Card>

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
