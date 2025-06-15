import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Share2, Facebook, Twitter, Linkedin, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";
import { AdminRole } from "@/types/adminRoles";

const STATS = [
  { label: "Stories Shared", value: 47832, suffix: "+" },
  { label: "Lives Changed", value: 23156, suffix: "+" },
  { label: "Communities", value: 12, suffix: "" },
  { label: "Countries", value: 67, suffix: "+" }
];

export default function StatsCounter() {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const [showShareOptions, setShowShareOptions] = useState(false);
  const { user } = useAuth();
  const { role } = useUserRole();
  
  const permissions = useAdminPermissions({ 
    role: role as AdminRole, 
    assignedSegments: ["general", "tech", "wellness"]
  });

  useEffect(() => {
    const timers = STATS.map((stat, index) => {
      const increment = stat.value / 50; // Animate over ~2 seconds
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timers[index]);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, 40);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  const shareText = "Check out these amazing stats from our healing community! 🌟";
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl p-8 shadow-xl relative">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">The Impact We're Making Together</h2>
        <p className="text-blue-100">Real numbers from our growing community</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {STATS.map((stat, index) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl lg:text-4xl font-black mb-2">
              {counts[index].toLocaleString()}{stat.suffix}
            </div>
            <div className="text-sm lg:text-base text-blue-100 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="relative">
          <Button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Our Impact
          </Button>
          
          {showShareOptions && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 flex gap-2 z-10">
              <Button
                size="sm"
                onClick={() => handleShare('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => handleShare('twitter')}
                className="bg-sky-500 hover:bg-sky-600 text-white"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => handleShare('linkedin')}
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {user && permissions.canManageSettings && (
          <Button
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            onClick={() => window.location.href = '/admin'}
          >
            <Settings className="w-4 h-4 mr-2" />
            Manage Stats
          </Button>
        )}
      </div>
    </section>
  );
}
