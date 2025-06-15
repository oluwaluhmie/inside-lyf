
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, Globe, AlertTriangle, CheckCircle, BarChart3, External, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminRole } from "@/types/adminRoles";

const SEO_METRICS = [
  { page: "/", title: "Home Page", score: 92, issues: 2, traffic: 15420, keywords: 45 },
  { page: "/community", title: "Community", score: 88, issues: 3, traffic: 8750, keywords: 32 },
  { page: "/stories", title: "Stories", score: 95, issues: 1, traffic: 12300, keywords: 28 },
  { page: "/circles", title: "Circles", score: 76, issues: 5, traffic: 6500, keywords: 22 },
  { page: "/premium", title: "Premium", score: 84, issues: 4, traffic: 4200, keywords: 18 },
];

const KEYWORD_RANKINGS = [
  { keyword: "life stories community", position: 3, volume: 1200, difficulty: 45, trending: "up" },
  { keyword: "anonymous sharing platform", position: 7, volume: 800, difficulty: 60, trending: "up" },
  { keyword: "mental health support", position: 12, volume: 2500, difficulty: 75, trending: "down" },
  { keyword: "parenting advice", position: 8, volume: 1800, difficulty: 55, trending: "stable" },
  { keyword: "relationship counseling", position: 15, volume: 900, difficulty: 65, trending: "up" },
];

const SITE_ISSUES = [
  { type: "error", message: "Missing meta description on 3 pages", priority: "high", pages: 3 },
  { type: "warning", message: "Slow page load times on mobile", priority: "medium", pages: 5 },
  { type: "info", message: "Images missing alt text", priority: "low", pages: 8 },
  { type: "error", message: "Broken internal links found", priority: "high", pages: 2 },
];

interface SEOToolsProps {
  userRole: AdminRole;
}

export default function SEOTools({ userRole }: SEOToolsProps) {
  const [seoSettings, setSeoSettings] = useState({
    siteName: "Insidelyf",
    siteDescription: "A safe community for sharing life stories and connecting with others",
    defaultTitle: "Insidelyf - Share Your Story",
    defaultKeywords: "life stories, community, support, anonymous sharing",
    analyticsId: "GA-XXXXXXXX-X",
    searchConsoleVerified: true,
  });
  const { toast } = useToast();

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 70) return "secondary";
    return "destructive";
  };

  const getIssueBadgeVariant = (type: string) => {
    switch (type) {
      case 'error': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      default: return 'outline';
    }
  };

  const getTrendingIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  const updateSettings = () => {
    toast({
      title: "SEO Settings Updated",
      description: "Your SEO settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">SEO Tools</h2>
        <p className="text-muted-foreground">Optimize your site for search engines and track performance</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="pages">Page Analysis</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* SEO Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall SEO Score</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">87</div>
                <Progress value={87} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Good performance</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47,170</div>
                <p className="text-xs text-muted-foreground">+12.3% this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Indexed Pages</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">98% index rate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">5</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Site Audit</CardTitle>
                <CardDescription>Run a comprehensive SEO audit</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Run Site Audit
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Submit Sitemap</CardTitle>
                <CardDescription>Update your sitemap to search engines</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Link2 className="w-4 h-4 mr-2" />
                  Submit to Google
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Report</CardTitle>
                <CardDescription>Generate detailed SEO report</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>Track your keyword positions and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Search Volume</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {KEYWORD_RANKINGS.map((keyword, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{keyword.keyword}</TableCell>
                      <TableCell>
                        <Badge variant={keyword.position <= 10 ? 'default' : 'secondary'}>
                          #{keyword.position}
                        </Badge>
                      </TableCell>
                      <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={keyword.difficulty} className="w-16" />
                          <span className="text-sm">{keyword.difficulty}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getTrendingIcon(keyword.trending)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page SEO Analysis</CardTitle>
              <CardDescription>SEO performance for individual pages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>SEO Score</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>Traffic</TableHead>
                    <TableHead>Keywords</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SEO_METRICS.map((page, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{page.page}</TableCell>
                      <TableCell>{page.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={getScoreVariant(page.score)}>
                            {page.score}
                          </Badge>
                          <Progress value={page.score} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={page.issues > 0 ? 'destructive' : 'default'}>
                          {page.issues} issues
                        </Badge>
                      </TableCell>
                      <TableCell>{page.traffic.toLocaleString()}</TableCell>
                      <TableCell>{page.keywords}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <External className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Issues</CardTitle>
              <CardDescription>Issues that need attention to improve SEO performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {SITE_ISSUES.map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant={getIssueBadgeVariant(issue.type)}>
                        {issue.type}
                      </Badge>
                      <div>
                        <p className="font-medium">{issue.message}</p>
                        <p className="text-sm text-muted-foreground">
                          Affects {issue.pages} page{issue.pages > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={issue.priority === 'high' ? 'destructive' : issue.priority === 'medium' ? 'secondary' : 'outline'}>
                        {issue.priority} priority
                      </Badge>
                      <Button size="sm">Fix</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Configure global SEO settings for your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={seoSettings.siteName}
                    onChange={(e) => setSeoSettings({ ...seoSettings, siteName: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultTitle">Default Title</Label>
                  <Input
                    id="defaultTitle"
                    value={seoSettings.defaultTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, defaultTitle: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={seoSettings.siteDescription}
                    onChange={(e) => setSeoSettings({ ...seoSettings, siteDescription: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="defaultKeywords">Default Keywords</Label>
                  <Input
                    id="defaultKeywords"
                    value={seoSettings.defaultKeywords}
                    onChange={(e) => setSeoSettings({ ...seoSettings, defaultKeywords: e.target.value })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analyticsId">Google Analytics ID</Label>
                  <Input
                    id="analyticsId"
                    value={seoSettings.analyticsId}
                    onChange={(e) => setSeoSettings({ ...seoSettings, analyticsId: e.target.value })}
                    placeholder="GA-XXXXXXXX-X"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Search Console Status</Label>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Verified</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={updateSettings}>
                Save SEO Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
