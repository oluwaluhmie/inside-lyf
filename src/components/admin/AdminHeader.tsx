
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-primary">Insidelyf Admin Dashboard</h1>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </header>
  );
}
