import Header from "../components/Header";
import Footer from "../components/Footer";
import { AlertTriangle, Shield, Heart, Phone, MessageCircle, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Safety = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Safety Resources</h1>
          <p className="text-lg text-gray-600">Your safety and well-being are our top priorities</p>
        </div>

        {/* Emergency Numbers Section */}
        <div className="mb-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-8 text-white">
          <div className="flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-bold">Emergency Numbers - Need Immediate Help?</h2>
          </div>
          <p className="mb-8 text-center text-lg">If you're in immediate danger or experiencing a mental health crisis, please contact emergency services right away:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-3">North America</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">USA/Canada Emergency:</span> 911</p>
                <p><span className="font-semibold">Suicide Prevention:</span> 988</p>
                <p><span className="font-semibold">Crisis Text:</span> 741741</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-3">Europe</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">EU Emergency:</span> 112</p>
                <p><span className="font-semibold">UK Emergency:</span> 999</p>
                <p><span className="font-semibold">Samaritans (UK):</span> 116 123</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-3">Asia</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Japan:</span> 110 (Police), 119 (Ambulance)</p>
                <p><span className="font-semibold">India:</span> 112 (Emergency)</p>
                <p><span className="font-semibold">Singapore:</span> 999</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-3">Africa</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">South Africa:</span> 10111 (Police)</p>
                <p><span className="font-semibold">Nigeria:</span> 112 (Emergency)</p>
                <p><span className="font-semibold">Kenya:</span> 999 (Emergency)</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-3">Oceania</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Australia:</span> 000 (Emergency)</p>
                <p><span className="font-semibold">Lifeline (AU):</span> 13 11 14</p>
                <p><span className="font-semibold">New Zealand:</span> 111 (Emergency)</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-3">South America</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Brazil:</span> 188 (Crisis)</p>
                <p><span className="font-semibold">Argentina:</span> 135 (Crisis)</p>
                <p><span className="font-semibold">Chile:</span> 131 (Emergency)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Phone className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">24/7 Crisis Support</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">National Suicide Prevention Lifeline</h3>
                <p className="text-gray-600 mb-1">Call: 988 (US)</p>
                <p className="text-sm text-gray-500">Free, confidential support 24/7</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Crisis Text Line</h3>
                <p className="text-gray-600 mb-1">Text HOME to 741741 (US)</p>
                <p className="text-sm text-gray-500">Text-based crisis support</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">SAMHSA National Helpline</h3>
                <p className="text-gray-600 mb-1">1-800-662-HELP (4357)</p>
                <p className="text-sm text-gray-500">Substance abuse and mental health services</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">International Association for Suicide Prevention</h3>
                <p className="text-gray-600 mb-1">www.iasp.info/resources</p>
                <p className="text-sm text-gray-500">Crisis centers worldwide</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Staying Safe in Our Community</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Personal Safety Tips</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Never share personal information publicly</li>
                  <li>Use anonymous features when sharing sensitive stories</li>
                  <li>Report any inappropriate behavior immediately</li>
                  <li>Trust your instincts - if something feels wrong, it probably is</li>
                  <li>Block users who make you uncomfortable</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 mt-4">Red Flags to Report</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Requests for personal contact information</li>
                  <li>Financial requests or solicitations</li>
                  <li>Harassment or bullying behavior</li>
                  <li>Content promoting self-harm</li>
                  <li>Suspicious or predatory behavior</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Signs Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Warning Signs of Mental Health Crisis</h2>
          </div>
          
          <p className="text-gray-600 mb-4">If you or someone you know is experiencing these signs, please seek immediate help:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Immediate Concerns:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Talking about wanting to die or hurt oneself</li>
                <li>Looking for ways to end one's life</li>
                <li>Talking about feeling hopeless or having no purpose</li>
                <li>Extreme mood swings</li>
                <li>Increased use of alcohol or drugs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-800">Watch For:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Withdrawing from friends and family</li>
                <li>Sleeping too much or too little</li>
                <li>Giving away prized possessions</li>
                <li>Acting anxious or agitated</li>
                <li>Dramatic changes in behavior</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Self-Care Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-pink-600" />
            <h3 className="text-lg font-semibold mb-2">Self-Care Tools</h3>
            <p className="text-gray-600 text-sm mb-4">Apps and resources for daily wellness</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Calm, Headspace (meditation)</li>
              <li>• Sanvello (mood tracking)</li>
              <li>• BetterHelp (online therapy)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Peer Support</h3>
            <p className="text-gray-600 text-sm mb-4">Connect with others who understand</p>
            <Link to="/community">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full">
                Join Community
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-lg font-semibold mb-2">Educational Resources</h3>
            <p className="text-gray-600 text-sm mb-4">Learn about mental health</p>
            <Link to="/resources">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full">
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>

        {/* Grounding Techniques */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Grounding Techniques</h2>
          </div>
          
          <p className="text-gray-600 mb-6">Use these techniques when feeling overwhelmed, anxious, or disconnected:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-gray-800">5-4-3-2-1 Technique</h3>
              <ul className="text-gray-600 space-y-2">
                <li>👁️ Name <strong>5</strong> things you can see</li>
                <li>🤚 Name <strong>4</strong> things you can touch</li>
                <li>👂 Name <strong>3</strong> things you can hear</li>
                <li>👃 Name <strong>2</strong> things you can smell</li>
                <li>👅 Name <strong>1</strong> thing you can taste</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-gray-800">Box Breathing</h3>
              <ol className="text-gray-600 space-y-2">
                <li>1. Breathe in for 4 seconds</li>
                <li>2. Hold breath for 4 seconds</li>
                <li>3. Breathe out for 4 seconds</li>
                <li>4. Hold for 4 seconds</li>
                <li>5. Repeat 4-5 times</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Report Safety Concerns */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Report Safety Concerns</h2>
          <p className="mb-6">If you see something that concerns you or violates our community guidelines, please report it immediately.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="border border-white">
                Contact Support Team
              </Button>
            </Link>
            <Link to="/community-guidelines">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                View Community Guidelines
              </Button>
            </Link>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <p className="text-sm text-gray-700">
            <strong className="text-yellow-800">Important Disclaimer:</strong> Insidelyf is a peer support platform and is not a substitute for professional medical advice, diagnosis, or treatment. 
            If you are experiencing a mental health emergency, please contact emergency services or a qualified mental health professional immediately. 
            All information on this page is for educational purposes only.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Safety;
