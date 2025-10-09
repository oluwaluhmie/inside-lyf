import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, User } from "lucide-react";

interface UserProfileManagementProps {
  userRole?: 'admin' | 'moderator';
}

export default function UserProfileManagement({ userRole = 'admin' }: UserProfileManagementProps) {
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "user",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "user",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily@example.com",
      role: "user",
      joinDate: "2023-12-10",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david@example.com",
      role: "moderator",
      joinDate: "2024-01-05",
    }
  ];

  const canModify = userRole === 'admin';

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-lg font-semibold mb-4">User Profile Management</h3>
      
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{user.name}</h4>
                    {user.role === 'moderator' && (
                      <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        <Shield className="w-3 h-3" />
                        <span>Moderator</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              
              {canModify && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Suspend</Button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Join Date:</span>
                <p className="font-medium">{user.joinDate}</p>
              </div>
              <div>
                <span className="text-gray-500">Role:</span>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {!canModify && (
        <p className="text-sm text-gray-500 mt-4">
          As a moderator, you can view user profiles but cannot modify them.
        </p>
      )}
    </div>
  );
}
