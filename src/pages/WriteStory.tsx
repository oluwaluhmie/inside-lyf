import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import MobileNav from "../components/MobileNav";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { ArrowLeft, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TONE_OPTIONS = [
  { value: "happy", label: "Happy", emoji: "😊" },
  { value: "sad", label: "Sad", emoji: "😔" },
  { value: "motivational", label: "Motivational", emoji: "💪" },
  { value: "reflective", label: "Reflective", emoji: "🤔" },
];

export default function WriteStory() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedTone, setSelectedTone] = useState<string>("reflective");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (uploadedFiles.length + files.length > 3) {
      toast({
        title: "Too many files",
        description: "You can upload up to 3 files per story.",
        variant: "destructive",
      });
      return;
    }
    
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please add a title and content for your story.",
        variant: "destructive",
      });
      return;
    }

    // Here you would submit to backend
    console.log({
      title,
      content,
      isAnonymous,
      tone: selectedTone,
      files: uploadedFiles,
    });

    toast({
      title: "Story Published!",
      description: "Your story has been shared with the community.",
    });

    navigate("/stories");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link to="/stories">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stories
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Editor */}
          <div className="bg-card rounded-3xl shadow-lg border border-border p-6 sm:p-8">
            <h1 className="mb-6">Share Your Story</h1>
            <p className="text-muted-foreground mb-8">
              Your words have power. Share your journey and inspire others.
            </p>

            {/* Title Input */}
            <div className="mb-6">
              <Label htmlFor="title" className="text-base mb-2 block">
                Story Title
              </Label>
              <Input
                id="title"
                placeholder="Give your story a meaningful title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-serif h-14"
              />
            </div>


            {/* Content Textarea */}
            <div className="mb-6">
              <Label htmlFor="content" className="text-base mb-2 block">
                Your Story
              </Label>
              <Textarea
                id="content"
                placeholder="Start writing your story here... Share your experiences, emotions, and lessons learned."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px] text-lg leading-relaxed resize-none"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {content.length} characters
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Tone Selector */}
            <div className="bg-card rounded-3xl shadow-md border border-border p-6">
              <h3 className="text-lg font-medium mb-4">Story Tone</h3>
              <div className="grid grid-cols-2 gap-3">
                {TONE_OPTIONS.map((tone) => (
                  <Button
                    key={tone.value}
                    variant={selectedTone === tone.value ? "default" : "outline"}
                    onClick={() => setSelectedTone(tone.value)}
                    className="h-auto py-3 flex flex-col items-center gap-1"
                  >
                    <span className="text-2xl">{tone.emoji}</span>
                    <span className="text-sm">{tone.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="bg-card rounded-3xl shadow-md border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">Stay Anonymous</h3>
                  <p className="text-sm text-muted-foreground">
                    Your identity will be hidden
                  </p>
                </div>
                <Switch
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-card rounded-3xl shadow-md border border-border p-6">
              <h3 className="text-lg font-medium mb-4">Add Media</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload images, audio, or video (up to 3 files)
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,audio/*,video/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadedFiles.length >= 3}
                className="w-full mb-4"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-secondary/30 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <ImageIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="flex-shrink-0 text-destructive hover:bg-destructive/10 rounded p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Publish Button */}
            <div className="bg-primary text-primary-foreground rounded-3xl shadow-md p-6 text-center">
              <Button
                onClick={handlePublish}
                size="lg"
                className="w-full bg-card text-primary hover:bg-card/90 mb-3"
              >
                Publish My Story
              </Button>
              <p className="text-sm opacity-90">
                You're about to touch someone's life.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <ScrollToTop />
      <Footer />
      <MobileNav />
    </div>
  );
}
