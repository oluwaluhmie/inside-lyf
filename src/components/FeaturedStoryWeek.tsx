
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURED_STORY_OF_WEEK = {
  id: 1,
  title: "Finding Light in Dark Seasons",
  author: "Anonymous",
  excerpt: "Struggling with anxiety, I found unexpected comfort from this community and professional therapy. This is my story of transformation and how sharing saved my life...",
  youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  category: "Mental Health",
  readTime: "5 min read"
};

export default function FeaturedStoryWeek() {
  return (
    <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 border border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-500 fill-current" />
        <span className="text-sm font-semibold text-primary uppercase tracking-wide">Featured Story of the Week</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              {FEATURED_STORY_OF_WEEK.category}
            </span>
            <span>•</span>
            <span>{FEATURED_STORY_OF_WEEK.readTime}</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
            {FEATURED_STORY_OF_WEEK.title}
          </h2>
          
          <p className="text-slate-600 mb-2 text-sm">by {FEATURED_STORY_OF_WEEK.author}</p>
          
          <p className="text-slate-700 mb-6 leading-relaxed">
            {FEATURED_STORY_OF_WEEK.excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/stories">
              <Button className="font-semibold">
                Read Full Story
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/stories">
              <Button variant="outline">
                Browse All Stories
              </Button>
            </Link>
          </div>
        </div>
        
        <div>
          {FEATURED_STORY_OF_WEEK.youtubeEmbed && (
            <div className="rounded-xl overflow-hidden aspect-video shadow-lg border">
              <iframe
                src={FEATURED_STORY_OF_WEEK.youtubeEmbed}
                title={FEATURED_STORY_OF_WEEK.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
