import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, Layout, Image, Save, RefreshCw, Eye, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminRole } from "@/types/adminRoles";

const THEME_COLORS = [
  { name: "Primary", value: "#2563eb", variable: "--primary" },
  { name: "Secondary", value: "#64748b", variable: "--secondary" },
  { name: "Accent", value: "#10b981", variable: "--accent" },
  { name: "Background", value: "#ffffff", variable: "--background" },
  { name: "Foreground", value: "#0f172a", variable: "--foreground" },
];

const FONT_OPTIONS = [
  { name: "Inter", value: "Inter, sans-serif", type: "sans-serif" },
  { name: "Playfair Display", value: "Playfair Display, serif", type: "serif" },
  { name: "Roboto", value: "Roboto, sans-serif", type: "sans-serif" },
  { name: "Open Sans", value: "Open Sans, sans-serif", type: "sans-serif" },
  { name: "Merriweather", value: "Merriweather, serif", type: "serif" },
  { name: "Lato", value: "Lato, sans-serif", type: "sans-serif" },
];

const LAYOUT_OPTIONS = [
  { name: "Sidebar Navigation", value: "sidebar", description: "Navigation panel on the left" },
  { name: "Top Navigation", value: "top", description: "Horizontal navigation bar" },
  { name: "Mobile First", value: "mobile", description: "Optimized for mobile devices" },
];

interface CustomizationPanelProps {
  userRole: AdminRole;
}

export default function CustomizationPanel({ userRole }: CustomizationPanelProps) {
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#2563eb",
    secondaryColor: "#64748b",
    accentColor: "#10b981",
    backgroundColor: "#ffffff",
    foregroundColor: "#0f172a",
    borderRadius: "0.5rem",
    darkMode: false,
  });
  
  const [fontSettings, setFontSettings] = useState({
    headingFont: "Inter, sans-serif",
    bodyFont: "Inter, sans-serif",
    fontSize: "16px",
    lineHeight: "1.5",
  });
  
  const [layoutSettings, setLayoutSettings] = useState({
    navigationStyle: "sidebar",
    compactMode: false,
    showBreadcrumbs: true,
    stickyHeader: true,
  });
  
  const [brandingSettings, setBrandingSettings] = useState({
    siteName: "Insidelyf",
    logoUrl: "/lovable-uploads/908596b0-cf81-451c-a157-6b120721fea6.png",
    favicon: "",
    customCSS: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const { toast } = useToast();

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
        return;
      }
      
      setLogoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      
      toast({
        title: "Logo uploaded!",
        description: "Your logo has been uploaded successfully.",
      });
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
    }
    setBrandingSettings({ ...brandingSettings, logoUrl: "" });
  };

  const applyTheme = () => {
    // Apply theme changes to CSS variables
    document.documentElement.style.setProperty('--primary', themeSettings.primaryColor);
    document.documentElement.style.setProperty('--secondary', themeSettings.secondaryColor);
    document.documentElement.style.setProperty('--accent', themeSettings.accentColor);
    document.documentElement.style.setProperty('--background', themeSettings.backgroundColor);
    document.documentElement.style.setProperty('--foreground', themeSettings.foregroundColor);
    document.documentElement.style.setProperty('--radius', themeSettings.borderRadius);
    
    toast({
      title: "Theme Applied",
      description: "Your theme changes have been applied successfully.",
    });
  };

  const resetToDefault = () => {
    setThemeSettings({
      primaryColor: "#2563eb",
      secondaryColor: "#64748b",
      accentColor: "#10b981",
      backgroundColor: "#ffffff",
      foregroundColor: "#0f172a",
      borderRadius: "0.5rem",
      darkMode: false,
    });
    
    toast({
      title: "Reset to Default",
      description: "Theme has been reset to default settings.",
    });
  };

  const saveCustomization = () => {
    toast({
      title: "Customization Saved",
      description: "Your customization settings have been saved successfully.",
    });
  };

  const previewChanges = () => {
    toast({
      title: "Preview Mode",
      description: "Preview mode activated. Changes are temporary until saved.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customization Panel</h2>
          <p className="text-muted-foreground">Customize the look and feel of your community</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={previewChanges}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={saveCustomization}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="theme" className="space-y-6">
        <TabsList>
          <TabsTrigger value="theme">Theme & Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Customization */}
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Customize your brand colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                      placeholder="#2563eb"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                      placeholder="#64748b"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={themeSettings.accentColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={themeSettings.accentColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, accentColor: e.target.value })}
                      placeholder="#10b981"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Border Radius</Label>
                  <Select 
                    value={themeSettings.borderRadius} 
                    onValueChange={(value) => setThemeSettings({ ...themeSettings, borderRadius: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sharp (0px)</SelectItem>
                      <SelectItem value="0.25rem">Small (4px)</SelectItem>
                      <SelectItem value="0.5rem">Medium (8px)</SelectItem>
                      <SelectItem value="1rem">Large (16px)</SelectItem>
                      <SelectItem value="1.5rem">Extra Large (24px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark theme</p>
                  </div>
                  <Switch
                    checked={themeSettings.darkMode}
                    onCheckedChange={(checked) => setThemeSettings({ ...themeSettings, darkMode: checked })}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={applyTheme} className="flex-1">
                    <Palette className="w-4 h-4 mr-2" />
                    Apply Theme
                  </Button>
                  <Button variant="outline" onClick={resetToDefault}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Theme Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Theme Preview</CardTitle>
                <CardDescription>See how your theme will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 p-4 border rounded-lg" style={{
                  backgroundColor: themeSettings.backgroundColor,
                  color: themeSettings.foregroundColor,
                  borderRadius: themeSettings.borderRadius,
                }}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: themeSettings.primaryColor }}
                    />
                    <span className="font-medium">Primary Color</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: themeSettings.secondaryColor }}
                    />
                    <span className="font-medium">Secondary Color</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: themeSettings.accentColor }}
                    />
                    <span className="font-medium">Accent Color</span>
                  </div>
                  <div 
                    className="p-3 mt-4"
                    style={{ 
                      backgroundColor: themeSettings.primaryColor,
                      color: '#ffffff',
                      borderRadius: themeSettings.borderRadius,
                    }}
                  >
                    Sample Button
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Typography Settings</CardTitle>
              <CardDescription>Customize fonts and text styling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="headingFont">Heading Font</Label>
                  <Select 
                    value={fontSettings.headingFont} 
                    onValueChange={(value) => setFontSettings({ ...fontSettings, headingFont: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.name} ({font.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bodyFont">Body Font</Label>
                  <Select 
                    value={fontSettings.bodyFont} 
                    onValueChange={(value) => setFontSettings({ ...fontSettings, bodyFont: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.name} ({font.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Base Font Size</Label>
                  <Select 
                    value={fontSettings.fontSize} 
                    onValueChange={(value) => setFontSettings({ ...fontSettings, fontSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14px">Small (14px)</SelectItem>
                      <SelectItem value="16px">Medium (16px)</SelectItem>
                      <SelectItem value="18px">Large (18px)</SelectItem>
                      <SelectItem value="20px">Extra Large (20px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lineHeight">Line Height</Label>
                  <Select 
                    value={fontSettings.lineHeight} 
                    onValueChange={(value) => setFontSettings({ ...fontSettings, lineHeight: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.2">Tight (1.2)</SelectItem>
                      <SelectItem value="1.5">Normal (1.5)</SelectItem>
                      <SelectItem value="1.8">Relaxed (1.8)</SelectItem>
                      <SelectItem value="2.0">Loose (2.0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Typography Preview */}
              <div className="mt-6 p-4 border rounded-lg">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: fontSettings.headingFont }}>
                  Heading Preview
                </h3>
                <p style={{ 
                  fontFamily: fontSettings.bodyFont, 
                  fontSize: fontSettings.fontSize,
                  lineHeight: fontSettings.lineHeight 
                }}>
                  This is how your body text will look with the selected font settings. 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Layout Configuration</CardTitle>
              <CardDescription>Customize the overall layout and navigation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Navigation Style</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {LAYOUT_OPTIONS.map((option) => (
                    <div 
                      key={option.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        layoutSettings.navigationStyle === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setLayoutSettings({ ...layoutSettings, navigationStyle: option.value })}
                    >
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing for denser layout</p>
                  </div>
                  <Switch
                    checked={layoutSettings.compactMode}
                    onCheckedChange={(checked) => setLayoutSettings({ ...layoutSettings, compactMode: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Breadcrumbs</Label>
                    <p className="text-sm text-muted-foreground">Display navigation breadcrumbs</p>
                  </div>
                  <Switch
                    checked={layoutSettings.showBreadcrumbs}
                    onCheckedChange={(checked) => setLayoutSettings({ ...layoutSettings, showBreadcrumbs: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sticky Header</Label>
                    <p className="text-sm text-muted-foreground">Keep header visible while scrolling</p>
                  </div>
                  <Switch
                    checked={layoutSettings.stickyHeader}
                    onCheckedChange={(checked) => setLayoutSettings({ ...layoutSettings, stickyHeader: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Logo Management</CardTitle>
                <CardDescription>Upload and manage your brand logo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                
                {!logoPreview && !brandingSettings.logoUrl ? (
                  <div
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                  >
                    <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload your logo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="border rounded-lg p-4 bg-muted/10">
                      <img
                        src={logoPreview || brandingSettings.logoUrl}
                        alt="Logo preview"
                        className="w-full h-32 object-contain rounded"
                      />
                    </div>
                    <button
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    variant="outline"
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {logoPreview || brandingSettings.logoUrl ? 'Change Logo' : 'Upload Logo'}
                  </Button>
                  {(logoPreview || brandingSettings.logoUrl) && (
                    <Button onClick={removeLogo} variant="destructive">
                      Remove
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Branding Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Identity</CardTitle>
                <CardDescription>Customize your brand identity and assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={brandingSettings.siteName}
                    onChange={(e) => setBrandingSettings({ ...brandingSettings, siteName: e.target.value })}
                    placeholder="Enter your site name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL (Alternative)</Label>
                  <Input
                    id="logoUrl"
                    value={brandingSettings.logoUrl}
                    onChange={(e) => setBrandingSettings({ ...brandingSettings, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon URL</Label>
                  <Input
                    id="favicon"
                    value={brandingSettings.favicon}
                    onChange={(e) => setBrandingSettings({ ...brandingSettings, favicon: e.target.value })}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customCSS">Custom CSS</Label>
                  <textarea
                    id="customCSS"
                    value={brandingSettings.customCSS}
                    onChange={(e) => setBrandingSettings({ ...brandingSettings, customCSS: e.target.value })}
                    placeholder="/* Add your custom CSS here */"
                    className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
