
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
    <header className="border-b bg-slate-900 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/908596b0-cf81-451c-a157-6b120721fea6.png" 
              alt="Insidelyf Logo" 
              className="h-6 w-auto"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-white">Insidelyf Admin Dashboard</h1>
          </div>
          <Badge variant={userRole === 'super_admin' ? 'default' : 'secondary'} className="bg-blue-100 text-blue-800">
            {displayRoleLabel}
          </Badge>
        </div>
        <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-50">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </header>
  );
}
