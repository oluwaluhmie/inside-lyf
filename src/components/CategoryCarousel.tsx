import { useState } from "react";
import { Button } from "./ui/button";

const CATEGORIES = [
  { id: "all", label: "All Stories", emoji: "✨" },
  { id: "love", label: "Love", emoji: "❤️" },
  { id: "career", label: "Career", emoji: "💼" },
  { id: "healing", label: "Healing", emoji: "🌿" },
  { id: "faith", label: "Faith", emoji: "🙏" },
  { id: "triumph", label: "Triumph", emoji: "🏆" },
];

export default function CategoryCarousel() {
  const [selected, setSelected] = useState("all");

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-hide">
      {CATEGORIES.map((category) => (
        <Button
          key={category.id}
          variant={selected === category.id ? "default" : "outline"}
          onClick={() => setSelected(category.id)}
          className={`
            rounded-full px-6 py-3 whitespace-nowrap transition-all font-medium
            ${selected === category.id 
              ? 'bg-primary text-primary-foreground shadow-lg scale-105 border border-primary' 
              : 'bg-card hover:bg-primary hover:text-primary-foreground border-2 border-primary'
            }
          `}
        >
          <span className="mr-2">{category.emoji}</span>
          {category.label}
        </Button>
      ))}
    </div>
  );
}
