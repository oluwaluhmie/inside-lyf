
import { Video, Star, Lock, Users, BookOpen, Heart } from "lucide-react";

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

export default function PremiumBenefits() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
