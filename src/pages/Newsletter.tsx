import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Mail, CheckCircle, Users, BookOpen, Heart, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NEWSLETTER_BENEFITS = [
  {
    icon: Heart,
    title: "Weekly Stories",
    description: "Get the most inspiring and transformative stories delivered to your inbox every week."
  },
  {
    icon: Users,
    title: "Community Highlights",
    description: "Stay updated on community discussions, events, and member spotlights."
  },
  {
    icon: BookOpen,
    title: "Exclusive Resources",
    description: "Access subscriber-only content, guides, and tools for personal growth."
  },
  {
    icon: Sparkles,
    title: "Early Access",
    description: "Be the first to know about new features, workshops, and special announcements."
  }
];

export default function Newsletter() {
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
          setIsLoading(false);
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
      toast({
        title: "Successfully Subscribed! 🎉",
        description: "Check your email for a confirmation message.",
      });

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

  if (isSubscribed) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
        <Header />
        
        <main className="flex-1 flex items-center justify-center max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
          <Card className="w-full max-w-2xl text-center border-none bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="py-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4 text-slate-800">Welcome to the Family!</h1>
              <p className="text-lg text-slate-600 mb-8">
                Thank you for subscribing to our newsletter. You'll receive your first email soon with exclusive stories and community updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/community">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Explore Community
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Stay Connected
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Join our community newsletter and be part of a movement that celebrates authentic stories, 
            genuine connections, and the power of shared experiences.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Newsletter Form */}
          <Card className="border-none bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Subscribe to Our Newsletter</CardTitle>
              <CardDescription className="text-base">
                Get weekly updates delivered directly to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    required
                    className="bg-white"
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
                </Button>
              </form>

              <p className="text-sm text-slate-500 mt-4 text-center">
                By subscribing, you agree to receive our weekly newsletter. You can unsubscribe at any time.
              </p>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">What You'll Get</h2>
            
            {NEWSLETTER_BENEFITS.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="border-none bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-blue-100 flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                        <p className="text-slate-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Community Stats */}
        <section className="mt-16 text-center">
          <Card className="border-none bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Join 25,000+ Subscribers</h2>
              <p className="text-xl mb-8 text-blue-100">
                Be part of our growing community of storytellers and changemakers
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div>
                  <div className="text-3xl font-bold mb-2">25K+</div>
                  <div className="text-blue-100">Newsletter Subscribers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">50K+</div>
                  <div className="text-blue-100">Stories Shared</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">98%</div>
                  <div className="text-blue-100">Satisfaction Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
