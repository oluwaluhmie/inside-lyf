
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Users, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MOCK_CIRCLES = [
  { 
    id: 1, 
    title: "Parenting", 
    description: "Navigate the beautiful chaos of raising children, share wins and struggles",
    icon: "Baby",
    color: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600",
    members: 2100,
    posts: 1250,
    status: "Active",
    createdDate: "2024-01-15",
    moderator: "Sarah Mitchell"
  },
  { 
    id: 2, 
    title: "Men's Cave", 
    description: "A brotherhood for authentic conversations about masculinity and mental health",
    icon: "Shield",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    members: 1800,
    posts: 890,
    status: "Active",
    createdDate: "2024-01-20",
    moderator: "Mark Johnson"
  },
  { 
    id: 3, 
    title: "Women's Circle", 
    description: "Sisterhood, empowerment, and support through all seasons of womanhood",
    icon: "Users",
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
    members: 2900,
    posts: 1450,
    status: "Active",
    createdDate: "2024-02-01",
    moderator: "Emma Wilson"
  }
];

interface CircleManagementProps {
  userRole?: 'admin' | 'moderator';
  assignedSegments?: string[];
}

export default function CircleManagement({ userRole = 'admin', assignedSegments = [] }: CircleManagementProps) {
  const [circles, setCircles] = useState(MOCK_CIRCLES);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCircle, setNewCircle] = useState({
    title: "",
    description: "",
    icon: "Users",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    moderator: ""
  });
  const { toast } = useToast();

  // Filter circles for moderators
  const filteredCircles = userRole === 'moderator' 
    ? circles.filter(circle => assignedSegments.includes(circle.title))
    : circles;

  const handleCreateCircle = () => {
    const circle = {
      id: Date.now(),
      ...newCircle,
      members: 0,
      posts: 0,
      status: "Active" as const,
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    setCircles([...circles, circle]);
    setIsCreateDialogOpen(false);
    setNewCircle({
      title: "",
      description: "",
      icon: "Users",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      moderator: ""
    });
    
    toast({
      title: "Circle Created",
      description: `${circle.title} circle has been created successfully.`,
    });
  };

  const handleDeleteCircle = (circleId: number) => {
    setCircles(circles.filter(circle => circle.id !== circleId));
    toast({
      title: "Circle Deleted",
      description: "The circle has been permanently deleted.",
      variant: "destructive",
    });
  };

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {userRole === 'moderator' ? 'My Assigned Circles' : 'Circle Management'}
          </h3>
          {userRole === 'admin' && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Circle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Circle</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Circle Title</Label>
                    <Input
                      id="title"
                      value={newCircle.title}
                      onChange={(e) => setNewCircle({...newCircle, title: e.target.value})}
                      placeholder="Enter circle title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCircle.description}
                      onChange={(e) => setNewCircle({...newCircle, description: e.target.value})}
                      placeholder="Describe the purpose of this circle"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="icon">Icon</Label>
                      <Select value={newCircle.icon} onValueChange={(value) => setNewCircle({...newCircle, icon: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Users">Users</SelectItem>
                          <SelectItem value="Heart">Heart</SelectItem>
                          <SelectItem value="Shield">Shield</SelectItem>
                          <SelectItem value="Baby">Baby</SelectItem>
                          <SelectItem value="Crown">Crown</SelectItem>
                          <SelectItem value="Home">Home</SelectItem>
                          <SelectItem value="Sparkles">Sparkles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="moderator">Assign Moderator</Label>
                      <Select value={newCircle.moderator} onValueChange={(value) => setNewCircle({...newCircle, moderator: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select moderator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sarah Mitchell">Sarah Mitchell</SelectItem>
                          <SelectItem value="Mark Johnson">Mark Johnson</SelectItem>
                          <SelectItem value="Emma Wilson">Emma Wilson</SelectItem>
                          <SelectItem value="Alex Parker">Alex Parker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="color">Color Theme</Label>
                    <Select value={newCircle.color} onValueChange={(value) => {
                      const colorMap: Record<string, string> = {
                        "bg-blue-50 border-blue-200": "text-blue-600",
                        "bg-pink-50 border-pink-200": "text-pink-600",
                        "bg-green-50 border-green-200": "text-green-600",
                        "bg-purple-50 border-purple-200": "text-purple-600",
                        "bg-orange-50 border-orange-200": "text-orange-600",
                        "bg-teal-50 border-teal-200": "text-teal-600",
                      };
                      setNewCircle({...newCircle, color: value, iconColor: colorMap[value]});
                    }}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bg-blue-50 border-blue-200">Blue</SelectItem>
                        <SelectItem value="bg-pink-50 border-pink-200">Pink</SelectItem>
                        <SelectItem value="bg-green-50 border-green-200">Green</SelectItem>
                        <SelectItem value="bg-purple-50 border-purple-200">Purple</SelectItem>
                        <SelectItem value="bg-orange-50 border-orange-200">Orange</SelectItem>
                        <SelectItem value="bg-teal-50 border-teal-200">Teal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateCircle} disabled={!newCircle.title || !newCircle.description}>
                      Create Circle
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Circle Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Posts</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Moderator</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCircles.map((circle) => (
            <TableRow key={circle.id}>
              <TableCell className="font-medium">{circle.title}</TableCell>
              <TableCell className="max-w-xs truncate">{circle.description}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  {circle.members.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>{circle.posts.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant="default">{circle.status}</Badge>
              </TableCell>
              <TableCell>{circle.moderator}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{circle.createdDate}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {userRole === 'admin' && (
                    <>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCircle(circle.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
