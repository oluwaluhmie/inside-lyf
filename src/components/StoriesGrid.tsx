
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
        <div
          key={story.id}
          className="bg-card rounded-2xl shadow-sm border border-muted/50 hover:shadow-lg transition px-6 py-5 flex flex-col"
        >
          <div className="font-semibold text-lg mb-1">{story.title}</div>
          <div className="text-sm text-muted-foreground mb-2">by {story.author}</div>
          <div className="flex-1">{story.excerpt}</div>
        </div>
      ))}
    </div>
  );
}
