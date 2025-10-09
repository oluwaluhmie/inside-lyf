
import { X, Clock } from "lucide-react";
import { useState } from "react";

export default function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 relative">
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <Clock className="w-4 h-4" />
        <span>🔥 Join 2,847 new members this week sharing their stories and finding community!</span>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 hover:bg-white/20 rounded p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
