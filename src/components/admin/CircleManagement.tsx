
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Archive, Users, MessageSquare, Settings, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminRole } from "@/types/adminRoles";

const MOCK_CIRCLES = [
  { id: 1, name: "Parenting", description: "Support for parents navigating challenges", members: 1250, posts: 89, isActive: true, category: "Family", privacy: "Public", moderators: ["Sarah M.", "John D."] },
  { id: 2, name: "Mens Cave", description: "Safe space for men to share experiences", members: 890, posts: 67, isActive: true, category: "Men", privacy: "Private", moderators: ["Mark J."] },
  { id: 3, name: "Womens Circle", description: "Empowering women through shared stories", members: 1100, posts: 134, isActive: true, category: "Women", privacy: "Public", moderators: ["Emma R.", "Lisa K."] },
  { id: 4, name: "Broken but Healed", description: "Recovery and healing journey", members: 750, posts: 201, isActive: true, category: "Recovery", privacy: "Private", moderators: ["Alex P."] },
  { id: 5, name: "Unspoken Marriages", description: "Marriage challenges and solutions", members: 620, posts: 156, isActive: false, category: "Relationships", privacy: "Private", moderators: ["Mike L."] },
];

interface CircleManagementProps {
  userRole: AdminRole;
  assignedSegments?: string[];
}

export default function CircleManagement({ userRole, assignedSegments = [] }: CircleManagementProps) {
  const [circles, setCircles] = useState(MOCK_CIRCLES);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCircle, setEditingCircle] = useState<any>(null);
  const [newCircle, setNewCircle] = useState({
    name: "",
    description: "",
    category: "",
    privacy: "Public",
    moderators: "",
  });
  const { toast } = useToast();

  // Permission checks
  const canCreateCircles = userRole === 'super_admin' || userRole === 'circle_admin';
  const canEditAllCircles = userRole === 'super_admin' || userRole === 'circle_admin';
  const canModerateAssigned = userRole === 'moderator' && assignedSegments.length > 0;

  // Filter circles based on permissions
  const visibleCircles = userRole === 'moderator' 
    ? circles.filter(circle => assignedSegments.includes(circle.category))
    : circles;

  const handleCreateCircle = () => {
    if (!newCircle.name || !newCircle.description || !newCircle.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const circle = {
      id: circles.length + 1,
      name: newCircle.name,
      description: newCircle.description,
      members: 0,
      posts: 0,
      isActive: true,
      category: newCircle.category,
      privacy: newCircle.privacy,
      moderators: newCircle.moderators.split(',').map(m => m.trim()).filter(m => m),
    };

    setCircles([...circles, circle]);
    setNewCircle({ name: "", description: "", category: "", privacy: "Public", moderators: "" });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Circle Created",
      description: `${newCircle.name} has been created successfully.`,
    });
  };

  const toggleCircleStatus = (id: number) => {
    setCircles(circles.map(circle => 
      circle.id === id ? { ...circle, isActive: !circle.isActive } : circle
    ));
    
    const circle = circles.find(c => c.id === id);
    toast({
      title: "Circle Updated",
      description: `${circle?.name} has been ${circle?.isActive ? 'deactivated' : 'activated'}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Circle Management</h2>
          <p className="text-muted-foreground mt-1">Manage community circles and their settings</p>
          {userRole === 'moderator' && (
            <p className="text-sm text-blue-600 mt-1">
              Assigned segments: {assignedSegments.join(', ')}
            </p>
          )}
        </div>
        
        {canCreateCircles && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Circle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Circle</DialogTitle>
                <DialogDescription>
                  Add a new community circle for members to connect and share.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Circle Name</Label>
                  <Input
                    id="name"
                    value={newCircle.name}
                    onChange={(e) => setNewCircle({ ...newCircle, name: e.target.value })}
                    placeholder="Enter circle name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCircle.description}
                    onChange={(e) => setNewCircle({ ...newCircle, description: e.target.value })}
                    placeholder="Describe the circle's purpose"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newCircle.category} onValueChange={(value) => setNewCircle({ ...newCircle, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Family">Family</SelectItem>
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                      <SelectItem value="Recovery">Recovery</SelectItem>
                      <SelectItem value="Relationships">Relationships</SelectItem>
                      <SelectItem value="Mental Health">Mental Health</SelectItem>
                      <SelectItem value="Career">Career</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="privacy">Privacy</Label>
                  <Select value={newCircle.privacy} onValueChange={(value) => setNewCircle({ ...newCircle, privacy: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moderators">Moderators (comma-separated)</Label>
                  <Input
                    id="moderators"
                    value={newCircle.moderators}
                    onChange={(e) => setNewCircle({ ...newCircle, moderators: e.target.value })}
                    placeholder="John Doe, Jane Smith"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateCircle}>Create Circle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Circles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCircles.map((circle) => (
          <Card key={circle.id} className={circle.isActive ? "" : "opacity-60"}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{circle.name}</CardTitle>
                  <CardDescription>{circle.description}</CardDescription>
                </div>
                <Badge variant={circle.privacy === 'Public' ? 'default' : 'secondary'}>
                  {circle.privacy}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {circle.members} members
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {circle.posts} posts
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Category: {circle.category}</p>
                  <p className="text-sm text-muted-foreground">
                    Moderators: {circle.moderators.join(', ')}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={circle.isActive}
                      onCheckedChange={() => toggleCircleStatus(circle.id)}
                      disabled={!canEditAllCircles && !canModerateAssigned}
                    />
                    <span className="text-sm">{circle.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  
                  {(canEditAllCircles || (canModerateAssigned && assignedSegments.includes(circle.category))) && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Circles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visibleCircles.length}</div>
            <p className="text-xs text-muted-foreground">
              {visibleCircles.filter(c => c.isActive).length} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {visibleCircles.reduce((sum, circle) => sum + circle.members, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all circles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {visibleCircles.reduce((sum, circle) => sum + circle.posts, 0)}
            </div>
            <p className="text-xs text-muted-foreground">All circle content</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(visibleCircles.reduce((sum, circle) => sum + circle.members, 0) / visibleCircles.length)}
            </div>
            <p className="text-xs text-muted-foreground">Per circle</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
