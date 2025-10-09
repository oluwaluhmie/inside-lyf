import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const STORIES = [
  {
    id: 1,
    title: "Coping With Change",
    author: "Morgan",
    excerpt: "When I lost my job, I felt alone. Here, I discovered others navigating similar uncertainty, which gave me strength.",
  },
  {
    id: 2,
    title: "Teen Anxiety Journey",
    author: "Chris, 17",
    excerpt: "School was overwhelming until I started sharing. The support helped me gain confidence.",
  },
  {
    id: 3,
    title: "Single Parent, Not Alone",
    author: "Pat",
    excerpt: "Parenting solo is tough, but connecting here made it feel a little lighter.",
  },
  {
    id: 4,
    title: "Healing After Burnout",
    author: "Sam",
    excerpt: "Burnout nearly broke me, but the honest conversations and virtual hugs here kept me going.",
  },
  {
    id: 5,
    title: "Grief and Hope",
    author: "Elena",
    excerpt: "Losing my brother was devastating. Storytelling on this platform helped me take the first small steps forward.",
  },
  {
    id: 6,
    title: "College Pressures",
    author: "Alex, 20",
    excerpt: "College demands are high, but this space let me be vulnerable without judgment. Therapy sessions also helped.",
  },
];

export default function StoriesGrid() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
      {STORIES.map(story => (
        <Link
          key={story.id}
          to={`/story/${story.id}`}
          className="group bg-card rounded-3xl shadow-md border border-border hover:shadow-xl transition-all duration-300 px-6 py-6 flex flex-col hover:-translate-y-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block bg-secondary text-primary px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
            <Heart className="w-4 h-4 text-primary ml-auto" />
          </div>
          <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{story.title}</h3>
          <div className="text-sm text-muted-foreground mb-3">by {story.author}</div>
          <p className="flex-1 text-foreground/80 line-clamp-3">{story.excerpt}</p>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Heart className="w-3 h-3" />
              248 relate
            </span>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-secondary">
              Read more
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
}
