
import { Button } from "./ui/button";
import { ArrowRight, Heart, Users, Shield } from "lucide-react";
import { useState } from "react";
import SubmitStoryModal from "./SubmitStoryModal";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 via-blue-50/30 to-purple-50/50 rounded-3xl -rotate-1 scale-105"></div>
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-2xl p-8 lg:p-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Attention-grabbing headline */}
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
              🔥 Over 50,000 stories shared this month
            </span>
            <h1 className="text-4xl lg:text-6xl font-black mb-4 leading-tight">
              Your Story
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"> Matters</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-6 leading-relaxed">
              You're not alone in your struggles. Join thousands who found healing, hope, and their tribe by sharing their truth.
            </p>
          </div>

          {/* Social proof elements */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <Heart className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-700">98% feel better after sharing</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-700">40K+ active members</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-purple-700">100% anonymous option</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 text-lg font-bold rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              onClick={() => setOpen(true)}
            >
              Share Your Story Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-green-600 text-green-600 px-8 py-4 text-lg font-semibold rounded-full hover:scale-105 transition-all bg-white/50 hover:bg-green-50"
            >
              Browse Stories First
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">✨ Featured in Mental Health Today • Recommended by 500+ Therapists</p>
            <p>🔒 Your privacy is our priority • Share anonymously or with your name</p>
          </div>
        </div>
      </div>
      
      <SubmitStoryModal open={open} setOpen={setOpen} />
    </section>
  );
}
