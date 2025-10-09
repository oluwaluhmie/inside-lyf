
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import MobileNav from "../components/MobileNav";
import ThreadView from "../components/community/ThreadView";
import ThreadsList from "../components/community/ThreadsList";
import CommunityThreads from "../components/CommunityThreads";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CommunityDiscussion() {
  const { threadId } = useParams();
  const [selectedThread, setSelectedThread] = useState<string | null>(threadId || null);
  const [activeFilter, setActiveFilter] = useState("latest");

  const filters = [
    { id: "latest", label: "Latest" },
    { id: "most-related", label: "Most Related" },
    { id: "healing", label: "Healing" },
    { id: "career", label: "Career" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="mb-4">Community Discussions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join conversations that matter. Share your experiences and connect with others on similar journeys.
            </p>
          </div>
        </div>

        {selectedThread ? (
          <ThreadView 
            threadId={selectedThread} 
            onBack={() => setSelectedThread(null)} 
          />
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Left: Story Discussions Feed */}
            <div className="space-y-6">
              <ThreadsList onThreadSelect={setSelectedThread} />
            </div>

            {/* Right: Sidebar Widgets */}
            <div className="space-y-6">
              {/* Top Empaths Leaderboard */}
              <div className="bg-card rounded-3xl shadow-md border border-border p-6">
                <h3 className="font-semibold mb-4">Top Empaths</h3>
                <div className="space-y-3">
                  {[
                    { name: "Sarah M.", hearts: 342, rank: 1 },
                    { name: "Alex K.", hearts: 287, rank: 2 },
                    { name: "Jordan P.", hearts: 251, rank: 3 },
                    { name: "Morgan L.", hearts: 203, rank: 4 },
                  ].map((user) => (
                    <div
                      key={user.rank}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.hearts} hearts given
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Reflections */}
              <div className="bg-card rounded-3xl shadow-md border border-border p-6">
                <h3 className="font-semibold mb-4">Today's Reflections</h3>
                <div className="space-y-4">
                  <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-foreground/80">
                    "This community reminded me that vulnerability is strength, not weakness."
                  </blockquote>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-foreground/80">
                    "Every story here shows me I'm not alone in this journey."
                  </blockquote>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-foreground/80">
                    "Sharing my story was the first step to healing I didn't know I needed."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <ScrollToTop />
      <Footer />
      <MobileNav />
    </div>
  );
}
