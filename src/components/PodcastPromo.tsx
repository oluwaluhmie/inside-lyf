
import { Button } from "@/components/ui/button";

const PODCAST_LINK = "https://podcasters.spotify.com/podcast-link";

export default function PodcastPromo() {
  return (
    <div className="bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center gap-6 px-5 py-4 mb-4 shadow hover:shadow-md transition animate-fade-in w-full">
      <div className="flex-shrink-0 text-2xl">🎙️</div>
      <div className="flex-1">
        <div className="font-semibold text-primary mb-1">Listen to Our Podcast</div>
        <div className="text-sm text-muted-foreground">
          Weekly episodes featuring real stories and expert advice to support your mental wellness journey.
        </div>
      </div>
      <div>
        <Button variant="outline" className="rounded-full bg-primary text-white px-6 py-2 shadow hover:scale-105 transition-transform" asChild>
          <a href={PODCAST_LINK} target="_blank" rel="noopener">
            Listen Now
          </a>
        </Button>
      </div>
    </div>
  );
}
