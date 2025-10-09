import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="mb-4 inline-block hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/908596b0-cf81-451c-a157-6b120721fea6.png" 
                alt="Insidelyf Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              A safe space where your story matters. Share your experiences, find your community, 
              and discover healing through connection.
            </p>
            <div className="flex gap-4">
              <Link to="/write-story">
                <Button variant="outline" className="border-gray-600 text-amber-500 hover:bg-gray-800 hover:text-amber-400">
                  Share Your Story
                </Button>
              </Link>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="https://web.facebook.com/insidelyf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#61B34F] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/realinsidelyf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#61B34F] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://x.com/realinsidelyf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#61B34F] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@realinsidelyf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#61B34F] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
              <li><a href="/disclaimer" className="hover:text-green-400 transition-colors">Disclaimer</a></li>
              <li><a href="/cookies" className="hover:text-green-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Support & Community */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/help" className="hover:text-green-400 transition-colors">Help Center</a></li>
              <li><a href="/community-guidelines" className="hover:text-green-400 transition-colors">Community Guidelines</a></li>
              <li><a href="/safety" className="hover:text-green-400 transition-colors">Safety Resources</a></li>
              <li><a href="/contact" className="hover:text-green-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 Insidelyf. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm mt-4 md:mt-0">
            <p>Made with ❤️ for healing and connection</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-gray-500 border-t border-gray-700 pt-6">
          <p>
            <strong>Important:</strong> Insidelyf provides a platform for sharing experiences and peer support. 
            This is not a substitute for professional mental health treatment. If you are experiencing a mental health crisis, 
            please contact your local emergency services or a mental health professional immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}
