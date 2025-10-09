import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Heart, MessageCircle, Bookmark, ArrowLeft } from "lucide-react";
import StoriesGrid from "../components/StoriesGrid";

// Mock story data - in real app, fetch based on storyId
const STORY_DATA = {
  id: 1,
  title: "Coping With Change",
  author: "Morgan",
  date: "March 15, 2024",
  coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=400&fit=crop",
  content: `When I lost my job, I felt alone. The world seemed to move forward while I stood still, watching everything I'd worked for slip away. The routine I'd built over years disappeared overnight, leaving a void I didn't know how to fill.

Days turned into weeks, and the initial shock gave way to something deeper. I questioned my worth, my abilities, my future. Every morning felt like climbing a mountain, and every night brought more uncertainty.

Then I found this community. At first, I just read others' stories—people who'd faced similar struggles, people who understood that raw feeling of uncertainty. Their words were like tiny lights in the darkness, showing me I wasn't as alone as I felt.

Slowly, I started sharing my own experience. The responses were overwhelming—not with pity, but with understanding, with kindness, with strength. People I'd never met became pillars of support, reminding me that change, though painful, is also an opportunity.

Today, I'm in a better place. Not because everything is perfect, but because I learned that navigating uncertainty doesn't mean doing it alone. The connections I made here gave me strength when I had none, and reminded me that every ending is also a beginning.`,
  relateCount: 248,
  commentCount: 42,
  category: "Career"
};

export default function Story() {
  const { id } = useParams();
  const [reflection, setReflection] = useState("");
  const [hasRelated, setHasRelated] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const handleRelate = () => {
    setHasRelated(!hasRelated);
  };

  const handleSave = () => {
    setHasSaved(!hasSaved);
  };

  const handleReflectionSubmit = () => {
    console.log("Reflection:", reflection);
    setReflection("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full">
        {/* Cover Image */}
        <div 
          className="w-full h-64 sm:h-80 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${STORY_DATA.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          <div className="absolute top-6 left-4 sm:left-8">
            <Link to="/stories">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Stories
              </Button>
            </Link>
          </div>
        </div>

        {/* Story Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-secondary text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              {STORY_DATA.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6">{STORY_DATA.title}</h1>

          {/* Author Meta */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">
                {STORY_DATA.author[0]}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground">by {STORY_DATA.author}</p>
              <p className="text-sm text-muted-foreground">{STORY_DATA.date}</p>
            </div>
          </div>

          {/* Story Body */}
          <div className="prose prose-lg max-w-none mb-12">
            {STORY_DATA.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-foreground/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Reaction Row */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-border">
            <Button
              variant={hasRelated ? "default" : "outline"}
              size="lg"
              onClick={handleRelate}
              className="gap-2"
            >
              <Heart className={`w-5 h-5 ${hasRelated ? 'fill-current' : ''}`} />
              Relate ({STORY_DATA.relateCount + (hasRelated ? 1 : 0)})
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <MessageCircle className="w-5 h-5" />
              Comment ({STORY_DATA.commentCount})
            </Button>
            <Button
              variant={hasSaved ? "default" : "outline"}
              size="lg"
              onClick={handleSave}
              className="gap-2"
            >
              <Bookmark className={`w-5 h-5 ${hasSaved ? 'fill-current' : ''}`} />
              {hasSaved ? 'Saved' : 'Save'}
            </Button>
          </div>

          {/* AI Reflection Block */}
          <div className="bg-secondary/30 rounded-3xl p-6 sm:p-8 mb-12">
            <h3 className="mb-4 text-primary">What did this story remind you of?</h3>
            <Textarea
              placeholder="Share your thoughts and reflections..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="mb-4 min-h-[120px] bg-card"
            />
            <Button 
              onClick={handleReflectionSubmit}
              disabled={!reflection.trim()}
              className="w-full sm:w-auto"
            >
              Share Reflection
            </Button>
          </div>

          {/* Suggested Stories */}
          <div className="mb-12">
            <h2 className="mb-6">You Might Also Relate To</h2>
            <StoriesGrid />
          </div>

          {/* Comments Section */}
          <div className="border-t border-border pt-8">
            <h2 className="mb-6">Community Reflections ({STORY_DATA.commentCount})</h2>
            
            <div className="bg-card rounded-3xl p-6 mb-6 border border-border">
              <Textarea
                placeholder="What I learned from this story..."
                className="mb-4 min-h-[100px]"
              />
              <Button>Post Comment</Button>
            </div>

            {/* Sample Comments */}
            <div className="space-y-6">
              {[
                { author: "Sarah", text: "Thank you for sharing this. I'm going through something similar right now and your words gave me hope.", time: "2 hours ago" },
                { author: "Alex", text: "This resonates so deeply. The part about finding community really hit home for me.", time: "5 hours ago" },
              ].map((comment, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold">{comment.author[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-foreground">{comment.author}</span>
                        <span className="text-sm text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-foreground/80">{comment.text}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-14">
                    <Heart className="w-4 h-4 mr-1" />
                    12
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
}
