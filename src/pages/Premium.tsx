import Header from "../components/Header";
import Footer from "../components/Footer";
import PremiumSection from "../components/PremiumSection";
import PremiumSupportGroups from "../components/premium/PremiumSupportGroups";
import TherapyChat from "../components/premium/TherapyChat";
import PaymentLinks from "../components/premium/PaymentLinks";
import { Button } from "@/components/ui/button";
import { Crown, CheckCircle, Star, Video, BookOpen, Lock, Users, Heart, Play } from "lucide-react";

const PREMIUM_BENEFITS = [
  {
    title: "Exclusive Video Content",
    description: "Access to premium documentaries and behind-the-scenes content",
    icon: Video
  },
  {
    title: "Priority Story Features",
    description: "Get your stories featured faster and reach more people",
    icon: Star
  },
  {
    title: "Private Support Groups",
    description: "Join exclusive circles for deeper, more focused discussions",
    icon: Lock
  },
  {
    title: "Expert Sessions",
    description: "Monthly live sessions with therapists and mental health experts",
    icon: Users
  },
  {
    title: "Premium Resources",
    description: "Access to exclusive guides, worksheets, and healing tools",
    icon: BookOpen
  },
  {
    title: "Ad-Free Experience",
    description: "Browse and share stories without any distractions",
    icon: Heart
  }
];

const EXCLUSIVE_VIDEOS = [
  {
    id: 1,
    title: "Breaking the Silence: Mental Health in Modern Society",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    duration: "28:45",
    type: "Documentary",
    description: "A comprehensive look at mental health challenges and breakthroughs in today's world."
  },
  {
    id: 2,
    title: "Journey to Self-Love: A Personal Transformation",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    duration: "15:30",
    type: "Personal Story",
    description: "Follow one person's incredible journey from self-doubt to self-acceptance."
  },
  {
    id: 3,
    title: "Expert Session: Healing Trauma Through Community",
    thumbnail: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop",
    duration: "42:15",
    type: "Expert Session",
    description: "Dr. Sarah Johnson discusses trauma healing in community settings."
  }
];

const PREMIUM_STORIES = [
  {
    title: "The 90-Day Transformation: From Rock Bottom to Resilience",
    author: "Michael R.",
    category: "Recovery",
    readTime: "12 min read",
    excerpt: "An in-depth account of overcoming addiction through community support and professional therapy."
  },
  {
    title: "Motherhood Unfiltered: Postpartum Depression and Finding Hope",
    author: "Jennifer L.",
    category: "Mental Health",
    readTime: "8 min read",
    excerpt: "A raw, honest look at the struggles of new motherhood and the path to healing."
  },
  {
    title: "Breaking Generational Cycles: A Family's Journey to Healing",
    author: "The Martinez Family",
    category: "Family",
    readTime: "15 min read",
    excerpt: "How one family worked together to break patterns of trauma and build healthier relationships."
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    quote: "The premium community changed my life. Having access to expert sessions and private groups made all the difference in my healing journey.",
    role: "Premium Member since 2023"
  },
  {
    name: "Michael R.",
    quote: "The exclusive content and priority support helped me when I needed it most. Worth every penny.",
    role: "Premium Member since 2024"
  }
];

export default function Premium() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-amber-600" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Premium Membership
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Unlock deeper connections, exclusive content, and premium support on your healing journey
          </p>
        </div>

        {/* Payment Links Section */}
        <div className="mb-12">
          <PaymentLinks />
        </div>

        {/* Premium Support Groups */}
        <div className="mb-12">
          <PremiumSupportGroups />
        </div>

        {/* One-on-One Therapy */}
        <div className="mb-12">
          <TherapyChat />
        </div>

        {/* Exclusive Videos Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Video className="w-6 h-6 text-purple-600" />
            Exclusive Videos & Documentaries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXCLUSIVE_VIDEOS.map((video) => (
              <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-lg border group hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {video.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{video.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{video.description}</p>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-medium">Premium Only</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Stories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Premium Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PREMIUM_STORIES.map((story, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {story.category}
                  </span>
                  <span className="text-xs text-slate-500">{story.readTime}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                <p className="text-sm text-slate-600 mb-2">by {story.author}</p>
                <p className="text-slate-700 mb-4">{story.excerpt}</p>
                <div className="flex items-center gap-1 text-amber-600">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-medium">Premium Only</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PREMIUM_BENEFITS.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-amber-200/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <IconComponent className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{benefit.title}</h3>
                </div>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">What Our Premium Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="border-l-4 border-amber-400 pl-6">
                <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="font-semibold">{testimonial.name}</span>
                  <span className="text-slate-500 text-sm">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Journey?</h2>
          <p className="text-xl mb-6 opacity-90">Join thousands who've found deeper healing through our premium community</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
              Learn More
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">7-day free trial • Cancel anytime • No hidden fees</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
