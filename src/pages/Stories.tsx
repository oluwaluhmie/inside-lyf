
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturedStories from "../components/FeaturedStories";
import { Button } from "../components/ui/button";
import { Filter, Search } from "lucide-react";

export default function Stories() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Real Life Stories
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover authentic stories of hope, healing, and transformation from our community members.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search stories..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        
        <FeaturedStories />
      </main>
      
      <Footer />
    </div>
  );
}
