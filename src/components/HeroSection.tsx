
import { Button } from "./ui/button";
import { ArrowRight, Heart, Users, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SubmitStoryModal from "./SubmitStoryModal";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-3xl mb-12">
      {/* Background with warm overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/30 to-background bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
          filter: 'blur(8px)',
        }}
      ></div>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      
      <div className="relative px-6 py-16 lg:py-24 text-center max-w-4xl mx-auto animate-fade-in">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
          Real Stories. Real People. Real Growth.
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
          Because every experience — joy, pain, or triumph — deserves to be heard.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/stories">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Read Stories
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary text-primary px-10 py-6 text-lg font-semibold rounded-full hover:scale-105 transition-all bg-card/50 hover:bg-secondary"
            onClick={() => setOpen(true)}
          >
            Share Yours
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            <span>Trusted by thousands</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>40K+ community members</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>100% anonymous option</span>
          </div>
        </div>
      </div>
      
      <SubmitStoryModal open={open} setOpen={setOpen} />
    </section>
  );
}
