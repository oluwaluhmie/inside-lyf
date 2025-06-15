
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Key, Download, AlertTriangle, CheckCircle, XCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AUDIT_LOGS = [
  { id: 1, timestamp: "2024-01-21 14:30:25", user: "admin@insidelyf.com", action: "User role changed", details: "Changed Sarah Mitchell role to Moderator", status: "Success", ip: "192.168.1.100" },
  { id: 2, timestamp: "2024-01-21 14:25:10", user: "mark@email.com", action: "Post approved", details: "Approved post 'Finding strength after loss'", status: "Success", ip: "192.168.1.101" },
  { id: 3, timestamp: "2024-01-21 14:20:05", user: "admin@insidelyf.com", action: "Failed login attempt", details: "Invalid password", status: "Failed", ip: "192.168.1.102" },
  { id: 4, timestamp: "2024-01-21 14:15:30", user: "emma@email.com", action: "Comment deleted", details: "Deleted inappropriate comment", status: "Success", ip: "192.168.1.103" },
  { id: 5, timestamp: "2024-01-21 14:10:15", user: "admin@insidelyf.com", action: "Backup created", details: "Database backup completed", status: "Success", ip: "192.168.1.100" },
];

const SECURITY_SETTINGS = {
  twoFactorEnabled: false,
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  passwordMinLength: 8,
  requireSpecialChars: true,
  autoBackup: true,
  backupRetention: 30,
  auditLogRetention: 90,
};

interface SecurityProps {
  userRole?: 'admin' | 'moderator';
}

export default function Security({ userRole = 'admin' }: SecurityProps) {
  const [settings, setSettings] = useState(SECURITY_SETTINGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(AUDIT_LOGS);
  const { toast } = useToast();

  if (userRole === 'moderator') {
    return (
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Security - Limited Access</h3>
        <p className="text-muted-foreground">
          Security settings are only accessible to administrators. Contact an admin for security-related concerns.
        </p>
      </div>
    );
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `${key} has been updated successfully.`,
    });
  };

  const enableTwoFactor = () => {
    setSettings(prev => ({ ...prev, twoFactorEnabled: true }));
    toast({
      title: "Two-Factor Authentication Enabled",
      description: "2FA has been enabled for your account.",
    });
  };

  const exportAuditLogs = () => {
    const data = {
      auditLogs: filteredLogs,
      exportDate: new Date().toISOString(),
      totalEntries: filteredLogs.length,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Audit Logs Exported",
      description: "Audit logs have been exported successfully.",
    });
  };

  const filterLogs = (term: string) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredLogs(AUDIT_LOGS);
    } else {
      const filtered = AUDIT_LOGS.filter(log =>
        log.user.toLowerCase().includes(term.toLowerCase()) ||
        log.action.toLowerCase().includes(term.toLowerCase()) ||
        log.details.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredLogs(filtered);
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Secure</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins (24h)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Within normal range</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Key className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!settings.twoFactorEnabled ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication is not enabled. We strongly recommend enabling it for enhanced security.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication is enabled and protecting your account.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="2fa-toggle">Enable Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require authentication app for login</p>
            </div>
            <Switch
              id="2fa-toggle"
              checked={settings.twoFactorEnabled}
              onCheckedChange={() => enableTwoFactor()}
            />
          </div>
          
          {!settings.twoFactorEnabled && (
            <Button onClick={enableTwoFactor}>
              <Shield className="w-4 h-4 mr-2" />
              Enable 2FA
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Configuration</CardTitle>
          <CardDescription>Configure security policies and restrictions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max-attempts">Max Login Attempts</Label>
              <Input
                id="max-attempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password-length">Minimum Password Length</Label>
              <Input
                id="password-length"
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backup-retention">Backup Retention (days)</Label>
              <Input
                id="backup-retention"
                type="number"
                value={settings.backupRetention}
                onChange={(e) => handleSettingChange('backupRetention', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Special Characters</Label>
                <p className="text-sm text-muted-foreground">Passwords must contain special characters</p>
              </div>
              <Switch
                checked={settings.requireSpecialChars}
                onCheckedChange={(checked) => handleSettingChange('requireSpecialChars', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Automatic Backups</Label>
                <p className="text-sm text-muted-foreground">Enable daily automated backups</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
          <CardDescription>Track all administrative actions and security events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => filterLogs(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={exportAuditLogs} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>
                      {log.status === 'Success' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
