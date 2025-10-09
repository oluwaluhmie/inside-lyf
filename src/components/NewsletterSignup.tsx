
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would integrate with your newsletter service
      console.log("Newsletter signup:", email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 mb-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-primary">Stay Connected</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Get weekly updates, exclusive stories, and community highlights delivered to your inbox.
      </p>
      
      {isSubscribed ? (
        <div className="flex items-center gap-2 text-green-600 font-medium">
          <Check className="w-5 h-5" />
          Thanks for subscribing! Check your email.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white"
            required
          />
          <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}
