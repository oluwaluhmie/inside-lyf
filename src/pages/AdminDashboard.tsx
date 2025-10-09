
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsOverview from "@/components/admin/StatsOverview";
import PostManagement from "@/components/admin/PostManagement";
import CommentManagement from "@/components/admin/CommentManagement";
import UserManagement from "@/components/admin/UserManagement";
import UserProfileManagement from "@/components/admin/UserProfileManagement";
import CircleManagement from "@/components/admin/CircleManagement";
import Analytics from "@/components/admin/Analytics";
import DatabaseManagement from "@/components/admin/DatabaseManagement";
import Security from "@/components/admin/Security";
import LogsMonitoring from "@/components/admin/LogsMonitoring";
import NotificationSystem from "@/components/admin/NotificationSystem";
import ContentEditor from "@/components/admin/ContentEditor";
import SEOTools from "@/components/admin/SEOTools";
import IntegrationsHub from "@/components/admin/IntegrationsHub";
import CustomizationPanel from "@/components/admin/CustomizationPanel";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  
  const assignedSegments = ["general", "tech", "wellness"];
  
  const permissions = useAdminPermissions({ 
    role, 
    assignedSegments 
  });

  // Show loading while checking authentication
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user has admin permissions
  if (!['moderator', 'admin', 'super_admin'].includes(role)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access the admin dashboard.</p>
          <a href="/" className="text-blue-600 hover:text-blue-700">Return to Home</a>
        </div>
      </div>
    );
  }

  const availableTabs = [
    { key: 'overview', label: 'Overview', component: <StatsOverview /> },
    { key: 'posts', label: 'Posts', component: <PostManagement userRole={role as any} /> },
    { key: 'comments', label: 'Comments', component: <CommentManagement userRole={role as any} assignedSegments={assignedSegments} /> },
    { key: 'circles', label: 'Circles', component: <CircleManagement userRole={role as any} /> },
    { key: 'users', label: 'Users', component: <UserManagement /> },
    { key: 'profiles', label: 'Profiles', component: <UserProfileManagement /> },
    { key: 'analytics', label: 'Analytics', component: <Analytics /> },
    { key: 'database', label: 'Database', component: <DatabaseManagement userRole={role as any} /> },
    { key: 'security', label: 'Security', component: <Security userRole={role as any} /> },
    { key: 'logs', label: 'Logs', component: <LogsMonitoring userRole={role as any} /> },
    { key: 'notifications', label: 'Notifications', component: <NotificationSystem userRole={role as any} /> },
    { key: 'content', label: 'Content', component: <ContentEditor userRole={role as any} /> },
    { key: 'seo', label: 'SEO', component: <SEOTools userRole={role as any} /> },
    { key: 'integrations', label: 'Integrations', component: <IntegrationsHub userRole={role as any} /> },
    { key: 'customization', label: 'Customization', component: <CustomizationPanel userRole={role as any} /> },
  ].filter(tab => permissions.canAccessTab(tab.key));

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader userRole={role as any} roleLabel={permissions.roleLabel} />
      
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2">
            {availableTabs.map((tab) => (
              <TabsTrigger 
                key={tab.key} 
                value={tab.key}
                className="text-xs lg:text-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {availableTabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
