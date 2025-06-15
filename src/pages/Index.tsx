
import Header from "../components/Header";
import FeaturedStories from "../components/FeaturedStories";
import StoriesGrid from "../components/StoriesGrid";
import PodcastPromo from "../components/PodcastPromo";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Header />
      <main className="flex flex-col gap-8 max-w-6xl w-full mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-2 text-primary animate-fade-in">
              Comfort Community
            </h1>
            <p className="text-lg text-muted-foreground mb-4 max-w-xl animate-fade-in">
              A safe, welcoming space to share life’s challenges, seek support, and comfort one another. Peer support, therapy resources, and inspiration through real stories.
            </p>
            <PodcastPromo />
          </div>
          <div className="flex-1 lg:max-w-lg">
            <FeaturedStories />
          </div>
        </div>
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-primary/90">Community Stories</h2>
          <StoriesGrid />
        </section>
      </main>
    </div>
  );
};

export default Index;
