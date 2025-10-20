
import { useState } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/images/logo.png" 
              alt="Insidelyf Logo" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/stories" className="text-gray-700 hover:text-primary transition-colors font-medium">Read</Link>
            <Link to="/write" className="text-gray-700 hover:text-primary transition-colors font-medium">Write</Link>
            <Link to="/community" className="text-gray-700 hover:text-primary transition-colors font-medium">Community</Link>
            <Link to="/profile" className="text-gray-700 hover:text-primary transition-colors font-medium">Profile</Link>
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
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/stories" 
                className="text-gray-700 hover:text-primary transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Read
              </Link>
              <Link 
                to="/write" 
                className="text-gray-700 hover:text-primary transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Write
              </Link>
              <Link 
                to="/community" 
                className="text-gray-700 hover:text-primary transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-primary transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <div className="pt-2 px-2">
                <AuthButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
