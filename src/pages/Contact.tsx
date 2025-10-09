
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-600">We're here to help. Reach out to us with any questions or concerns.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input id="name" type="text" placeholder="Your full name" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input id="subject" type="text" placeholder="What's this about?" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help you..."
                  className="h-32"
                />
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold">Email Support</h3>
              </div>
              <p className="text-gray-600 mb-2">For general inquiries and support:</p>
              <p className="text-blue-600 font-medium">support@insidelyf.com</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">Community Support</h3>
              </div>
              <p className="text-gray-600 mb-2">Questions about community guidelines:</p>
              <p className="text-green-600 font-medium">community@insidelyf.com</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold">Response Time</h3>
              </div>
              <p className="text-gray-600">We typically respond within 24-48 hours during business days.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold">Our Mission</h3>
              </div>
              <p className="text-gray-600">Creating safe spaces for healing and connection across communities worldwide.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Need Immediate Help?</h2>
          <p className="mb-8 text-center">If you're experiencing a mental health crisis, please reach out for immediate support. Here are emergency numbers by continent:</p>
          
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
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
