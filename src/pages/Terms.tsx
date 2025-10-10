
import Header from "../components/Header";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: December 2024</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Acceptance of Terms</h2>
            <p className="mb-4">By accessing and using Insidelyf, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Community Guidelines</h2>
            <ul className="mb-6 space-y-2">
              <li>Treat all community members with respect and kindness</li>
              <li>Share authentically while respecting others' privacy</li>
              <li>No harassment, hate speech, or discriminatory content</li>
              <li>Maintain confidentiality of shared experiences</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Content Ownership</h2>
            <p className="mb-4">You retain ownership of the content you share. By posting, you grant us a license to display and distribute your content on our platform.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Prohibited Uses</h2>
            <ul className="mb-6 space-y-2">
              <li>Using the platform for any unlawful purpose</li>
              <li>Attempting to harm or exploit other users</li>
              <li>Sharing false or misleading information</li>
              <li>Violating others' intellectual property rights</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Limitation of Liability</h2>
            <p className="mb-4">Insidelyf provides peer support and is not a substitute for professional mental health services. We are not liable for any decisions made based on content shared on our platform.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Information</h2>
            <p>For questions about these Terms of Service, contact us at support@insidelyf.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
