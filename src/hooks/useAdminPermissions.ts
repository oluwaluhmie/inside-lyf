
import { AdminRole } from "@/types/adminRoles";

interface AdminPermissionsProps {
  role: AdminRole;
  assignedSegments: string[];
}

export function useAdminPermissions({ role, assignedSegments }: AdminPermissionsProps) {
  const canManageUsers = role === "super_admin" || role === "user_admin";
  const canManageContent = role === "super_admin" || role === "content_admin" || role === "moderator";
  const canViewAnalytics = role === "super_admin" || role === "analytics_admin";
  const canManageSettings = role === "super_admin";

  const isModerator = role === "moderator";
  const isSuperAdmin = role === "super_admin";
  
  const roleLabel = role === "super_admin" ? "Super Admin" : 
                   role === "content_admin" ? "Content Admin" :
                   role === "user_admin" ? "User Admin" :
                   role === "analytics_admin" ? "Analytics Admin" :
                   role === "circle_admin" ? "Circle Admin" :
                   role === "moderator" ? "Moderator" : "User";

  const canAccessTab = (tabKey: string) => {
    switch (tabKey) {
      case 'overview':
      case 'posts':
      case 'comments':
      case 'circles':
        return canManageContent;
      case 'users':
      case 'profiles':
        return canManageUsers;
      case 'analytics':
        return canViewAnalytics;
      case 'premium':
      case 'database':
      case 'security':
      case 'logs':
      case 'notifications':
      case 'content':
      case 'seo':
      case 'integrations':
      case 'customization':
      case 'settings':
        return canManageSettings;
      default:
        return false;
    }
  };

  return {
    canManageUsers,
    canManageContent,
    canViewAnalytics,
    canManageSettings,
    roleLabel,
    canAccessTab,
    assignedSegments,
    isModerator,
    isSuperAdmin,
  };
}
