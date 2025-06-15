
import Header from "../components/Header";
import Footer from "../components/Footer";
import PremiumHeader from "../components/premium/PremiumHeader";
import PaymentLinks from "../components/premium/PaymentLinks";
import PremiumSupportGroups from "../components/premium/PremiumSupportGroups";
import TherapyChat from "../components/premium/TherapyChat";
import ExclusiveVideosSection from "../components/premium/ExclusiveVideosSection";
import PremiumStoriesSection from "../components/premium/PremiumStoriesSection";
import PremiumBenefits from "../components/premium/PremiumBenefits";
import PremiumTestimonials from "../components/premium/PremiumTestimonials";
import PremiumCTA from "../components/premium/PremiumCTA";

export default function Premium() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <PremiumHeader />

        {/* Payment Links Section */}
        <div className="mb-12">
          <PaymentLinks />
        </div>

        {/* Premium Support Groups */}
        <div className="mb-12">
          <PremiumSupportGroups />
        </div>

        {/* One-on-One Therapy */}
        <div className="mb-12">
          <TherapyChat />
        </div>

        {/* Exclusive Videos Section */}
        <div className="mb-12">
          <ExclusiveVideosSection />
        </div>

        {/* Premium Stories Section */}
        <div className="mb-12">
          <PremiumStoriesSection />
        </div>

        {/* Premium Benefits */}
        <div className="mb-12">
          <PremiumBenefits />
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <PremiumTestimonials />
        </div>

        {/* Call to Action */}
        <PremiumCTA />
      </main>
      
      <Footer />
    </div>
  );
}
