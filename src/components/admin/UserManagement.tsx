import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Eye, Edit, Trash2, Search, Filter, Ban, UserX, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminRole } from "@/types/adminRoles";

const MOCK_USERS = [
  { 
    id: 1, 
    name: "Sarah Mitchell", 
    email: "sarah@email.com", 
    status: "Premium", 
    joinDate: "2024-01-15", 
    role: "User",
    lastActive: "2024-01-20",
    postsCount: 12,
    commentsCount: 45,
    isActive: true,
    activityLevel: "High"
  },
  { 
    id: 2, 
    name: "Mark Johnson", 
    email: "mark@email.com", 
    status: "Free", 
    joinDate: "2024-02-03", 
    role: "Moderator", 
    assignedSegments: ["Parenting", "Family"],
    lastActive: "2024-01-19",
    postsCount: 8,
    commentsCount: 23,
    isActive: true,
    activityLevel: "Medium"
  },
  { 
    id: 3, 
    name: "Alex Parker", 
    email: "alex@email.com", 
    status: "Premium", 
    joinDate: "2024-01-28", 
    role: "User",
    lastActive: "2024-01-18",
    postsCount: 5,
    commentsCount: 12,
    isActive: false,
    activityLevel: "Low"
  },
  { 
    id: 4, 
    name: "Emma Wilson", 
    email: "emma@email.com", 
    status: "Free", 
    joinDate: "2024-02-10", 
    role: "Moderator", 
    assignedSegments: ["Womens Circle"],
    lastActive: "2024-01-21",
    postsCount: 15,
    commentsCount: 67,
    isActive: true,
    activityLevel: "High"
  }
];

interface UserManagementProps {
  userRole?: AdminRole;
}

export default function UserManagement({ userRole = 'super_admin' }: UserManagementProps) {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterActivity, setFilterActivity] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { toast } = useToast();

  // Only super admins and user admins can see all users
  if (userRole === 'moderator' || (userRole !== 'super_admin' && userRole !== 'user_admin')) {
    return (
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Access Restricted</h3>
        <p className="text-muted-foreground">
          You don't have permission to access user management. Contact a Super Admin or User Admin for assistance.
        </p>
      </div>
    );
  }

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole;
    const matchesStatus = filterStatus === "all" || user.status.toLowerCase() === filterStatus;
    const matchesActivity = filterActivity === "all" || user.activityLevel.toLowerCase() === filterActivity;
    
    return matchesSearch && matchesRole && matchesStatus && matchesActivity;
  });

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast({
      title: "Role Updated",
      description: `User role has been updated to ${newRole}.`,
    });
  };

  const handleSuspendUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: false } : user
    ));
    toast({
      title: "User Suspended",
      description: "User has been temporarily suspended.",
      variant: "destructive",
    });
  };

  const handleBanUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Banned",
      description: "User has been permanently banned and removed.",
      variant: "destructive",
    });
  };

  const handleActivateUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: true } : user
    ));
    toast({
      title: "User Activated",
      description: "User has been reactivated.",
    });
  };

  const viewUserProfile = (user: any) => {
    setSelectedUser(user);
    setIsProfileDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">User Management</h3>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="moderator">Moderators</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterActivity} onValueChange={setFilterActivity}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activity</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Posts/Comments</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id} className={!user.isActive ? "opacity-50" : ""}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {user.name}
                  {!user.isActive && <Badge variant="destructive">Suspended</Badge>}
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select 
                  value={user.role.toLowerCase()} 
                  onValueChange={(value) => handleRoleChange(user.id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === 'Premium' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={
                  user.activityLevel === 'High' ? 'default' :
                  user.activityLevel === 'Medium' ? 'secondary' : 'outline'
                }>
                  {user.activityLevel}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
              <TableCell className="text-sm">{user.postsCount}/{user.commentsCount}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => viewUserProfile(user)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {user.isActive ? (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSuspendUser(user.id)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <UserX className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleBanUser(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleActivateUser(user.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Shield className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* User Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Role</Label>
                  <Badge>{selectedUser.role}</Badge>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge variant={selectedUser.status === 'Premium' ? 'default' : 'secondary'}>
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <Label>Join Date</Label>
                  <p>{selectedUser.joinDate}</p>
                </div>
                <div>
                  <Label>Last Active</Label>
                  <p>{selectedUser.lastActive}</p>
                </div>
                <div>
                  <Label>Posts</Label>
                  <p>{selectedUser.postsCount}</p>
                </div>
                <div>
                  <Label>Comments</Label>
                  <p>{selectedUser.commentsCount}</p>
                </div>
              </div>
              
              {selectedUser.assignedSegments && (
                <div>
                  <Label>Assigned Segments</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedUser.assignedSegments.map((segment: string) => (
                      <Badge key={segment} variant="outline">{segment}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <Label>Activity Level</Label>
                <Badge variant={
                  selectedUser.activityLevel === 'High' ? 'default' :
                  selectedUser.activityLevel === 'Medium' ? 'secondary' : 'outline'
                }>
                  {selectedUser.activityLevel}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
