
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import MobileNav from "../components/MobileNav";
import FeaturedStories from "../components/FeaturedStories";
import { Button } from "../components/ui/button";
import { Filter, Search } from "lucide-react";

export default function Stories() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl">
            Real Life Stories
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover authentic stories of hope, healing, and transformation from our community members.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search stories..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-card"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        
        <FeaturedStories />
      </main>
      
      <ScrollToTop />
      <Footer />
      <MobileNav />
    </div>
  );
}
