
import { Video, Play, Crown } from "lucide-react";

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

export default function ExclusiveVideosSection() {
  return (
    <div>
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
  );
}
