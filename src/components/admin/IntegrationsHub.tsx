
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Settings, Check, X, ExternalLink, Zap, Mail, MessageSquare, BarChart3, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminRole } from "@/types/adminRoles";

const AVAILABLE_INTEGRATIONS = [
  {
    id: 1,
    name: "Zapier",
    description: "Automate workflows with 5000+ apps",
    category: "Automation",
    icon: <Zap className="w-8 h-8" />,
    status: "available",
    popular: true,
  },
  {
    id: 2,
    name: "Mailchimp",
    description: "Email marketing and automation",
    category: "Email",
    icon: <Mail className="w-8 h-8" />,
    status: "connected",
    popular: true,
  },
  {
    id: 3,
    name: "Slack",
    description: "Team communication and notifications",
    category: "Communication",
    icon: <MessageSquare className="w-8 h-8" />,
    status: "available",
    popular: false,
  },
  {
    id: 4,
    name: "Google Analytics",
    description: "Website analytics and insights",
    category: "Analytics",
    icon: <BarChart3 className="w-8 h-8" />,
    status: "connected",
    popular: true,
  },
  {
    id: 5,
    name: "Stripe",
    description: "Payment processing and donations",
    category: "Payments",
    icon: <CreditCard className="w-8 h-8" />,
    status: "available",
    popular: true,
  },
];

const ACTIVE_INTEGRATIONS = [
  {
    id: 1,
    name: "Mailchimp",
    status: "active",
    lastSync: "2024-01-21 14:30",
    events: 245,
    health: "good",
  },
  {
    id: 2,
    name: "Google Analytics",
    status: "active",
    lastSync: "2024-01-21 14:25",
    events: 1850,
    health: "good",
  },
  {
    id: 3,
    name: "Webhook Endpoint",
    status: "error",
    lastSync: "2024-01-20 09:15",
    events: 0,
    health: "error",
  },
];

const WEBHOOK_ENDPOINTS = [
  {
    id: 1,
    name: "User Registration",
    url: "https://api.external.com/webhooks/user-reg",
    events: ["user.created", "user.verified"],
    status: "active",
  },
  {
    id: 2,
    name: "Content Moderation",
    url: "https://api.moderation.com/webhooks/content",
    events: ["post.created", "comment.created"],
    status: "active",
  },
];

interface IntegrationsHubProps {
  userRole: AdminRole;
}

export default function IntegrationsHub({ userRole }: IntegrationsHubProps) {
  const [integrations, setIntegrations] = useState(AVAILABLE_INTEGRATIONS);
  const [activeIntegrations, setActiveIntegrations] = useState(ACTIVE_INTEGRATIONS);
  const [webhooks, setWebhooks] = useState(WEBHOOK_ENDPOINTS);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [newWebhook, setNewWebhook] = useState({ name: "", url: "", events: [] });
  const { toast } = useToast();

  const connectIntegration = (integration: any) => {
    setSelectedIntegration(integration);
    setIsConfigDialogOpen(true);
  };

  const saveIntegrationConfig = () => {
    toast({
      title: "Integration Connected",
      description: `${selectedIntegration?.name} has been connected successfully.`,
    });
    setIsConfigDialogOpen(false);
    setSelectedIntegration(null);
  };

  const disconnectIntegration = (id: number) => {
    setActiveIntegrations(activeIntegrations.filter(integration => integration.id !== id));
    toast({
      title: "Integration Disconnected",
      description: "Integration has been disconnected successfully.",
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': case 'connected': return 'default';
      case 'error': return 'destructive';
      case 'available': return 'secondary';
      default: return 'outline';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Integrations Hub</h2>
        <p className="text-muted-foreground mt-1">Connect third-party services and manage data flows</p>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-6">
        <TabsList>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="active">Active Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          {/* Popular Integrations */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Integrations</CardTitle>
              <CardDescription>Most commonly used integrations for community platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.filter(i => i.popular).map((integration) => (
                  <Card key={integration.id} className="relative">
                    {integration.popular && (
                      <Badge className="absolute top-2 right-2">Popular</Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        {integration.icon}
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <Badge variant="outline">{integration.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{integration.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant={getStatusBadgeVariant(integration.status)}>
                          {integration.status === 'connected' ? (
                            <Check className="w-3 h-3 mr-1" />
                          ) : null}
                          {integration.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant={integration.status === 'connected' ? 'outline' : 'default'}
                          onClick={() => connectIntegration(integration)}
                        >
                          {integration.status === 'connected' ? 'Configure' : 'Connect'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All Integrations */}
          <Card>
            <CardHeader>
              <CardTitle>All Available Integrations</CardTitle>
              <CardDescription>Browse all available integrations by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {integration.icon}
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(integration.status)}>
                        {integration.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Integrations</CardTitle>
              <CardDescription>Manage your connected integrations and monitor their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeIntegrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="font-medium">{integration.name}</h4>
                        <Badge variant={getStatusBadgeVariant(integration.status)}>
                          {integration.status}
                        </Badge>
                        <div className={`text-sm ${getHealthColor(integration.health)}`}>
                          {integration.health} health
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last sync: {integration.lastSync} • {integration.events} events processed
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => disconnectIntegration(integration.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Webhook Endpoints</CardTitle>
                  <CardDescription>Configure webhooks to send data to external services</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="font-medium">{webhook.name}</h4>
                        <Badge variant={getStatusBadgeVariant(webhook.status)}>
                          {webhook.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>URL: {webhook.url}</p>
                        <p>Events: {webhook.events.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Manage API keys and access settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>API Access</Label>
                  <p className="text-sm text-muted-foreground">Enable external API access</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label>API Base URL</Label>
                <div className="flex gap-2">
                  <Input value="https://api.insidelyf.com/v1" readOnly />
                  <Button variant="outline">Copy</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input value="sk_live_..." type="password" readOnly />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">Limit API requests per minute</p>
                </div>
                <Input className="w-20" defaultValue="1000" />
              </div>
              
              <Button>Save API Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Integration Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Set up your {selectedIntegration?.name} integration
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" placeholder="Enter your API key" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input id="webhookUrl" placeholder="https://your-webhook-url.com" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveIntegrationConfig}>Connect Integration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
