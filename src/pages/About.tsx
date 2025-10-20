
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
            Insidelyf is more than a platform—it's a movement. We're building a world where sharing your truth 
            creates connection, where vulnerability becomes strength, and where healing happens together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Join Our Community
            </Button>
            <Button size="lg" variant="outline">
              Share Your Story
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
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-xl leading-relaxed mb-6">
                Insidelyf was born from a simple yet powerful realization: <strong>healing happens in community</strong>. 
                Our founder, Sarah Chen, witnessed firsthand how sharing personal struggles in safe, supportive environments 
                could transform pain into purpose, isolation into connection.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                After years of working as a trauma-informed therapist, Sarah noticed that some of the most profound 
                breakthroughs happened not in individual therapy sessions, but in group settings where people shared 
                their stories with others who truly understood.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                In 2022, she decided to create a digital space that could replicate this healing power of community—but 
                on a global scale. Insidelyf launched with a mission to break down the barriers that keep people isolated 
                in their struggles and to prove that no one has to face their challenges alone.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we're proud to be home to thousands of individuals who have found their voice, their community, 
                and their path to healing through the simple act of sharing their truth.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Mission & Values</h2>
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
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Approach</h2>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands who have found healing, connection, and hope through sharing their truth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Join Community
                </Button>
                <Button size="lg" variant="outline" className="border-white text-foreground bg-white hover:bg-white/90 hover:text-primary">
                  Browse Stories
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
