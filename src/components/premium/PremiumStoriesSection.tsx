
import { BookOpen, Crown } from "lucide-react";

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

export default function PremiumStoriesSection() {
  return (
    <div>
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
  );
}
