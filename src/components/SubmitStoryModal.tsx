
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SubmitStoryModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [story, setStory] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    // Normally would send to backend or show a toast.
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full animate-fade-in border">
        <DialogHeader>
          <DialogTitle>Share Your Story</DialogTitle>
          <DialogDescription>
            Your words could comfort someone else. You can share anonymously or with a name.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Your name (optional or Anonymous)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={48}
          />
          <textarea
            placeholder="Your story..."
            className="border rounded-lg px-3 py-2 min-h-[100px] text-base"
            required
            value={story}
            onChange={(e) => setStory(e.target.value)}
            maxLength={600}
          />
          <DialogFooter>
            <Button type="submit" className="bg-primary text-white px-6 rounded-full">Submit</Button>
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
