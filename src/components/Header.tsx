
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import AuthButton from "./AuthButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/908596b0-cf81-451c-a157-6b120721fea6.png" 
              alt="Insidelyf Logo" 
              className="h-6 w-auto"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Insidelyf
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#stories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Stories</a>
            <a href="#communities" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Communities</a>
            <a href="#podcast" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Podcast</a>
            <a href="#premium" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Premium</a>
            <AuthButton />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#stories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Stories</a>
              <a href="#communities" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Communities</a>
              <a href="#podcast" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Podcast</a>
              <a href="#premium" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Premium</a>
              <div className="pt-2">
                <AuthButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
