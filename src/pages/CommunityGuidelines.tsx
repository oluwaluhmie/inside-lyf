
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heart, Shield, Users, MessageSquare } from "lucide-react";

const CommunityGuidelines = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Community Guidelines</h1>
          <p className="text-lg text-gray-600 mb-8">Our guidelines help create a safe, supportive environment where everyone can heal and grow together.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-pink-50 rounded-lg p-6">
              <Heart className="w-8 h-8 text-pink-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Lead with Compassion</h3>
              <p className="text-gray-600">Every person here is on their own healing journey. Approach all interactions with empathy and understanding.</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <Shield className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Respect Privacy</h3>
              <p className="text-gray-600">What's shared in our community stays in our community. Protect others' stories and personal information.</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <Users className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Embrace Diversity</h3>
              <p className="text-gray-600">Welcome people from all backgrounds, identities, and experiences. Our differences make us stronger.</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <MessageSquare className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Communicate Kindly</h3>
              <p className="text-gray-600">Use respectful language and avoid judgment. Remember that words have power to heal or harm.</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detailed Guidelines</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">✅ Do:</h3>
            <ul className="mb-6 space-y-2">
              <li>Share authentically from your own experience</li>
              <li>Offer support and encouragement to others</li>
              <li>Use content warnings for sensitive topics</li>
              <li>Report concerning behavior to moderators</li>
              <li>Respect others' boundaries and choices</li>
              <li>Celebrate others' progress and milestones</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">❌ Don't:</h3>
            <ul className="mb-6 space-y-2">
              <li>Give medical or professional advice</li>
              <li>Share others' personal information</li>
              <li>Use hate speech or discriminatory language</li>
              <li>Harass or bully other community members</li>
              <li>Share graphic content without warnings</li>
              <li>Promote harmful behaviors or substances</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Consequences</h2>
            <p className="mb-4">Violations of community guidelines may result in:</p>
            <ul className="mb-6 space-y-2">
              <li>Warning from moderators</li>
              <li>Temporary suspension from posting</li>
              <li>Removal from specific community circles</li>
              <li>Permanent ban from the platform</li>
            </ul>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-yellow-700"><strong>Remember:</strong> We're all here to support each other. When in doubt, choose kindness.</p>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reporting Issues</h2>
            <p className="mb-4">If you encounter behavior that violates our guidelines:</p>
            <ul className="space-y-2">
              <li>Use the report button on posts or comments</li>
              <li>Contact our moderation team directly</li>
              <li>Reach out to community leaders in your circles</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityGuidelines;
