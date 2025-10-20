
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Globe, Search, TrendingUp, BarChart3, Settings, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminRole } from "@/types/adminRoles";

const SEO_PAGES = [
  { id: 1, title: "Homepage", url: "/", metaTitle: "Insidelyf - Share Your Story", metaDescription: "Join our community...", status: "optimized" },
  { id: 2, title: "About", url: "/about", metaTitle: "About Insidelyf", metaDescription: "Learn more about...", status: "needs work" },
  { id: 3, title: "Community", url: "/community", metaTitle: "Community Stories", metaDescription: "Read inspiring...", status: "optimized" },
];

const KEYWORDS = [
  { keyword: "community stories", volume: 1200, difficulty: "medium", position: 3 },
  { keyword: "anonymous sharing", volume: 800, difficulty: "low", position: 7 },
  { keyword: "support groups", volume: 2500, difficulty: "high", position: 12 },
];

interface SEOToolsProps {
  userRole: AdminRole;
}

export default function SEOTools({ userRole }: SEOToolsProps) {
  const [pages, setPages] = useState(SEO_PAGES);
  const [isAddPageOpen, setIsAddPageOpen] = useState(false);
  const [newPage, setNewPage] = useState({
    title: "",
    url: "",
    metaTitle: "",
    metaDescription: "",
  });
  const { toast } = useToast();

  const addPage = () => {
    if (!newPage.title || !newPage.url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const page = {
      id: pages.length + 1,
      title: newPage.title,
      url: newPage.url,
      metaTitle: newPage.metaTitle,
      metaDescription: newPage.metaDescription,
      status: "needs work",
    };

    setPages([...pages, page]);
    setNewPage({ title: "", url: "", metaTitle: "", metaDescription: "" });
    setIsAddPageOpen(false);
    
    toast({
      title: "Page Added",
      description: "SEO page has been added successfully.",
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'optimized': return 'default';
      case 'needs work': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">SEO Tools</h2>
          <p className="text-muted-foreground mt-1">Optimize your site's search engine performance</p>
        </div>
        
        <Dialog open={isAddPageOpen} onOpenChange={setIsAddPageOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Page
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add SEO Page</DialogTitle>
              <DialogDescription>
                Add a new page to monitor and optimize for SEO.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={newPage.title}
                  onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                  placeholder="Enter page title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={newPage.url}
                  onChange={(e) => setNewPage({ ...newPage, url: e.target.value })}
                  placeholder="/page-url"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={newPage.metaTitle}
                  onChange={(e) => setNewPage({ ...newPage, metaTitle: e.target.value })}
                  placeholder="Page meta title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={newPage.metaDescription}
                  onChange={(e) => setNewPage({ ...newPage, metaDescription: e.target.value })}
                  placeholder="Page meta description"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addPage}>Add Page</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="pages">Page Optimization</TabsTrigger>
          <TabsTrigger value="keywords">Keyword Research</TabsTrigger>
          <TabsTrigger value="analytics">SEO Analytics</TabsTrigger>
          <TabsTrigger value="settings">SEO Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-6">
          {/* SEO Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pages.length}</div>
                <p className="text-xs text-muted-foreground">Being monitored</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Optimized</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {pages.filter(p => p.status === 'optimized').length}
                </div>
                <p className="text-xs text-muted-foreground">Pages optimized</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Position</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.3</div>
                <p className="text-xs text-muted-foreground">Search ranking</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Traffic</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5K</div>
                <p className="text-xs text-muted-foreground">Monthly organic</p>
              </CardContent>
            </Card>
          </div>

          {/* Pages Table */}
          <Card>
            <CardHeader>
              <CardTitle>Page Optimization</CardTitle>
              <CardDescription>Monitor and optimize individual pages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Meta Title</TableHead>
                    <TableHead>Meta Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>{page.url}</TableCell>
                      <TableCell className="max-w-xs truncate">{page.metaTitle}</TableCell>
                      <TableCell className="max-w-xs truncate">{page.metaDescription}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(page.status)}>
                          {page.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Link className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4" />
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

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Research</CardTitle>
              <CardDescription>Track keyword performance and opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Search Volume</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Current Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {KEYWORDS.map((keyword, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{keyword.keyword}</TableCell>
                      <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          keyword.difficulty === 'low' ? 'default' :
                          keyword.difficulty === 'medium' ? 'secondary' : 'destructive'
                        }>
                          {keyword.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>{keyword.position}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Analytics</CardTitle>
              <CardDescription>Monitor your SEO performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">SEO Analytics Dashboard</h3>
                <p className="text-muted-foreground">Detailed analytics and reporting coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Configure SEO optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-generate meta descriptions</Label>
                  <p className="text-sm text-muted-foreground">Automatically create meta descriptions for pages</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>XML Sitemap</Label>
                  <p className="text-sm text-muted-foreground">Auto-generate and update XML sitemap</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Schema markup</Label>
                  <p className="text-sm text-muted-foreground">Add structured data to pages</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
