
import Header from "../components/Header";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: December 2024</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Information We Collect</h2>
            <p className="mb-4">At Insidelyf, we collect information you provide directly to us, such as when you create an account, share your story, or contact us for support.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">How We Use Your Information</h2>
            <ul className="mb-6 space-y-2">
              <li>To provide and maintain our services</li>
              <li>To create a safe community environment</li>
              <li>To send you updates and newsletters (with your consent)</li>
              <li>To improve our platform based on user feedback</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Data Protection</h2>
            <p className="mb-4">We implement appropriate security measures to protect your personal information. Your stories and personal data are encrypted and stored securely.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Rights</h2>
            <p className="mb-4">You have the right to access, update, or delete your personal information at any time. Contact us if you need assistance with your data.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at privacy@insidelyf.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
