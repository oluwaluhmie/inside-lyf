
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "./ui/button";

const TESTIMONIALS = [
  {
    text: "Sharing my story here saved my life. I found people who actually understood what I was going through.",
    author: "Sarah M.",
    badge: "Anxiety Survivor"
  },
  {
    text: "I was skeptical at first, but this community became my safe haven. The support is incredible.",
    author: "Mike T.",
    badge: "New Dad"
  },
  {
    text: "For the first time in years, I don't feel alone. Thank you for creating this space.",
    author: "Emma L.",
    badge: "Grief Recovery"
  },
  {
    text: "The vulnerability here is beautiful. It inspired me to be more open in my real life too.",
    author: "Jordan R.",
    badge: "LGBTQ+ Advocate"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-pink-200 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-primary flex items-center gap-2">
          <Quote className="w-5 h-5" />
          What Our Community Says
        </h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={prev}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={next}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative min-h-[140px] sm:min-h-[120px]">
        <div className="absolute inset-0 flex items-center transition-all duration-500">
          <div className="w-full">
            <blockquote className="text-gray-700 mb-3 italic text-base sm:text-lg leading-relaxed">
              "{TESTIMONIALS[currentIndex].text}"
            </blockquote>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <cite className="font-semibold not-italic text-primary text-sm sm:text-base">
                — {TESTIMONIALS[currentIndex].author}
              </cite>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {TESTIMONIALS[currentIndex].badge}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-pink-500 w-6" : "bg-pink-200"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
