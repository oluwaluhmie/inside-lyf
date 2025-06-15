
import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SubmitStoryModal from "./SubmitStoryModal";

const PODCAST_LINK = "https://podcasters.spotify.com/podcast-link";
const YOUTUBE_LINK = "https://www.youtube.com/@comfortcommunity";
const SUBSCRIBE_LINK = "https://www.youtube.com/@comfortcommunity?sub_confirmation=1";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-blue-100/80 via-white/80 to-blue-50/60 border-b border-border shadow-sm sticky top-0 z-30 backdrop-blur">
      <nav className="flex items-center justify-between gap-2 max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">🤗 Comfort Community</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hover-scale px-4" asChild>
            <a href={PODCAST_LINK} target="_blank" rel="noopener">
              <span role="img" aria-label="podcast" className="mr-1">🎙️</span>
              Podcast
            </a>
          </Button>
          <Button variant="ghost" className="hover-scale px-4" asChild>
            <a href={YOUTUBE_LINK} target="_blank" rel="noopener">
              <Youtube className="w-4 h-4 mr-1" />
              YouTube
            </a>
          </Button>
          <Button
            className="bg-primary text-white px-4 hover:scale-105 transition-transform"
            onClick={() => setOpen(true)}
          >
            Share Your Story
          </Button>
          <Button
            variant="outline"
            className="text-primary border-primary px-4 font-semibold hover:scale-105 transition-transform"
            asChild
          >
            <a href={SUBSCRIBE_LINK} target="_blank" rel="noopener">
              Subscribe
            </a>
          </Button>
        </div>
      </nav>
      <SubmitStoryModal open={open} setOpen={setOpen} />
    </header>
  );
}
