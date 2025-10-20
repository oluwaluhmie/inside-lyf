
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();

      // Insert newsletter subscription
      const { data, error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email.trim().toLowerCase(),
            user_id: user?.id || null,
          }
        ])
        .select('unsubscribe_token')
        .single();

      if (insertError) {
        // Check if it's a duplicate email error
        if (insertError.code === '23505') {
          setError("You're already subscribed!");
          toast({
            title: "Already Subscribed",
            description: "This email is already on our newsletter list.",
            variant: "default",
          });
          return;
        }
        throw insertError;
      }

      // Send confirmation email
      if (data?.unsubscribe_token) {
        const { error: emailError } = await supabase.functions.invoke(
          'send-newsletter-confirmation',
          {
            body: {
              email: email.trim().toLowerCase(),
              unsubscribeToken: data.unsubscribe_token,
            },
          }
        );

        if (emailError) {
          console.error("Error sending confirmation email:", emailError);
          // Don't fail the subscription if email fails
        }
      }

      setIsSubscribed(true);
      setEmail("");
      toast({
        title: "Successfully Subscribed! 🎉",
        description: "Check your email for a confirmation message.",
      });

      // Reset after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);

    } catch (err: any) {
      console.error("Newsletter subscription error:", err);
      setError(err.message || "Failed to subscribe. Please try again.");
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
        <div className="flex items-center gap-2 text-green-600 font-medium animate-fade-in">
          <Check className="w-5 h-5" />
          Thanks for subscribing! Check your email.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              className="flex-1 bg-white"
              required
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="bg-primary text-white hover:bg-primary/90"
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
