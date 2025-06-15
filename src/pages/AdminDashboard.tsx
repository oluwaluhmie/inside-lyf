
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, MessageSquare, Crown, BarChart3, Settings, Plus, Eye, Trash2, Edit } from "lucide-react";

const MOCK_STATS = {
  totalUsers: 12847,
  activeUsers: 3421,
  totalPosts: 8934,
  premiumSubscribers: 1205
};

const MOCK_RECENT_POSTS = [
  { id: 1, title: "Finding strength after loss", author: "Sarah M.", thread: "Broken but Healed", status: "Published" },
  { id: 2, title: "Navigating teenage rebellion", author: "Mark J.", thread: "Parenting", status: "Pending" },
  { id: 3, title: "Marriage after infidelity", author: "Anonymous", thread: "Unspoken Marriages", status: "Under Review" },
  { id: 4, title: "Coming out at 40", author: "Alex P.", thread: "Sexualities and Sex", status: "Published" }
];

const MOCK_USERS = [
  { id: 1, name: "Sarah Mitchell", email: "sarah@email.com", status: "Premium", joinDate: "2024-01-15" },
  { id: 2, name: "Mark Johnson", email: "mark@email.com", status: "Free", joinDate: "2024-02-03" },
  { id: 3, name: "Alex Parker", email: "alex@email.com", status: "Premium", joinDate: "2024-01-28" },
  { id: 4, name: "Emma Wilson", email: "emma@email.com", status: "Free", joinDate: "2024-02-10" }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-primary">Insidelyf Admin Dashboard</h1>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Premium
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{MOCK_STATS.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">{MOCK_STATS.activeUsers.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Posts</p>
                    <p className="text-2xl font-bold">{MOCK_STATS.totalPosts.toLocaleString()}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Premium Users</p>
                    <p className="text-2xl font-bold">{MOCK_STATS.premiumSubscribers.toLocaleString()}</p>
                  </div>
                  <Crown className="w-8 h-8 text-amber-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Recent Posts</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Thread</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_RECENT_POSTS.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.thread}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'Published' ? 'bg-green-100 text-green-800' :
                          post.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {post.status}
                        </span>
                      </TableCell>
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
          </TabsContent>

          <TabsContent value="users">
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
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_USERS.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Premium' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
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
          </TabsContent>

          <TabsContent value="content">
            <div className="grid gap-6">
              <div className="bg-white rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-4">Content Moderation</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content-title">Featured Story Title</Label>
                    <Input id="content-title" placeholder="Enter story title" />
                  </div>
                  <div>
                    <Label htmlFor="content-author">Author</Label>
                    <Input id="content-author" placeholder="Author name" />
                  </div>
                  <Button>Add Featured Story</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="premium">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Premium Content Management</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="documentary-title">Documentary Title</Label>
                  <Input id="documentary-title" placeholder="Enter documentary title" />
                </div>
                <div>
                  <Label htmlFor="documentary-description">Description</Label>
                  <Input id="documentary-description" placeholder="Documentary description" />
                </div>
                <Button>Add Premium Content</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
