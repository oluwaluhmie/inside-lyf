
import { Crown } from "lucide-react";

export default function PremiumHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Crown className="w-8 h-8 text-amber-600" />
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Premium Membership
        </h1>
      </div>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        Unlock deeper connections, exclusive content, and premium support on your healing journey
      </p>
    </div>
  );
}
