
export type AdminRole = 'super_admin' | 'content_admin' | 'circle_admin' | 'user_admin' | 'analytics_admin' | 'moderator';

export interface AdminPermissions {
  canViewOverview: boolean;
  canManagePosts: boolean;
  canManageComments: boolean;
  canManageCircles: boolean;
  canManageUsers: boolean;
  canViewUserProfiles: boolean;
  canViewAnalytics: boolean;
  canManagePremium: boolean;
  canManageDatabase: boolean;
  canManageSecurity: boolean;
  canManageSettings: boolean;
}

export const ROLE_PERMISSIONS: Record<AdminRole, AdminPermissions> = {
  super_admin: {
    canViewOverview: true,
    canManagePosts: true,
    canManageComments: true,
    canManageCircles: true,
    canManageUsers: true,
    canViewUserProfiles: true,
    canViewAnalytics: true,
    canManagePremium: true,
    canManageDatabase: true,
    canManageSecurity: true,
    canManageSettings: true,
  },
  content_admin: {
    canViewOverview: true,
    canManagePosts: true,
    canManageComments: true,
    canManageCircles: false,
    canManageUsers: false,
    canViewUserProfiles: true,
    canViewAnalytics: true,
    canManagePremium: false,
    canManageDatabase: false,
    canManageSecurity: false,
    canManageSettings: false,
  },
  circle_admin: {
    canViewOverview: true,
    canManagePosts: false,
    canManageComments: false,
    canManageCircles: true,
    canManageUsers: false,
    canViewUserProfiles: true,
    canViewAnalytics: true,
    canManagePremium: false,
    canManageDatabase: false,
    canManageSecurity: false,
    canManageSettings: false,
  },
  user_admin: {
    canViewOverview: true,
    canManagePosts: false,
    canManageComments: false,
    canManageCircles: false,
    canManageUsers: true,
    canViewUserProfiles: true,
    canViewAnalytics: true,
    canManagePremium: true,
    canManageDatabase: false,
    canManageSecurity: false,
    canManageSettings: false,
  },
  analytics_admin: {
    canViewOverview: true,
    canManagePosts: false,
    canManageComments: false,
    canManageCircles: false,
    canManageUsers: false,
    canViewUserProfiles: true,
    canViewAnalytics: true,
    canManagePremium: false,
    canManageDatabase: true,
    canManageSecurity: false,
    canManageSettings: false,
  },
  moderator: {
    canViewOverview: true,
    canManagePosts: true,
    canManageComments: true,
    canManageCircles: true,
    canManageUsers: false,
    canViewUserProfiles: false,
    canViewAnalytics: false,
    canManagePremium: false,
    canManageDatabase: false,
    canManageSecurity: false,
    canManageSettings: false,
  },
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  content_admin: 'Content Admin',
  circle_admin: 'Circle Admin',
  user_admin: 'User Admin',
  analytics_admin: 'Analytics Admin',
  moderator: 'Moderator',
};

export function getRolePermissions(role: AdminRole): AdminPermissions {
  return ROLE_PERMISSIONS[role];
}

export function hasPermission(role: AdminRole, permission: keyof AdminPermissions): boolean {
  return ROLE_PERMISSIONS[role][permission];
}
