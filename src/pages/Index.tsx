
import Header from "../components/Header";
import StoriesGrid from "../components/StoriesGrid";
import PodcastPromo from "../components/PodcastPromo";
import CommunityThreads from "../components/CommunityThreads";
import NewsletterSignup from "../components/NewsletterSignup";
import HeroSection from "../components/HeroSection";
import StatsCounter from "../components/StatsCounter";
import TestimonialCarousel from "../components/TestimonialCarousel";
import UrgencyBanner from "../components/UrgencyBanner";
import Footer from "../components/Footer";
import FeaturedStoryWeek from "../components/FeaturedStoryWeek";
import MobileNav from "../components/MobileNav";
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex flex-col gap-12 sm:gap-16 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Trending Stories Section */}
        <section className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Stories That Changed Lives
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from people who found their voice and their community here.
            </p>
          </div>
          <StoriesGrid />
        </section>
        
        {/* Category Carousel - Featured Story of the Week */}
        <FeaturedStoryWeek />
        
        {/* Quote Banner */}
        <div className="bg-primary text-primary-foreground rounded-3xl py-12 px-6 text-center shadow-lg">
          <p className="text-2xl sm:text-3xl font-semibold italic max-w-3xl mx-auto">
            "Someone, somewhere, is waiting for your story."
          </p>
        </div>
        
        {/* Community Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Join Your Tribe
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Find your people in specialized communities where vulnerability is celebrated and healing happens together.
            </p>
            <Button 
              onClick={() => window.open("https://chat.whatsapp.com/CnlYJJKiMUM8yCxj7vTAo1?mode=wwt", "_blank")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <MessageCircle className="h-5 w-5" />
              Join InsideLyf WhatsApp Community
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <CommunityThreads />
        </section>
        
        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <PodcastPromo />
          <NewsletterSignup />
        </div>
        
        <TestimonialCarousel />
        
        <StatsCounter />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Index;
