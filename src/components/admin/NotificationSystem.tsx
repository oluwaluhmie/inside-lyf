
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Send, Settings, Users, Mail, MessageSquare, Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminRole } from "@/types/adminRoles";

const NOTIFICATION_TEMPLATES = [
  { id: 1, name: "Welcome Message", type: "email", subject: "Welcome to Insidelyf", status: "active", usage: 245 },
  { id: 2, name: "Post Approved", type: "push", title: "Your post has been approved", status: "active", usage: 89 },
  { id: 3, name: "Circle Invitation", type: "email", subject: "You've been invited to join a circle", status: "active", usage: 156 },
  { id: 4, name: "Comment Reply", type: "push", title: "Someone replied to your comment", status: "inactive", usage: 0 },
  { id: 5, name: "Weekly Digest", type: "email", subject: "Your weekly Insidelyf digest", status: "active", usage: 1200 },
];

const RECENT_NOTIFICATIONS = [
  { id: 1, recipient: "All Users", type: "Announcement", message: "Platform maintenance scheduled", sent: "2024-01-21 10:00", status: "delivered", opens: 1850 },
  { id: 2, recipient: "Premium Users", type: "Feature Update", message: "New premium features available", sent: "2024-01-20 15:30", status: "delivered", opens: 450 },
  { id: 3, recipient: "Moderators", type: "System Alert", message: "High activity in Parenting circle", sent: "2024-01-20 09:15", status: "delivered", opens: 12 },
  { id: 4, recipient: "New Users", type: "Welcome", message: "Welcome to the Insidelyf community", sent: "2024-01-19 18:45", status: "failed", opens: 0 },
];

const NOTIFICATION_SETTINGS = {
  emailEnabled: true,
  pushEnabled: true,
  smsEnabled: false,
  digestFrequency: "weekly",
  autoModerationAlerts: true,
  systemMaintenanceNotices: true,
  userReportAlerts: true,
};

interface NotificationSystemProps {
  userRole: AdminRole;
}

export default function NotificationSystem({ userRole }: NotificationSystemProps) {
  const [templates, setTemplates] = useState(NOTIFICATION_TEMPLATES);
  const [settings, setSettings] = useState(NOTIFICATION_SETTINGS);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    type: "announcement",
    audience: "all",
    channel: "email",
    subject: "",
    message: "",
    scheduleType: "immediate",
    scheduleDate: "",
  });
  const { toast } = useToast();

  const sendNotification = () => {
    if (!newNotification.subject || !newNotification.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notification Sent",
      description: `Notification sent to ${newNotification.audience} via ${newNotification.channel}.`,
    });

    setNewNotification({
      type: "announcement",
      audience: "all",
      channel: "email",
      subject: "",
      message: "",
      scheduleType: "immediate",
      scheduleDate: "",
    });
    setIsCreateDialogOpen(false);
  };

  const toggleTemplate = (id: number) => {
    setTemplates(templates.map(template => 
      template.id === id 
        ? { ...template, status: template.status === 'active' ? 'inactive' : 'active' }
        : template
    ));
    
    const template = templates.find(t => t.id === id);
    toast({
      title: "Template Updated",
      description: `${template?.name} template ${template?.status === 'active' ? 'deactivated' : 'activated'}.`,
    });
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `${key} has been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notification System</h2>
          <p className="text-muted-foreground">Manage notifications and communication templates</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Send New Notification</DialogTitle>
              <DialogDescription>
                Send a notification to your community members.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Notification Type</Label>
                  <Select value={newNotification.type} onValueChange={(value) => setNewNotification({ ...newNotification, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="update">Feature Update</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="welcome">Welcome</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="audience">Audience</Label>
                  <Select value={newNotification.audience} onValueChange={(value) => setNewNotification({ ...newNotification, audience: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="premium">Premium Users</SelectItem>
                      <SelectItem value="moderators">Moderators</SelectItem>
                      <SelectItem value="new_users">New Users</SelectItem>
                      <SelectItem value="active_users">Active Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="channel">Channel</Label>
                  <Select value={newNotification.channel} onValueChange={(value) => setNewNotification({ ...newNotification, channel: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="push">Push Notification</SelectItem>
                      <SelectItem value="in_app">In-App</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Select value={newNotification.scheduleType} onValueChange={(value) => setNewNotification({ ...newNotification, scheduleType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Send Immediately</SelectItem>
                      <SelectItem value="scheduled">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {newNotification.scheduleType === 'scheduled' && (
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">Schedule Date & Time</Label>
                  <Input
                    id="scheduleDate"
                    type="datetime-local"
                    value={newNotification.scheduleDate}
                    onChange={(e) => setNewNotification({ ...newNotification, scheduleDate: e.target.value })}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject/Title</Label>
                <Input
                  id="subject"
                  value={newNotification.subject}
                  onChange={(e) => setNewNotification({ ...newNotification, subject: e.target.value })}
                  placeholder="Enter notification subject"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  placeholder="Enter your message..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={sendNotification}>
                {newNotification.scheduleType === 'immediate' ? 'Send Now' : 'Schedule Notification'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure global notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable email notifications</p>
              </div>
              <Switch
                checked={settings.emailEnabled}
                onCheckedChange={(checked) => handleSettingChange('emailEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable push notifications</p>
              </div>
              <Switch
                checked={settings.pushEnabled}
                onCheckedChange={(checked) => handleSettingChange('pushEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable SMS notifications</p>
              </div>
              <Switch
                checked={settings.smsEnabled}
                onCheckedChange={(checked) => handleSettingChange('smsEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Moderation Alerts</Label>
                <p className="text-sm text-muted-foreground">Alert on auto-moderation</p>
              </div>
              <Switch
                checked={settings.autoModerationAlerts}
                onCheckedChange={(checked) => handleSettingChange('autoModerationAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Notices</Label>
                <p className="text-sm text-muted-foreground">System maintenance alerts</p>
              </div>
              <Switch
                checked={settings.systemMaintenanceNotices}
                onCheckedChange={(checked) => handleSettingChange('systemMaintenanceNotices', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>User Report Alerts</Label>
                <p className="text-sm text-muted-foreground">Alert on user reports</p>
              </div>
              <Switch
                checked={settings.userReportAlerts}
                onCheckedChange={(checked) => handleSettingChange('userReportAlerts', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Templates</CardTitle>
          <CardDescription>Manage reusable notification templates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject/Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage Count</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {template.type === 'email' ? <Mail className="w-3 h-3 mr-1" /> : <Bell className="w-3 h-3 mr-1" />}
                      {template.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{template.subject || template.title}</TableCell>
                  <TableCell>
                    <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                      {template.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{template.usage}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Switch
                        checked={template.status === 'active'}
                        onCheckedChange={() => toggleTemplate(template.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Track recently sent notifications and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Opens</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_NOTIFICATIONS.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>{notification.recipient}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{notification.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{notification.message}</TableCell>
                  <TableCell className="font-mono text-sm">{notification.sent}</TableCell>
                  <TableCell>
                    <Badge variant={notification.status === 'delivered' ? 'default' : 'destructive'}>
                      {notification.status === 'delivered' ? <CheckCircle className="w-3 h-3 mr-1" /> : null}
                      {notification.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{notification.opens}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
