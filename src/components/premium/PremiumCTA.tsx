
import { Button } from "@/components/ui/button";

export default function PremiumCTA() {
  return (
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Journey?</h2>
      <p className="text-xl mb-6 opacity-90">Join thousands who've found deeper healing through our premium community</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8">
          Start Free Trial
        </Button>
        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
          Learn More
        </Button>
      </div>
      <p className="text-sm mt-4 opacity-75">7-day free trial • Cancel anytime • No hidden fees</p>
    </div>
  );
}
