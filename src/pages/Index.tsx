
import Header from "../components/Header";
import StoriesGrid from "../components/StoriesGrid";
import PodcastPromo from "../components/PodcastPromo";
import CommunityThreads from "../components/CommunityThreads";
import NewsletterSignup from "../components/NewsletterSignup";
import PremiumSection from "../components/PremiumSection";
import HeroSection from "../components/HeroSection";
import StatsCounter from "../components/StatsCounter";
import TestimonialCarousel from "../components/TestimonialCarousel";
import UrgencyBanner from "../components/UrgencyBanner";
import Footer from "../components/Footer";
import FeaturedStoryWeek from "../components/FeaturedStoryWeek";
import PremiumVideos from "../components/PremiumVideos";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <UrgencyBanner />
      <Header />
      <main className="flex flex-col gap-8 sm:gap-12 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <HeroSection />
        
        <StatsCounter />
        
        <FeaturedStoryWeek />
        
        <PremiumVideos />
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 space-y-6 lg:space-y-8">
            <PodcastPromo />
            <NewsletterSignup />
            <TestimonialCarousel />
          </div>
          <div className="flex-1 lg:max-w-lg">
            <PremiumSection />
          </div>
        </div>
        
        <section>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Join Your Tribe
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Find your people in specialized communities where vulnerability is celebrated and healing happens together.
            </p>
          </div>
          <CommunityThreads />
        </section>
        
        <section>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Stories That Changed Lives</h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">Real experiences from people who found their voice and their community here.</p>
          </div>
          <StoriesGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
