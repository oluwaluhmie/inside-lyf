
import { Button } from "@/components/ui/button";
import { Users, Heart, Shield, MessageCircle, Baby, Home, Crown, Sparkles, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const COMMUNITY_THREADS = [
  {
    id: "football-banter",
    title: "Football Banter",
    description: "Match discussions, transfer gossip, and legendary banter with fellow fans",
    icon: Gamepad2,
    color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
    iconColor: "text-emerald-600",
    members: "4.5k",
    whatsappLink: "https://chat.whatsapp.com/football-banter-group"
  },
  {
    id: "parenting",
    title: "Parenting",
    description: "Navigate the beautiful chaos of raising children, share wins and struggles",
    icon: Baby,
    color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
    iconColor: "text-pink-600",
    members: "2.1k",
    whatsappLink: "https://chat.whatsapp.com/parenting-support-group"
  },
  {
    id: "mens-cave",
    title: "Men's Cave",
    description: "A brotherhood for authentic conversations about masculinity and mental health",
    icon: Shield,
    color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
    iconColor: "text-gray-600",
    members: "1.8k",
    whatsappLink: "https://chat.whatsapp.com/mens-mental-health-group"
  },
  {
    id: "broken-but-healed",
    title: "Broken but Healed",
    description: "Stories of resilience, recovery, and finding light in the darkest moments",
    icon: Heart,
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    iconColor: "text-green-600",
    members: "3.2k",
    whatsappLink: "https://chat.whatsapp.com/healing-journey-group"
  },
  {
    id: "sexualities-and-sex",
    title: "Sexualities and Sex",
    description: "Open, honest discussions about intimacy, identity, and sexual wellness",
    icon: Sparkles,
    color: "bg-rose-50 border-rose-200 hover:bg-rose-100",
    iconColor: "text-rose-600",
    members: "1.9k",
    whatsappLink: "https://chat.whatsapp.com/safe-space-group"
  },
  {
    id: "real-life-confessions",
    title: "Real Life Confessions",
    description: "Anonymous safe space to share your deepest secrets and truths",
    icon: MessageCircle,
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    iconColor: "text-orange-600",
    members: "2.7k",
    whatsappLink: "https://chat.whatsapp.com/confessions-group"
  },
  {
    id: "unspoken-marriages",
    title: "Unspoken Marriages",
    description: "The real talk about relationships, love, and partnership challenges",
    icon: Crown,
    color: "bg-red-50 border-red-200 hover:bg-red-100",
    iconColor: "text-red-600",
    members: "2.3k",
    whatsappLink: "https://chat.whatsapp.com/marriage-talk-group"
  },
  {
    id: "womens-circle",
    title: "Women's Circle",
    description: "Sisterhood, empowerment, and support through all seasons of womanhood",
    icon: Users,
    color: "bg-teal-50 border-teal-200 hover:bg-teal-100",
    iconColor: "text-teal-600",
    members: "2.9k",
    whatsappLink: "https://chat.whatsapp.com/womens-circle-group"
  },
  {
    id: "family",
    title: "Family",
    description: "Complex family dynamics, generational healing, and creating new traditions",
    icon: Home,
    color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
    iconColor: "text-amber-600",
    members: "2.0k",
    whatsappLink: "https://chat.whatsapp.com/family-support-group"
  }
];

export default function CommunityThreads() {
  const handleWhatsAppClick = (e: React.MouseEvent, whatsappLink: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
      {COMMUNITY_THREADS.map(thread => {
        const IconComponent = thread.icon;
        return (
          <div key={thread.id} className="relative">
            <Link to={`/community/${thread.id}`}>
              <div
                className={`${thread.color} rounded-2xl border transition-all duration-200 p-5 flex flex-col cursor-pointer transform hover:scale-105`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-white/80 ${thread.iconColor}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {thread.members} members
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-primary">{thread.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                  {thread.description}
                </p>
                <Button 
                  variant="outline" 
                  className="border-primary w-full text-primary hover:text-primary-foreground hover:bg-primary font-medium border-2 transition-all duration-300"
                >
                  Join Discussion →
                </Button>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
