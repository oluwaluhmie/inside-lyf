
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { AdminRole, ROLE_LABELS } from "@/types/adminRoles";

interface AdminHeaderProps {
  userRole?: AdminRole;
  roleLabel?: string;
}

export default function AdminHeader({ userRole = 'super_admin', roleLabel }: AdminHeaderProps) {
  const displayRoleLabel = roleLabel || ROLE_LABELS[userRole];
  
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-primary">Insidelyf Admin Dashboard</h1>
          <Badge variant={userRole === 'super_admin' ? 'default' : 'secondary'}>
            {displayRoleLabel}
          </Badge>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </header>
  );
}
