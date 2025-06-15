
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthButton() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Button 
        onClick={() => navigate("/auth")}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        <User className="w-4 h-4 mr-2" />
        Sign In
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">
        Welcome, {user.user_metadata?.full_name || user.email}
      </span>
      <Button 
        onClick={signOut}
        variant="outline"
        size="sm"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
