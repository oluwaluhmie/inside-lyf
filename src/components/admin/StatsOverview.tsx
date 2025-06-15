
import { Users, MessageSquare, Crown, BarChart3 } from "lucide-react";

const MOCK_STATS = {
  totalUsers: 12847,
  activeUsers: 3421,
  totalPosts: 8934,
  premiumSubscribers: 1205
};

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{MOCK_STATS.totalUsers.toLocaleString()}</p>
          </div>
          <Users className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold">{MOCK_STATS.activeUsers.toLocaleString()}</p>
          </div>
          <Users className="w-8 h-8 text-green-500" />
        </div>
      </div>
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Posts</p>
            <p className="text-2xl font-bold">{MOCK_STATS.totalPosts.toLocaleString()}</p>
          </div>
          <MessageSquare className="w-8 h-8 text-orange-500" />
        </div>
      </div>
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Premium Users</p>
            <p className="text-2xl font-bold">{MOCK_STATS.premiumSubscribers.toLocaleString()}</p>
          </div>
          <Crown className="w-8 h-8 text-amber-500" />
        </div>
      </div>
    </div>
  );
}
