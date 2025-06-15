
import { Button } from "@/components/ui/button";
import { CreditCard, Gift, Crown, Check, Zap } from "lucide-react";

const PLANS = [
  {
    name: "Monthly Premium",
    price: "$9.99",
    period: "per month",
    description: "Perfect for trying out premium features",
    features: [
      "Exclusive video content",
      "Premium stories access",
      "Private support groups",
      "One-on-one therapy sessions",
      "Ad-free experience",
      "Priority support"
    ],
    popular: false,
    trialDays: 7
  },
  {
    name: "Annual Premium",
    price: "$99.99",
    period: "per year",
    description: "Best value - save 16% with annual billing",
    originalPrice: "$119.88",
    features: [
      "Everything in Monthly Premium",
      "Annual savings of $19.89",
      "Exclusive annual member perks",
      "Priority therapist booking",
      "Advanced analytics",
      "Early access to new features"
    ],
    popular: true,
    trialDays: 14
  },
  {
    name: "Lifetime Access",
    price: "$299.99",
    period: "one-time",
    description: "Unlimited access forever",
    features: [
      "All premium features forever",
      "Lifetime community access",
      "VIP therapist network",
      "Exclusive lifetime member badge",
      "Beta feature access",
      "Personal growth coaching"
    ],
    popular: false,
    trialDays: 30
  }
];

export default function PaymentLinks() {
  const handleStartTrial = (planName: string, trialDays: number) => {
    console.log(`Starting ${trialDays}-day free trial for ${planName}`);
    // This would integrate with Stripe in a real implementation
  };

  const handleUpgrade = (planName: string) => {
    console.log(`Upgrading to ${planName}`);
    // This would integrate with Stripe in a real implementation
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Choose Your Premium Plan
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Unlock deeper healing with exclusive content, private communities, and professional therapy support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {PLANS.map((plan, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-xl p-6 shadow-lg border-2 relative ${
              plan.popular ? 'border-amber-400 shadow-amber-100' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-2">
                {plan.originalPrice && (
                  <span className="text-slate-400 line-through text-sm mr-2">{plan.originalPrice}</span>
                )}
                <span className="text-3xl font-bold text-slate-800">{plan.price}</span>
                <span className="text-slate-600 ml-1">{plan.period}</span>
              </div>
              <p className="text-sm text-slate-600">{plan.description}</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                onClick={() => handleStartTrial(plan.name, plan.trialDays)}
              >
                <Gift className="w-4 h-4 mr-2" />
                Start {plan.trialDays}-Day Free Trial
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                onClick={() => handleUpgrade(plan.name)}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
            
            <p className="text-xs text-slate-500 text-center mt-3">
              Cancel anytime • No hidden fees
            </p>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl p-6 border border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-blue-800">Free Trial Benefits</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Full access to all premium features</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>No credit card required to start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Cancel anytime during trial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
