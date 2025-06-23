
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Phone, MessageCircle, AlertTriangle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Safety = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Safety Resources</h1>
          <p className="text-lg text-gray-600 mb-8">Your safety and wellbeing are our top priority. Here are resources for immediate help and ongoing support.</p>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-red-800">Crisis Resources - Get Help Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Emergency Services</h3>
                <p className="text-2xl font-bold text-red-600">911</p>
                <p className="text-sm text-gray-600">For immediate danger or medical emergency</p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Suicide Prevention Lifeline</h3>
                <p className="text-2xl font-bold text-red-600">988</p>
                <p className="text-sm text-gray-600">24/7 crisis support and suicide prevention</p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Crisis Text Line</h3>
                <p className="text-xl font-bold text-red-600">Text HOME to 741741</p>
                <p className="text-sm text-gray-600">24/7 crisis support via text</p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">SAMHSA Helpline</h3>
                <p className="text-xl font-bold text-red-600">1-800-662-HELP</p>
                <p className="text-sm text-gray-600">Mental health and substance abuse support</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <Phone className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">National Hotlines</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>NAMI Helpline:</strong> 1-800-950-6264</li>
                <li><strong>LGBT National Hotline:</strong> 1-888-843-4564</li>
                <li><strong>Veterans Crisis Line:</strong> 1-800-273-8255</li>
                <li><strong>Domestic Violence Hotline:</strong> 1-800-799-7233</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <MessageCircle className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Online Support</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Crisis Chat:</strong> suicidepreventionlifeline.org</li>
                <li><strong>7 Cups:</strong> Free emotional support</li>
                <li><strong>BetterHelp:</strong> Professional counseling</li>
                <li><strong>NAMI Online Groups:</strong> Peer support groups</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <Heart className="w-8 h-8 text-purple-600 mb-3" />
            <h2 className="text-xl font-semibold mb-4">Staying Safe in Our Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Safety Tips:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Share only what feels comfortable</li>
                  <li>• Use our anonymous posting options</li>
                  <li>• Set boundaries in conversations</li>
                  <li>• Take breaks when needed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Red Flags to Report:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Requests for personal information</li>
                  <li>• Harassment or bullying</li>
                  <li>• Inappropriate content</li>
                  <li>• Anyone offering medical advice</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Self-Care Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Mindfulness Apps</h4>
                <p className="text-sm text-gray-600">Headspace, Calm, Insight Timer</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Breathing Exercises</h4>
                <p className="text-sm text-gray-600">4-7-8 breathing, box breathing</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Grounding Techniques</h4>
                <p className="text-sm text-gray-600">5-4-3-2-1 method, progressive muscle relaxation</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button size="lg" className="mr-4">
              Report a Safety Concern
            </Button>
            <Button variant="outline" size="lg">
              Contact Our Support Team
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Safety;
