
import { UserRole, AdminRole, mapUserRoleToAdminRole } from "@/types/adminRoles";

interface AdminPermissionsProps {
  role: UserRole;
  assignedSegments: string[];
}

export function useAdminPermissions({ role, assignedSegments }: AdminPermissionsProps) {
  const adminRole = mapUserRoleToAdminRole(role);
  
  const canManageUsers = role === "super_admin" || role === "admin";
  const canManageContent = role === "super_admin" || role === "admin" || role === "moderator";
  const canViewAnalytics = role === "super_admin" || role === "admin";
  const canManageSettings = role === "super_admin";

  const isModerator = role === "moderator";
  const isSuperAdmin = role === "super_admin";
  
  const roleLabel = role === "super_admin" ? "Super Admin" : 
                   role === "admin" ? "Admin" :
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
    adminRole,
  };
}
