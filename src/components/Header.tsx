
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/908596b0-cf81-451c-a157-6b120721fea6.png" 
              alt="Insidelyf Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-gray-900">Insidelyf</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#stories" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Stories</a>
            <a href="#community" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Community</a>
            <a href="#resources" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Resources</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">About</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-gray-700 hover:text-green-600">
              Sign In
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold">
              Join Community
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4 pt-4">
              <a href="#stories" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Stories</a>
              <a href="#community" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Community</a>
              <a href="#resources" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Resources</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">About</a>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" className="text-gray-700 hover:text-green-600 justify-start">
                  Sign In
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold">
                  Join Community
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
