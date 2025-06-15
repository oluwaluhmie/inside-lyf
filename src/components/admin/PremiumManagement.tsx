
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PremiumManagementProps {
  userRole?: 'admin' | 'moderator';
}

export default function PremiumManagement({ userRole = 'admin' }: PremiumManagementProps) {
  if (userRole === 'moderator') {
    return (
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Premium Content - View Only</h3>
        <p className="text-muted-foreground">
          As a moderator, you can view premium content but cannot manage it. Contact an administrator to add or modify premium content.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-lg font-semibold mb-4">Premium Content Management</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="documentary-title">Documentary Title</Label>
          <Input id="documentary-title" placeholder="Enter documentary title" />
        </div>
        <div>
          <Label htmlFor="documentary-description">Description</Label>
          <Input id="documentary-description" placeholder="Documentary description" />
        </div>
        <div>
          <Label htmlFor="documentary-url">Video URL</Label>
          <Input id="documentary-url" placeholder="Enter video URL" />
        </div>
        <Button>Add Premium Content</Button>
      </div>
    </div>
  );
}
