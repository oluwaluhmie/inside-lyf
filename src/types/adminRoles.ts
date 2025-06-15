
export type UserRole = 'user' | 'moderator' | 'admin' | 'super_admin';
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
  canViewLogs: boolean;
  canManageNotifications: boolean;
  canEditContent: boolean;
  canManageSEO: boolean;
  canManageIntegrations: boolean;
  canCustomizeUI: boolean;
}

// Map UserRole to AdminRole for compatibility
export function mapUserRoleToAdminRole(userRole: UserRole): AdminRole | null {
  switch (userRole) {
    case 'super_admin':
      return 'super_admin';
    case 'admin':
      return 'content_admin';
    case 'moderator':
      return 'moderator';
    default:
      return null;
  }
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
    canViewLogs: true,
    canManageNotifications: true,
    canEditContent: true,
    canManageSEO: true,
    canManageIntegrations: true,
    canCustomizeUI: true,
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
    canViewLogs: true,
    canManageNotifications: true,
    canEditContent: true,
    canManageSEO: true,
    canManageIntegrations: false,
    canCustomizeUI: true,
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
    canViewLogs: true,
    canManageNotifications: false,
    canEditContent: false,
    canManageSEO: false,
    canManageIntegrations: false,
    canCustomizeUI: false,
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
    canViewLogs: true,
    canManageNotifications: true,
    canEditContent: false,
    canManageSEO: false,
    canManageIntegrations: false,
    canCustomizeUI: false,
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
    canViewLogs: true,
    canManageNotifications: false,
    canEditContent: false,
    canManageSEO: false,
    canManageIntegrations: true,
    canCustomizeUI: false,
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
    canViewLogs: false,
    canManageNotifications: false,
    canEditContent: true,
    canManageSEO: false,
    canManageIntegrations: false,
    canCustomizeUI: false,
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
