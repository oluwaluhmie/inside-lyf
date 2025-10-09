import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DAILY_PROMPTS = [
  "What moment made you grateful this week?",
  "Who would you thank if they could read this?",
  "What challenge helped you grow today?",
  "When did you feel most alive recently?",
  "What kindness did you witness or receive?",
];

export default function DailyReflection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reflection, setReflection] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Random prompt for today
  const todayPrompt = DAILY_PROMPTS[Math.floor(Math.random() * DAILY_PROMPTS.length)];

  const handleSubmit = () => {
    if (!reflection.trim()) {
      toast({
        title: "Empty reflection",
        description: "Please share your thoughts before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Trigger confetti animation
    setShowConfetti(true);

    // Show success toast with quote
    setTimeout(() => {
      toast({
        title: "Reflection saved!",
        description: "Growth begins with one honest reflection.",
      });
      
      // Navigate to profile after a delay
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 via-secondary/20 to-background relative overflow-hidden">
      {/* Sunrise Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/5 to-secondary/10 animate-pulse" style={{ animationDuration: '4s' }}></div>
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-fade-out"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fade-out 1.2s ease-out`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#E8A317', '#FFDCDC', '#FFF9F6'][Math.floor(Math.random() * 3)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 relative z-10">
        <div className="max-w-2xl w-full">
          <Link to="/profile" className="inline-block mb-6">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </Link>

          <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-border p-8 sm:p-12 animate-fade-in">
            {/* Icon and Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-lg animate-pulse">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="mb-3">Daily Reflection</h1>
              <p className="text-lg text-muted-foreground">
                Take a moment to reflect on your journey
              </p>
            </div>

            {/* Daily Prompt */}
            <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl p-6 mb-8 border-l-4 border-primary">
              <h2 className="text-2xl font-serif mb-2">Today's Prompt</h2>
              <p className="text-xl text-foreground/90 italic">
                {todayPrompt}
              </p>
            </div>

            {/* Reflection Input */}
            <div className="mb-8">
              <Textarea
                placeholder="Start writing your reflection... Let your thoughts flow freely. There's no right or wrong answer, just your honest feelings."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="min-h-[250px] text-lg leading-relaxed resize-none bg-background/50"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {reflection.length} characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                size="lg"
                className="px-12 py-6 text-lg rounded-full hover:scale-105 transition-all shadow-lg"
              >
                Save Reflection
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Your reflections are private and help track your growth journey
              </p>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="text-center mt-8 animate-fade-in">
            <blockquote className="text-lg text-foreground/70 italic">
              "The unexamined life is not worth living."
              <footer className="text-sm text-muted-foreground mt-2">— Socrates</footer>
            </blockquote>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
