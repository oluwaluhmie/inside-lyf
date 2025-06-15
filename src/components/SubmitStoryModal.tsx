
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Upload, X, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SubmitStoryModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: "Please upload only image files.",
        variant: "destructive",
      });
    }
    
    if (uploadedImages.length + imageFiles.length > 3) {
      toast({
        title: "Too many images",
        description: "You can upload up to 3 images per story.",
        variant: "destructive",
      });
      return;
    }
    
    setUploadedImages(prev => [...prev, ...imageFiles]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Here you would normally upload the images and story to your backend
    console.log('Submitting story:', { name, story, images: uploadedImages });
    
    toast({
      title: "Story Submitted!",
      description: "Thank you for sharing your story. It will be reviewed before publishing.",
    });
    
    // Reset form
    setName("");
    setStory("");
    setUploadedImages([]);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full animate-fade-in border">
        <DialogHeader>
          <DialogTitle>Share Your Story</DialogTitle>
          <DialogDescription>
            Your words could comfort someone else. You can share anonymously or with a name.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Your name (optional or Anonymous)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={48}
          />
          <textarea
            placeholder="Your story..."
            className="border rounded-lg px-3 py-2 min-h-[100px] text-base"
            required
            value={story}
            onChange={(e) => setStory(e.target.value)}
            maxLength={600}
          />
          
          {/* Image Upload Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Add Images (optional)</label>
              <span className="text-xs text-muted-foreground">{uploadedImages.length}/3</span>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadedImages.length >= 3}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Images
            </Button>
            
            {/* Preview uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="submit" className="bg-primary text-white px-6 rounded-full">
              Submit
            </Button>
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
