
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { AdminRole, ROLE_LABELS } from "@/types/adminRoles";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AdminHeaderProps {
  userRole?: AdminRole;
  roleLabel?: string;
}

export default function AdminHeader({ userRole = 'super_admin', roleLabel }: AdminHeaderProps) {
  const displayRoleLabel = roleLabel || ROLE_LABELS[userRole];
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  return (
    <>
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Settings</DialogTitle>
          <DialogDescription>
            Configure your admin dashboard preferences and settings.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Account Information</h3>
            <p className="text-sm text-muted-foreground">Role: {displayRoleLabel}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Dashboard Preferences</h3>
            <p className="text-sm text-muted-foreground">Additional settings coming soon...</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <header className="border-b bg-slate-900 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="Insidelyf Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-white">Insidelyf Admin Dashboard</h1>
          </div>
          <Badge variant={userRole === 'super_admin' ? 'default' : 'secondary'} className="bg-blue-100 text-blue-800">
            {displayRoleLabel}
          </Badge>
        </div>
        <Button 
          variant="outline" 
          className="border-blue-400 text-blue-400 hover:bg-blue-50"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </header>
    </>
  );
}
