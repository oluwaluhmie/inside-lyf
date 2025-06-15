
import { Button } from "@/components/ui/button";
import { Lock, Users, MessageCircle, Calendar, Crown } from "lucide-react";

const SUPPORT_GROUPS = [
  {
    id: 1,
    name: "Anxiety & Depression Support",
    description: "A safe space for those dealing with anxiety and depression",
    members: 24,
    nextSession: "2024-12-18 19:00",
    type: "Weekly"
  },
  {
    id: 2,
    name: "Trauma Recovery Circle",
    description: "Healing together from past traumas with professional guidance",
    members: 18,
    nextSession: "2024-12-20 20:00",
    type: "Bi-weekly"
  },
  {
    id: 3,
    name: "Relationship & Family Support",
    description: "Navigate relationship challenges and family dynamics",
    members: 31,
    nextSession: "2024-12-19 18:30",
    type: "Weekly"
  },
  {
    id: 4,
    name: "Addiction Recovery Network",
    description: "Support for those on their recovery journey",
    members: 15,
    nextSession: "2024-12-21 19:30",
    type: "Daily Check-ins"
  }
];

export default function PremiumSupportGroups() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-xl">
          <Lock className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Private Support Groups
          </h2>
          <p className="text-slate-600">Exclusive communities for deeper healing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SUPPORT_GROUPS.map((group) => (
          <div key={group.id} className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg mb-2">{group.name}</h3>
                <p className="text-slate-600 text-sm mb-3">{group.description}</p>
              </div>
              <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                <Crown className="w-3 h-3" />
                <span>Premium</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{group.members} members</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{group.type}</span>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-slate-700">Next Session:</p>
              <p className="text-sm text-slate-600">{new Date(group.nextSession).toLocaleString()}</p>
            </div>
            
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Join Group
            </Button>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <p className="text-slate-600 mb-4">All support groups are moderated by licensed therapists</p>
        <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
          Request New Support Group
        </Button>
      </div>
    </div>
  );
}
