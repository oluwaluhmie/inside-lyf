
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Crown, BarChart3, Settings, MessageCircle, Database, Shield, TrendingUp, Lock, UserSearch, CircleDot } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsOverview from "@/components/admin/StatsOverview";
import PostManagement from "@/components/admin/PostManagement";
import CommentManagement from "@/components/admin/CommentManagement";
import UserManagement from "@/components/admin/UserManagement";
import PremiumManagement from "@/components/admin/PremiumManagement";
import DatabaseManagement from "@/components/admin/DatabaseManagement";
import Analytics from "@/components/admin/Analytics";
import Security from "@/components/admin/Security";
import CircleManagement from "@/components/admin/CircleManagement";
import UserProfileManagement from "@/components/admin/UserProfileManagement";

// Mock user role - in real app this would come from authentication
const CURRENT_USER_ROLE: 'admin' | 'moderator' = 'admin';
const MODERATOR_SEGMENTS = ['Parenting', 'Family']; // segments assigned to moderator

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full ${CURRENT_USER_ROLE === 'admin' ? 'grid-cols-11' : 'grid-cols-5'} mb-8`}>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="circles" className="flex items-center gap-2">
              <CircleDot className="w-4 h-4" />
              Circles
            </TabsTrigger>
            {CURRENT_USER_ROLE === 'admin' && (
              <>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="profiles" className="flex items-center gap-2">
                  <UserSearch className="w-4 h-4" />
                  Profiles
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="premium" className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Premium
                </TabsTrigger>
                <TabsTrigger value="database" className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Database
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </>
            )}
            {CURRENT_USER_ROLE === 'moderator' && (
              <TabsTrigger value="segments" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                My Segments
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview">
            <StatsOverview />
            <div className="mt-8">
              <PostManagement userRole={CURRENT_USER_ROLE} assignedSegments={MODERATOR_SEGMENTS} />
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <PostManagement userRole={CURRENT_USER_ROLE} assignedSegments={MODERATOR_SEGMENTS} />
          </TabsContent>

          <TabsContent value="comments">
            <CommentManagement userRole={CURRENT_USER_ROLE} assignedSegments={MODERATOR_SEGMENTS} />
          </TabsContent>

          <TabsContent value="circles">
            <CircleManagement userRole={CURRENT_USER_ROLE} assignedSegments={MODERATOR_SEGMENTS} />
          </TabsContent>

          {CURRENT_USER_ROLE === 'admin' && (
            <>
              <TabsContent value="users">
                <UserManagement userRole={CURRENT_USER_ROLE} />
              </TabsContent>

              <TabsContent value="profiles">
                <UserProfileManagement userRole={CURRENT_USER_ROLE} />
              </TabsContent>

              <TabsContent value="analytics">
                <Analytics userRole={CURRENT_USER_ROLE} />
              </TabsContent>

              <TabsContent value="premium">
                <PremiumManagement userRole={CURRENT_USER_ROLE} />
              </TabsContent>

              <TabsContent value="database">
                <DatabaseManagement userRole={CURRENT_USER_ROLE} />
              </TabsContent>

              <TabsContent value="security">
                <Security userRole={CURRENT_USER_ROLE} />
              </TabsContent>

              <TabsContent value="settings">
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                  <p className="text-muted-foreground">Configure system-wide settings and preferences.</p>
                </div>
              </TabsContent>
            </>
          )}

          {CURRENT_USER_ROLE === 'moderator' && (
            <TabsContent value="segments">
              <div className="bg-white rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-4">My Assigned Segments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MODERATOR_SEGMENTS.map(segment => (
                    <div key={segment} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{segment}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        You have full moderation access to this segment
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
