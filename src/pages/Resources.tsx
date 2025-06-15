
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { ArrowLeft, Search, BookOpen, Heart, Users, Shield, Baby, Home, Crown, Sparkles, MessageCircle, ExternalLink, Download, Play } from "lucide-react";

const RESOURCE_CATEGORIES = [
  {
    id: "parenting",
    title: "Parenting Resources",
    description: "Tools and guides for navigating parenthood",
    icon: Baby,
    color: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-600",
    resources: [
      {
        title: "The Complete Guide to Gentle Parenting",
        type: "Guide",
        description: "Learn respectful, empathetic approaches to raising children",
        format: "PDF",
        isPremium: false
      },
      {
        title: "Managing Toddler Tantrums",
        type: "Video Series",
        description: "Practical strategies for handling meltdowns with patience",
        format: "Video",
        isPremium: true
      },
      {
        title: "Age-Appropriate Chores Checklist",
        type: "Checklist",
        description: "Build responsibility and independence in children",
        format: "PDF",
        isPremium: false
      }
    ]
  },
  {
    id: "mental-health",
    title: "Mental Health & Wellness",
    description: "Support for emotional and psychological wellbeing",
    icon: Heart,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    resources: [
      {
        title: "Daily Mindfulness Practices",
        type: "Workbook",
        description: "Simple techniques to reduce stress and increase awareness",
        format: "PDF",
        isPremium: false
      },
      {
        title: "Understanding Anxiety and Depression",
        type: "Article Series",
        description: "Comprehensive guide to recognizing and managing symptoms",
        format: "Web",
        isPremium: false
      },
      {
        title: "Therapy Resource Directory",
        type: "Directory",
        description: "Find qualified mental health professionals in your area",
        format: "Web",
        isPremium: true
      }
    ]
  },
  {
    id: "relationships",
    title: "Relationships & Communication",
    description: "Building stronger connections with others",
    icon: Crown,
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
    resources: [
      {
        title: "Healthy Communication Toolkit",
        type: "Toolkit",
        description: "Scripts and techniques for difficult conversations",
        format: "PDF",
        isPremium: false
      },
      {
        title: "Rebuilding Trust After Betrayal",
        type: "Workshop",
        description: "Step-by-step process for healing relationships",
        format: "Video",
        isPremium: true
      },
      {
        title: "Love Languages Assessment",
        type: "Assessment",
        description: "Discover how you and your partner express love",
        format: "Interactive",
        isPremium: false
      }
    ]
  },
  {
    id: "personal-growth",
    title: "Personal Growth & Self-Discovery",
    description: "Tools for understanding and improving yourself",
    icon: Sparkles,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    resources: [
      {
        title: "Values Clarification Exercise",
        type: "Worksheet",
        description: "Identify what truly matters to you",
        format: "PDF",
        isPremium: false
      },
      {
        title: "Breaking Limiting Beliefs",
        type: "Course",
        description: "Transform negative thought patterns",
        format: "Video",
        isPremium: true
      },
      {
        title: "Goal Setting Framework",
        type: "Template",
        description: "Create and achieve meaningful objectives",
        format: "PDF",
        isPremium: false
      }
    ]
  }
];

const FEATURED_RESOURCES = [
  {
    title: "The Vulnerability Practice",
    description: "A 30-day journey to authentic connection",
    author: "Community Team",
    type: "Course",
    isPremium: true,
    thumbnail: "bg-gradient-to-br from-blue-400 to-purple-500"
  },
  {
    title: "Crisis Resource Hotlines",
    description: "24/7 support when you need it most",
    author: "Mental Health Alliance",
    type: "Directory",
    isPremium: false,
    thumbnail: "bg-gradient-to-br from-green-400 to-teal-500"
  },
  {
    title: "Community Guidelines for Healing",
    description: "How to create safe spaces for difficult conversations",
    author: "Trauma-Informed Team",
    type: "Guide",
    isPremium: false,
    thumbnail: "bg-gradient-to-br from-orange-400 to-red-500"
  }
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = RESOURCE_CATEGORIES.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.resources.some(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const selectedCategoryData = selectedCategory 
    ? RESOURCE_CATEGORIES.find(cat => cat.id === selectedCategory)
    : null;

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Resources & Tools
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Curated resources to support your journey of healing, growth, and authentic connection.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {!selectedCategory ? (
          <>
            {/* Featured Resources */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Featured Resources</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {FEATURED_RESOURCES.map((resource, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-32 ${resource.thumbnail}`} />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={resource.isPremium ? "default" : "secondary"}>
                          {resource.isPremium ? "Premium" : "Free"}
                        </Badge>
                        <span className="text-sm text-slate-500">{resource.type}</span>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-3">{resource.description}</p>
                      <p className="text-sm text-slate-500 mb-4">By {resource.author}</p>
                      <Button className="w-full">
                        {resource.isPremium ? "Access with Premium" : "View Resource"}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Resource Categories */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Browse by Category</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {filteredCategories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.id}
                      className={`${category.color} cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-3 rounded-xl bg-white/80 ${category.iconColor}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{category.title}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {category.resources.length} resources
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-slate-700">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {category.resources.slice(0, 2).map((resource, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                              <BookOpen className="w-4 h-4" />
                              <span>{resource.title}</span>
                              {resource.isPremium && (
                                <Badge variant="default" className="text-xs">Premium</Badge>
                              )}
                            </div>
                          ))}
                          {category.resources.length > 2 && (
                            <p className="text-sm text-slate-500">
                              +{category.resources.length - 2} more resources
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          /* Category Detail View */
          <section>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedCategory(null)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>

            {selectedCategoryData && (
              <>
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center gap-3 p-4 rounded-2xl ${selectedCategoryData.color} mb-4`}>
                    <selectedCategoryData.icon className={`w-8 h-8 ${selectedCategoryData.iconColor}`} />
                    <h2 className="text-2xl font-bold">{selectedCategoryData.title}</h2>
                  </div>
                  <p className="text-slate-600">{selectedCategoryData.description}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {selectedCategoryData.resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={resource.isPremium ? "default" : "secondary"}>
                            {resource.isPremium ? "Premium" : "Free"}
                          </Badge>
                          <span className="text-sm text-slate-500">{resource.format}</span>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {resource.type}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 mb-4">{resource.description}</p>
                        <Button className="w-full" variant={resource.isPremium ? "default" : "outline"}>
                          {resource.format === "Video" && <Play className="w-4 h-4 mr-2" />}
                          {resource.format === "PDF" && <Download className="w-4 h-4 mr-2" />}
                          {resource.format === "Web" && <ExternalLink className="w-4 h-4 mr-2" />}
                          {resource.isPremium ? "Access with Premium" : "Get Resource"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
