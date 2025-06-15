
import { Button } from "@/components/ui/button";
import { Video, MessageSquare, Calendar, Clock, Crown, Star } from "lucide-react";

const THERAPISTS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Anxiety & Depression",
    rating: 4.9,
    experience: "10+ years",
    nextAvailable: "Today, 3:00 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Trauma & PTSD",
    rating: 4.8,
    experience: "8 years",
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Relationship Counseling",
    rating: 4.9,
    experience: "12 years",
    nextAvailable: "Today, 7:00 PM",
    image: "https://images.unsplash.com/photo-1594824724347-ad5c2ad9d0c4?w=100&h=100&fit=crop&crop=face"
  }
];

export default function TherapyChat() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 rounded-2xl p-8 border border-green-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-xl">
          <MessageSquare className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            One-on-One Therapy
          </h2>
          <p className="text-slate-600">Private sessions with licensed therapists</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {THERAPISTS.map((therapist) => (
          <div key={therapist.id} className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={therapist.image} 
                alt={therapist.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold">{therapist.name}</h3>
                <p className="text-sm text-slate-600">{therapist.specialization}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{therapist.rating} rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{therapist.experience} experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Available: {therapist.nextAvailable}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Video className="w-4 h-4 mr-2" />
                Video Session
              </Button>
              <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat Session
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold">Premium Therapy Benefits</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Unlimited messaging with your therapist</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Priority booking for video sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Session recordings for review</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Personalized therapy resources</span>
          </div>
        </div>
      </div>
    </div>
  );
}
