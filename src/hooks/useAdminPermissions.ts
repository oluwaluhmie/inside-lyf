
import { AdminRole } from "@/types/adminRoles";

export function useAdminPermissions(userRole: AdminRole) {
  const canManageUsers = userRole === "admin" || userRole === "super_admin";
  const canManageContent = userRole === "admin" || userRole === "super_admin" || userRole === "moderator";
  const canViewAnalytics = userRole === "admin" || userRole === "super_admin";
  const canManageSettings = userRole === "super_admin";

  return {
    canManageUsers,
    canManageContent,
    canViewAnalytics,
    canManageSettings,
  };
}
