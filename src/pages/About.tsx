
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Heart, Users, Shield, Sparkles, Target, MessageCircle, BookOpen } from "lucide-react";

const MISSION_POINTS = [
  {
    icon: Heart,
    title: "Authentic Connection",
    description: "We believe healing happens through genuine human connection and shared experiences."
  },
  {
    icon: Shield,
    title: "Safe Space",
    description: "Creating judgment-free environments where vulnerability is welcomed and protected."
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Building supportive communities where every story matters and every voice is heard."
  },
  {
    icon: Sparkles,
    title: "Personal Growth",
    description: "Empowering individuals to transform their experiences into sources of strength and wisdom."
  }
];

const STATS = [
  { number: "50K+", label: "Stories Shared" },
  { number: "25K+", label: "Community Members" },
  { number: "150+", label: "Support Groups" },
  { number: "98%", label: "Feel More Connected" }
];

export default function About() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Your Story Matters
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            InsideLyf is more than a platform - it&apos;s a movement. We&apos;re building a world where sharing your truth 
            creates connection, where vulnerability becomes strength and where healing happens together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground border border-primary hover:bg-white hover:text-primary w-full sm:w-auto"
              onClick={() => window.open("https://chat.whatsapp.com/CnlYJJKiMUM8yCxj7vTAo1?mode=wwt", "_blank")}
            >
              Join Our Community
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link to="/write">Share Your Story</Link>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <Card key={index} className="text-center border-none bg-card">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-xl leading-relaxed mb-6">
                <strong>INSIDELYF</strong> was born from a simple truth - <strong>we rise stronger when we rise together.</strong>
              </p>
              <p className="text-lg leading-relaxed mb-6">
                It started with honest conversations. Real people sharing real stories - about growth, loss, hustle, love and everything in between. Those moments showed us something powerful: when people open up, others lean in. And that connection changes everything.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                What began as a few voices soon became a movement. A safe space where people show up for one another, listen without judgment and remind each other that no one&apos;s journey is meant to be walked alone.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                <strong>INSIDELYF</strong> is more than a platform - it&apos;s a community built on shared experiences, trust and strength. Every story adds another brick to what we call <strong>The Sentry</strong>: a living reminder that vulnerability isn&apos;t weakness, it&apos;s how we build unshakable bonds.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we stand as a growing family - thousands strong - proving every day that together, we can turn challenges into lessons and moments into meaning.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-foreground">Our Mission & Values</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {MISSION_POINTS.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <Card key={index} className="border-none bg-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{point.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{point.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">Our Approach</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center border-none bg-card">
                <CardHeader>
                  <Target className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <CardTitle className="text-lg">Trauma-Informed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Every feature and interaction is designed with trauma-informed principles at its core.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-none bg-card">
                <CardHeader>
                  <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Peer Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">We facilitate meaningful connections between people with shared experiences.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-none bg-card">
                <CardHeader>
                  <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Evidence-Based</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our resources and guidance are rooted in proven therapeutic practices and research.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-none bg-gradient-to-r from-primary to-secondary text-white">
            <CardContent className="py-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
              <p className="text-lg sm:text-xl mb-8 text-white/90">
                Join thousands who have found healing, connection, and hope through sharing their truth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-600 text-amber-500 hover:bg-gray-800 hover:text-amber-400 w-full sm:w-auto"
                  onClick={() => window.open("https://chat.whatsapp.com/CnlYJJKiMUM8yCxj7vTAo1?mode=wwt", "_blank")}
                >
                  Join Community
                </Button>
                <Button size="lg" variant="outline" className="border-white text-foreground bg-white hover:bg-gray-800 hover:text-white w-full sm:w-auto" asChild>
                  <Link to="/stories">Browse Stories</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
