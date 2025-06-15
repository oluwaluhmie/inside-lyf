
import { useEffect, useState } from "react";

const STATS = [
  { label: "Stories Shared", value: 47832, suffix: "+" },
  { label: "Lives Changed", value: 23156, suffix: "+" },
  { label: "Communities", value: 12, suffix: "" },
  { label: "Countries", value: 67, suffix: "+" }
];

export default function StatsCounter() {
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    const timers = STATS.map((stat, index) => {
      const increment = stat.value / 50; // Animate over ~2 seconds
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timers[index]);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, 40);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl p-8 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">The Impact We're Making Together</h2>
        <p className="text-blue-100">Real numbers from our growing community</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl lg:text-4xl font-black mb-2">
              {counts[index].toLocaleString()}{stat.suffix}
            </div>
            <div className="text-sm lg:text-base text-blue-100 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
