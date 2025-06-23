
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Cookie Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: December 2024</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">What Are Cookies</h2>
            <p className="mb-4">Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving site functionality.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Essential Cookies</h3>
            <p className="mb-4">These cookies are necessary for the website to function properly. They include authentication cookies that keep you logged in and session cookies that maintain your preferences during your visit.</p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Analytics Cookies</h3>
            <p className="mb-4">We use analytics cookies to understand how visitors interact with our website. This helps us improve our platform and create better content for our community.</p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Preference Cookies</h3>
            <p className="mb-4">These cookies remember your choices and preferences, such as your language settings or display preferences, to enhance your user experience.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Managing Cookies</h2>
            <p className="mb-4">You can control and manage cookies in various ways:</p>
            <ul className="mb-6 space-y-2">
              <li>Browser settings: Most browsers allow you to refuse cookies or delete existing ones</li>
              <li>Third-party tools: Use privacy-focused browser extensions</li>
              <li>Opt-out links: Some cookies provide direct opt-out mechanisms</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Impact of Disabling Cookies</h2>
            <p className="mb-4">While you can disable cookies, please note that some features of our website may not function properly without them. Essential cookies are required for basic functionality like logging in and maintaining your session.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at privacy@insidelyf.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
