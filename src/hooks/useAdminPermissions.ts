
import { useMemo } from 'react';
import { AdminRole, getRolePermissions, hasPermission, ROLE_LABELS } from '@/types/adminRoles';

interface UseAdminPermissionsProps {
  role: AdminRole;
  assignedSegments?: string[];
}

export function useAdminPermissions({ role, assignedSegments = [] }: UseAdminPermissionsProps) {
  const permissions = useMemo(() => getRolePermissions(role), [role]);
  
  const roleLabel = ROLE_LABELS[role];
  
  const checkPermission = (permission: keyof typeof permissions) => {
    return hasPermission(role, permission);
  };

  const canAccessTab = (tab: string) => {
    switch (tab) {
      case 'overview':
        return permissions.canViewOverview;
      case 'posts':
        return permissions.canManagePosts;
      case 'comments':
        return permissions.canManageComments;
      case 'circles':
        return permissions.canManageCircles;
      case 'users':
        return permissions.canManageUsers;
      case 'profiles':
        return permissions.canViewUserProfiles;
      case 'analytics':
        return permissions.canViewAnalytics;
      case 'premium':
        return permissions.canManagePremium;
      case 'database':
        return permissions.canManageDatabase;
      case 'security':
        return permissions.canManageSecurity;
      case 'settings':
        return permissions.canManageSettings;
      default:
        return false;
    }
  };

  return {
    permissions,
    roleLabel,
    checkPermission,
    canAccessTab,
    assignedSegments,
    isModerator: role === 'moderator',
    isSuperAdmin: role === 'super_admin',
  };
}
