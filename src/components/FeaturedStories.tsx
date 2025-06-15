
import { Youtube } from "lucide-react";

const FEATURED = [
  {
    id: 1,
    title: "Finding Light in Dark Seasons",
    author: "Anonymous",
    excerpt: "Struggling with anxiety, I found unexpected comfort from this community and professional therapy. Sharing saved me.",
    youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ", // replace with real video
  },
  {
    id: 2,
    title: "New Beginnings After Loss",
    author: "Jamie, 34",
    excerpt: "After personal loss, sharing my story helped me find hope and support from people who really care.",
    youtubeEmbed: null,
  },
  {
    id: 3,
    title: "Therapist Q&A: Overcoming Self-Doubt",
    author: "Dr. Smith (Therapist)",
    excerpt: "Feeling stuck? Watch our recent one-on-one chat about overcoming tough days and self-doubt.",
    youtubeEmbed: "https://www.youtube.com/embed/5qap5aO4i9A"
  }
];

export default function FeaturedStories() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {FEATURED.map((story, i) => (
        <div
          key={story.id}
          className="bg-white shadow-md rounded-xl px-5 py-5 transition hover:shadow-xl border border-border"
        >
          <div className="flex items-center gap-2 mb-1 text-sm text-muted-foreground font-medium">
            <span>Featured Story</span>
            {story.youtubeEmbed && (
              <span className="ml-2 inline-flex items-center gap-1 text-primary">
                <Youtube className="w-4 h-4" /> Video
              </span>
            )}
          </div>
          <div className="font-semibold text-lg mb-1">{story.title}</div>
          <div className="text-sm text-muted-foreground mb-2">by {story.author}</div>
          <div className="mb-2">{story.excerpt}</div>
          {story.youtubeEmbed && (
            <div className="rounded-lg overflow-hidden aspect-video mt-2 border">
              <iframe
                src={story.youtubeEmbed}
                title={story.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
