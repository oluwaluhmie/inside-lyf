
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Crown, BarChart3, Settings, MessageCircle, Database, Shield, TrendingUp, Lock, UserSearch, CircleDot, Bell, FileText, Globe, Monitor, Palette, Edit3 } from "lucide-react";
import { AdminRole } from "@/types/adminRoles";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";
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
import LogsMonitoring from "@/components/admin/LogsMonitoring";
import NotificationSystem from "@/components/admin/NotificationSystem";
import ContentEditor from "@/components/admin/ContentEditor";
import SEOTools from "@/components/admin/SEOTools";
import IntegrationsHub from "@/components/admin/IntegrationsHub";
import CustomizationPanel from "@/components/admin/CustomizationPanel";

// Mock user role - in real app this would come from authentication
const CURRENT_USER_ROLE: AdminRole = 'super_admin'; // Change this to test different roles
const MODERATOR_SEGMENTS = ['Parenting', 'Family']; // segments assigned to moderator

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const { 
    roleLabel, 
    canAccessTab, 
    assignedSegments, 
    isModerator,
    isSuperAdmin 
  } = useAdminPermissions({ 
    role: CURRENT_USER_ROLE, 
    assignedSegments: MODERATOR_SEGMENTS 
  });

  // Filter available tabs based on permissions
  const availableTabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'posts', label: 'Posts', icon: MessageSquare },
    { key: 'comments', label: 'Comments', icon: MessageCircle },
    { key: 'circles', label: 'Circles', icon: CircleDot },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'profiles', label: 'Profiles', icon: UserSearch },
    { key: 'analytics', label: 'Analytics', icon: TrendingUp },
    { key: 'premium', label: 'Premium', icon: Crown },
    { key: 'database', label: 'Database', icon: Database },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'logs', label: 'Logs', icon: Monitor },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'content', label: 'Content Editor', icon: Edit3 },
    { key: 'seo', label: 'SEO Tools', icon: Globe },
    { key: 'integrations', label: 'Integrations', icon: FileText },
    { key: 'customization', label: 'Customization', icon: Palette },
    { key: 'settings', label: 'Settings', icon: Settings },
  ].filter(tab => canAccessTab(tab.key));

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader userRole={CURRENT_USER_ROLE} roleLabel={roleLabel} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8 lg:grid-cols-12 mb-8 overflow-x-auto">
            {availableTabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger key={tab.key} value={tab.key} className="flex items-center gap-2 min-w-0">
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {canAccessTab('overview') && (
            <TabsContent value="overview">
              <StatsOverview />
              <div className="mt-8">
                <PostManagement userRole={CURRENT_USER_ROLE} assignedSegments={assignedSegments} />
              </div>
            </TabsContent>
          )}

          {canAccessTab('posts') && (
            <TabsContent value="posts">
              <PostManagement userRole={CURRENT_USER_ROLE} assignedSegments={assignedSegments} />
            </TabsContent>
          )}

          {canAccessTab('comments') && (
            <TabsContent value="comments">
              <CommentManagement userRole={CURRENT_USER_ROLE} assignedSegments={assignedSegments} />
            </TabsContent>
          )}

          {canAccessTab('circles') && (
            <TabsContent value="circles">
              <CircleManagement userRole={CURRENT_USER_ROLE} assignedSegments={assignedSegments} />
            </TabsContent>
          )}

          {canAccessTab('users') && (
            <TabsContent value="users">
              <UserManagement userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('profiles') && (
            <TabsContent value="profiles">
              <UserProfileManagement userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('analytics') && (
            <TabsContent value="analytics">
              <Analytics userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('premium') && (
            <TabsContent value="premium">
              <PremiumManagement userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('database') && (
            <TabsContent value="database">
              <DatabaseManagement userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('security') && (
            <TabsContent value="security">
              <Security userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('logs') && (
            <TabsContent value="logs">
              <LogsMonitoring userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('notifications') && (
            <TabsContent value="notifications">
              <NotificationSystem userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('content') && (
            <TabsContent value="content">
              <ContentEditor userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('seo') && (
            <TabsContent value="seo">
              <SEOTools userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('integrations') && (
            <TabsContent value="integrations">
              <IntegrationsHub userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('customization') && (
            <TabsContent value="customization">
              <CustomizationPanel userRole={CURRENT_USER_ROLE} />
            </TabsContent>
          )}

          {canAccessTab('settings') && (
            <TabsContent value="settings">
              <div className="bg-white rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                <p className="text-muted-foreground">Configure system-wide settings and preferences.</p>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Current Role:</strong> {roleLabel}
                  </p>
                  {isModerator && assignedSegments.length > 0 && (
                    <p className="text-sm text-blue-800 mt-1">
                      <strong>Assigned Segments:</strong> {assignedSegments.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
