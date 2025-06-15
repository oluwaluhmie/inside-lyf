
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LogoUpload() {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      
      setLogo(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      
      toast({
        title: "Logo uploaded!",
        description: "Your logo has been uploaded successfully.",
      });
    }
  };

  const removeLogo = () => {
    setLogo(null);
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload Logo</CardTitle>
        <CardDescription>
          Upload your brand logo. Recommended size: 200x200px or larger.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
        
        {!logoPreview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
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
                src={logoPreview}
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
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="flex-1"
          >
            <Upload className="w-4 h-4 mr-2" />
            {logoPreview ? 'Change Logo' : 'Upload Logo'}
          </Button>
          {logoPreview && (
            <Button onClick={removeLogo} variant="destructive">
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
