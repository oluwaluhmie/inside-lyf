
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Users, Shield, Heart, CheckCircle, Mail, Lock, User } from "lucide-react";
import { useState } from "react";

const COMMUNITY_BENEFITS = [
  {
    icon: Users,
    title: "Connect with Others",
    description: "Find people who understand your journey and share similar experiences."
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Share your story in a judgment-free, supportive community space."
  },
  {
    icon: Heart,
    title: "Healing Together",
    description: "Experience the power of community support in your healing journey."
  }
];

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Community signup:", formData);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
        <Header />
        
        <main className="flex-1 flex items-center justify-center max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
          <Card className="w-full max-w-2xl text-center border-none bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="py-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4 text-slate-800">Welcome to Insidelyf!</h1>
              <p className="text-lg text-slate-600 mb-8">
                Your account has been created successfully. Check your email for a verification link to complete your registration.
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
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-6">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Join Our Community
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Become part of a supportive community where your story matters, your voice is heard, 
            and healing happens together.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Signup Form */}
          <Card className="border-none bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <CardDescription className="text-base">
                Start your journey with our community today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="bg-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="bg-white pl-10"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Join Community"}
                </Button>
              </form>

              <p className="text-sm text-slate-500 mt-4 text-center">
                By joining, you agree to our Terms of Service and Privacy Policy.
              </p>

              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Already have an account?{" "}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in here
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Community Benefits */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Why Join Our Community?</h2>
            
            {COMMUNITY_BENEFITS.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="border-none bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-purple-100 flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-purple-600" />
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

            {/* Community Stats */}
            <Card className="border-none bg-gradient-to-r from-purple-600 to-blue-600 text-white mt-8">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Join 25,000+ Members</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">150+</div>
                    <div className="text-purple-100 text-sm">Support Groups</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-purple-100 text-sm">Feel More Connected</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
