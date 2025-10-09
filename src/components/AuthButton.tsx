
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AuthButton() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url, full_name')
          .eq('id', user.id)
          .single();

        if (data) setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <Button 
        onClick={() => navigate("/auth")}
        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
      >
        <User className="w-4 h-4 mr-2" />
        Sign In
      </Button>
    );
  }

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email || "User";
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => navigate("/profile")}
        variant="ghost"
        size="sm"
        className="p-0 h-auto hover:opacity-80"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={profile?.avatar_url} alt={displayName} />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
      </Button>
      <Button 
        onClick={signOut}
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        title="Sign Out"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}
