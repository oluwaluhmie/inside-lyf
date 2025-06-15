
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/lovable-uploads/908596b0-cf81-451c-a157-6b120721fea6.png" 
              alt="Insidelyf Logo" 
              className="h-6 sm:h-8 w-auto"
            />
            <span className="text-lg sm:text-xl font-bold text-white">Insidelyf</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#stories" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">Stories</a>
            <a href="#community" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">Community</a>
            <a href="#resources" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">Resources</a>
            <a href="#about" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">About</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Button variant="ghost" className="text-slate-300 hover:text-blue-400 hover:bg-slate-800">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 lg:px-6 py-2 rounded-full font-semibold transition-all duration-200">
              Join Community
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-blue-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
            <nav className="flex flex-col gap-4 pt-4">
              <a href="#stories" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">Stories</a>
              <a href="#community" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">Community</a>
              <a href="#resources" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">Resources</a>
              <a href="#about" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">About</a>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 justify-start">
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold">
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
