
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Eye, Save, Calendar, Image, FileText, Globe, Clock, Bold, Italic, AlignCenter, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminRole } from "@/types/adminRoles";

const CONTENT_ITEMS = [
  { id: 1, title: "Welcome to Insidelyf", type: "page", status: "published", author: "Admin", lastModified: "2024-01-21", views: 2500 },
  { id: 2, title: "Community Guidelines", type: "page", status: "published", author: "Sarah M.", lastModified: "2024-01-20", views: 1800 },
  { id: 3, title: "Privacy Policy", type: "page", status: "draft", author: "Legal Team", lastModified: "2024-01-19", views: 0 },
  { id: 4, title: "New Feature Announcement", type: "post", status: "scheduled", author: "Admin", lastModified: "2024-01-18", views: 0 },
  { id: 5, title: "Weekly Newsletter Template", type: "template", status: "published", author: "Marketing", lastModified: "2024-01-17", views: 450 },
];

const CONTENT_TEMPLATES = [
  { id: 1, name: "Blog Post", description: "Standard blog post template", category: "content" },
  { id: 2, name: "Announcement", description: "Community announcement template", category: "marketing" },
  { id: 3, name: "Newsletter", description: "Weekly newsletter template", category: "marketing" },
  { id: 4, name: "Guidelines", description: "Community guidelines template", category: "legal" },
];

interface ContentEditorProps {
  userRole: AdminRole;
}

export default function ContentEditor({ userRole }: ContentEditorProps) {
  const [content, setContent] = useState(CONTENT_ITEMS);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [isRichTextMode, setIsRichTextMode] = useState(true);
  const [newContent, setNewContent] = useState({
    title: "",
    type: "page",
    status: "draft",
    content: "",
    excerpt: "",
    featured: false,
    publishDate: "",
  });
  const { toast } = useToast();

  const createContent = () => {
    if (!newContent.title || !newContent.content) {
      toast({
        title: "Error",
        description: "Please fill in the title and content.",
        variant: "destructive",
      });
      return;
    }

    const contentItem = {
      id: content.length + 1,
      title: newContent.title,
      type: newContent.type,
      status: newContent.status,
      author: "Current User",
      lastModified: new Date().toISOString().split('T')[0],
      views: 0,
    };

    setContent([...content, contentItem]);
    setNewContent({
      title: "",
      type: "page",
      status: "draft",
      content: "",
      excerpt: "",
      featured: false,
      publishDate: "",
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Content Created",
      description: `${newContent.title} has been created successfully.`,
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'scheduled': return 'outline';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return <FileText className="w-4 h-4" />;
      case 'post': return <Edit className="w-4 h-4" />;
      case 'template': return <Globe className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Content Editor</h2>
          <p className="text-muted-foreground mt-1">Create and manage website content, pages, and templates</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Content</DialogTitle>
              <DialogDescription>
                Create a new page, post, or template for your community.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    placeholder="Enter content title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Content Type</Label>
                  <Select value={newContent.type} onValueChange={(value) => setNewContent({ ...newContent, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="post">Blog Post</SelectItem>
                      <SelectItem value="template">Template</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newContent.status} onValueChange={(value) => setNewContent({ ...newContent, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {newContent.status === 'scheduled' && (
                  <div className="space-y-2">
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input
                      id="publishDate"
                      type="datetime-local"
                      value={newContent.publishDate}
                      onChange={(e) => setNewContent({ ...newContent, publishDate: e.target.value })}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={newContent.excerpt}
                  onChange={(e) => setNewContent({ ...newContent, excerpt: e.target.value })}
                  placeholder="Brief description or excerpt..."
                  rows={3}
                />
              </div>
              
              {/* Rich Text Editor Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Content</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rich Text</span>
                    <Switch
                      checked={isRichTextMode}
                      onCheckedChange={setIsRichTextMode}
                    />
                  </div>
                </div>
                
                {isRichTextMode && (
                  <div className="flex gap-2 p-2 border border-input rounded-md">
                    <Button size="sm" variant="outline">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Type className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Image className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <Textarea
                  id="content"
                  value={newContent.content}
                  onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                  placeholder={isRichTextMode ? "Start typing your content..." : "Write your content here..."}
                  rows={12}
                  className={isRichTextMode ? "font-serif" : "font-mono"}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newContent.featured}
                  onCheckedChange={(checked) => setNewContent({ ...newContent, featured: checked })}
                />
                <Label htmlFor="featured">Featured Content</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={createContent}>
                <Save className="w-4 h-4 mr-2" />
                Create Content
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">Content Library</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="ads">Advertisement Spaces</TabsTrigger>
          <TabsTrigger value="settings">Editor Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          {/* Content Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Content</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{content.length}</div>
                <p className="text-xs text-muted-foreground">
                  {content.filter(c => c.status === 'published').length} published
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Draft Content</CardTitle>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {content.filter(c => c.status === 'draft').length}
                </div>
                <p className="text-xs text-muted-foreground">Needs review</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {content.filter(c => c.status === 'scheduled').length}
                </div>
                <p className="text-xs text-muted-foreground">Auto-publish</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {content.reduce((sum, item) => sum + item.views, 0)}
                </div>
                <p className="text-xs text-muted-foreground">All content</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Table */}
          <Card>
            <CardHeader>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>Manage all your content items</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          {item.type}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>{item.lastModified}</TableCell>
                      <TableCell>{item.views}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Templates</CardTitle>
              <CardDescription>Pre-built templates to speed up content creation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CONTENT_TEMPLATES.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{template.category}</Badge>
                        <Button size="sm">Use Template</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>Manage images, videos, and other media files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Image className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Media Library</h3>
                <p className="text-muted-foreground mb-4">Upload and manage your media files</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Media
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advertisement Spaces</CardTitle>
              <CardDescription>Manage advertisement placements throughout the site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Header Banner</CardTitle>
                    <CardDescription>Top of page banner advertisement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">728 x 90</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Configure</Button>
                        <Button size="sm">Upload Ad</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sidebar Banner</CardTitle>
                    <CardDescription>Side panel advertisement space</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">300 x 250</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Configure</Button>
                        <Button size="sm">Upload Ad</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">In-Content Ad</CardTitle>
                    <CardDescription>Advertisement within content areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">728 x 90</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Configure</Button>
                        <Button size="sm">Upload Ad</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Editor Settings</CardTitle>
              <CardDescription>Configure content editor preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-save drafts</Label>
                  <p className="text-sm text-muted-foreground">Automatically save content while editing</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Rich text editor</Label>
                  <p className="text-sm text-muted-foreground">Enable WYSIWYG editor by default</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Content approval</Label>
                  <p className="text-sm text-muted-foreground">Require approval before publishing</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Grammar check</Label>
                  <p className="text-sm text-muted-foreground">Enable automatic grammar checking</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
