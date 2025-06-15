
import { Button } from "@/components/ui/button";
import { Play, Crown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EXCLUSIVE_VIDEOS = [
  {
    id: 1,
    title: "Breaking the Silence: Mental Health in Modern Society",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    duration: "28:45",
    type: "Documentary"
  },
  {
    id: 2,
    title: "Journey to Self-Love: A Personal Transformation",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    duration: "15:30",
    type: "Personal Story"
  },
  {
    id: 3,
    title: "Expert Session: Healing Trauma Through Community",
    thumbnail: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=250&fit=crop",
    duration: "42:15",
    type: "Expert Session"
  }
];

export default function PremiumVideos() {
  return (
    <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="w-6 h-6 text-amber-600" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Exclusive Premium Content
        </h2>
      </div>
      
      <p className="text-slate-600 mb-6 max-w-3xl">
        Get access to in-depth documentaries, expert sessions, and exclusive personal stories that go deeper than our regular content.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {EXCLUSIVE_VIDEOS.map((video) => (
          <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-lg border group hover:shadow-xl transition-shadow">
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Play className="w-6 h-6 text-white fill-white" />
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
              <h3 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h3>
              <div className="flex items-center gap-1 text-amber-600">
                <Crown className="w-3 h-3" />
                <span className="text-xs font-medium">Premium Only</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Link to="/premium">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold">
            Unlock All Premium Content
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
