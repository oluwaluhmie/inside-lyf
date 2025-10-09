
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Auth from "./pages/Auth";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Cookies from "./pages/Cookies";
import Help from "./pages/Help";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Stories from "./pages/Stories";
import Story from "./pages/Story";
import WriteStory from "./pages/WriteStory";
import CommunityDiscussion from "./pages/CommunityDiscussion";
import Newsletter from "./pages/Newsletter";
import Resources from "./pages/Resources";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import DailyReflection from "./pages/DailyReflection";
import NotFound from "./pages/NotFound";
import FootballBanter from "./pages/community/FootballBanter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/story/:id" element={<Story />} />
            <Route path="/write" element={<WriteStory />} />
            <Route path="/community" element={<CommunityDiscussion />} />
            <Route path="/community/:threadId" element={<CommunityDiscussion />} />
            <Route path="/community/football-banter" element={<FootballBanter />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reflect" element={<DailyReflection />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/help" element={<Help />} />
            <Route path="/community-guidelines" element={<CommunityGuidelines />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
