
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThreadView from "../components/community/ThreadView";
import ThreadsList from "../components/community/ThreadsList";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CommunityDiscussion() {
  const { threadId } = useParams();
  const [selectedThread, setSelectedThread] = useState<string | null>(threadId || null);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Community Discussions
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
          <ThreadsList onThreadSelect={setSelectedThread} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
