
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Search, MessageCircle, Book, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Help Center</h1>
          <p className="text-lg text-gray-600">Find answers to common questions and get the support you need</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Search FAQs</h3>
            <p className="text-gray-600 text-sm">Find quick answers to common questions</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
            <p className="text-gray-600 text-sm">Get personalized help from our team</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Book className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-lg font-semibold mb-2">User Guides</h3>
            <p className="text-gray-600 text-sm">Learn how to use all features</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-pink-600" />
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="text-gray-600 text-sm">Connect with other users</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">How do I share my story?</h3>
                <p className="text-gray-600">Click on "Share Your Story" button on the homepage or navigate to the stories section. You can share anonymously or with your profile.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Is my information safe?</h3>
                <p className="text-gray-600">Yes, we use end-to-end encryption and follow strict privacy protocols. You can share as much or as little as you're comfortable with.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">How do I join a community circle?</h3>
                <p className="text-gray-600">Browse available circles on the community page and click "Join" on ones that resonate with you. Some circles may require approval.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">What if I need immediate help?</h3>
                <p className="text-gray-600">If you're in crisis, please contact emergency services (911) or the National Suicide Prevention Lifeline (988) immediately.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Getting Started</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold">Create Your Account</h4>
                  <p className="text-gray-600 text-sm">Sign up with your email or social media account</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold">Complete Your Profile</h4>
                  <p className="text-gray-600 text-sm">Add information you're comfortable sharing</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold">Explore Communities</h4>
                  <p className="text-gray-600 text-sm">Find your tribe in specialized support groups</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h4 className="font-semibold">Share Your Story</h4>
                  <p className="text-gray-600 text-sm">When you're ready, share your experience to help others</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="w-full">
                Contact Support Team
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
