
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";

const MOCK_USERS = [
  { id: 1, name: "Sarah Mitchell", email: "sarah@email.com", status: "Premium", joinDate: "2024-01-15", role: "User" },
  { id: 2, name: "Mark Johnson", email: "mark@email.com", status: "Free", joinDate: "2024-02-03", role: "Moderator", assignedSegments: ["Parenting", "Family"] },
  { id: 3, name: "Alex Parker", email: "alex@email.com", status: "Premium", joinDate: "2024-01-28", role: "User" },
  { id: 4, name: "Emma Wilson", email: "emma@email.com", status: "Free", joinDate: "2024-02-10", role: "Moderator", assignedSegments: ["Womens Circle"] }
];

interface UserManagementProps {
  userRole?: 'admin' | 'moderator';
}

export default function UserManagement({ userRole = 'admin' }: UserManagementProps) {
  const [users] = useState(MOCK_USERS);

  // Only admins can see all users, moderators have limited access
  if (userRole === 'moderator') {
    return (
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Limited Access</h3>
        <p className="text-muted-foreground">
          As a moderator, you don't have access to user management. Contact an administrator for user-related issues.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">User Management</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Segments</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.role === 'Moderator' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.status === 'Premium' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell>
                {user.assignedSegments ? (
                  <div className="flex flex-wrap gap-1">
                    {user.assignedSegments.map(segment => (
                      <span key={segment} className="px-1 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                        {segment}
                      </span>
                    ))}
                  </div>
                ) : '-'}
              </TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
