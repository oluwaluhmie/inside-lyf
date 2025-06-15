
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsOverview from "@/components/admin/StatsOverview";
import PostManagement from "@/components/admin/PostManagement";
import CommentManagement from "@/components/admin/CommentManagement";
import UserManagement from "@/components/admin/UserManagement";
import UserProfileManagement from "@/components/admin/UserProfileManagement";
import CircleManagement from "@/components/admin/CircleManagement";
import Analytics from "@/components/admin/Analytics";
import PremiumManagement from "@/components/admin/PremiumManagement";
import DatabaseManagement from "@/components/admin/DatabaseManagement";
import Security from "@/components/admin/Security";
import LogsMonitoring from "@/components/admin/LogsMonitoring";
import NotificationSystem from "@/components/admin/NotificationSystem";
import ContentEditor from "@/components/admin/ContentEditor";
import SEOTools from "@/components/admin/SEOTools";
import IntegrationsHub from "@/components/admin/IntegrationsHub";
import CustomizationPanel from "@/components/admin/CustomizationPanel";
import { useAdminPermissions } from "@/hooks/useAdminPermissions";
import { AdminRole } from "@/types/adminRoles";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // For demo purposes, setting as super_admin. In real app, this would come from auth
  const userRole: AdminRole = "super_admin";
  const assignedSegments = ["general", "tech", "wellness"];
  
  const permissions = useAdminPermissions({ 
    role: userRole, 
    assignedSegments 
  });

  const availableTabs = [
    { key: 'overview', label: 'Overview', component: <StatsOverview /> },
    { key: 'posts', label: 'Posts', component: <PostManagement userRole={userRole} /> },
    { key: 'comments', label: 'Comments', component: <CommentManagement /> },
    { key: 'circles', label: 'Circles', component: <CircleManagement userRole={userRole} /> },
    { key: 'users', label: 'Users', component: <UserManagement /> },
    { key: 'profiles', label: 'Profiles', component: <UserProfileManagement /> },
    { key: 'analytics', label: 'Analytics', component: <Analytics /> },
    { key: 'premium', label: 'Premium', component: <PremiumManagement /> },
    { key: 'database', label: 'Database', component: <DatabaseManagement /> },
    { key: 'security', label: 'Security', component: <Security /> },
    { key: 'logs', label: 'Logs', component: <LogsMonitoring userRole={userRole} /> },
    { key: 'notifications', label: 'Notifications', component: <NotificationSystem userRole={userRole} /> },
    { key: 'content', label: 'Content', component: <ContentEditor userRole={userRole} /> },
    { key: 'seo', label: 'SEO', component: <SEOTools userRole={userRole} /> },
    { key: 'integrations', label: 'Integrations', component: <IntegrationsHub userRole={userRole} /> },
    { key: 'customization', label: 'Customization', component: <CustomizationPanel userRole={userRole} /> },
  ].filter(tab => permissions.canAccessTab(tab.key));

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader userRole={userRole} roleLabel={permissions.roleLabel} />
      
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
