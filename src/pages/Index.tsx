
import Header from "../components/Header";
import FeaturedStories from "../components/FeaturedStories";
import StoriesGrid from "../components/StoriesGrid";
import PodcastPromo from "../components/PodcastPromo";
import CommunityThreads from "../components/CommunityThreads";
import NewsletterSignup from "../components/NewsletterSignup";
import PremiumSection from "../components/PremiumSection";
import HeroSection from "../components/HeroSection";
import StatsCounter from "../components/StatsCounter";
import TestimonialCarousel from "../components/TestimonialCarousel";
import UrgencyBanner from "../components/UrgencyBanner";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20">
      <UrgencyBanner />
      <Header />
      <main className="flex flex-col gap-12 max-w-6xl w-full mx-auto px-6 py-8">
        <HeroSection />
        
        <StatsCounter />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <PodcastPromo />
            <NewsletterSignup />
            <TestimonialCarousel />
          </div>
          <div className="flex-1 lg:max-w-lg">
            <FeaturedStories />
          </div>
        </div>
        
        <PremiumSection />
        
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join Your Tribe
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your people in specialized communities where vulnerability is celebrated and healing happens together.
            </p>
          </div>
          <CommunityThreads />
        </section>
        
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Stories That Changed Lives</h2>
            <p className="text-lg text-muted-foreground">Real experiences from people who found their voice and their community here.</p>
          </div>
          <StoriesGrid />
        </section>
      </main>
    </div>
  );
};

export default Index;
