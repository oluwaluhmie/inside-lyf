
import { Button } from "@/components/ui/button";
import { Crown, Video, BookOpen, Star, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const PREMIUM_FEATURES = [
  {
    title: "Exclusive Documentaries",
    description: "Behind-the-scenes stories and in-depth documentaries",
    icon: Video
  },
  {
    title: "Premium Stories",
    description: "Curated long-form content from expert contributors",
    icon: BookOpen
  },
  {
    title: "Early Access",
    description: "Be the first to access new content and features",
    icon: Star
  },
  {
    title: "Private Communities",
    description: "Access to exclusive member-only discussion groups",
    icon: Lock
  }
];

export default function PremiumSection() {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-100 rounded-xl">
          <Crown className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">Premium Membership</h2>
          <p className="text-muted-foreground">Unlock deeper connections and exclusive content</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {PREMIUM_FEATURES.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="bg-white/70 rounded-xl p-4 border border-amber-200/50">
              <IconComponent className="w-6 h-6 text-amber-600 mb-2" />
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          );
        })}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-primary">$9.99/month</div>
          <div className="text-sm text-muted-foreground">Cancel anytime • 7-day free trial</div>
        </div>
        <div className="flex gap-3">
          <Link to="/premium">
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              Learn More
            </Button>
          </Link>
          <Button className="bg-amber-600 text-white hover:bg-amber-700 shadow-lg">
            Start Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
}
