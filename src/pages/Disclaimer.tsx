
import Header from "../components/Header";
import Footer from "../components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Disclaimer</h1>
          <div className="prose prose-lg max-w-none">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700 font-semibold">Important Notice</p>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Not Professional Medical Advice</h2>
            <p className="mb-4">Insidelyf is a peer support platform where individuals share personal experiences. The content shared here is not intended as professional medical, psychological, or therapeutic advice.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Seek Professional Help</h2>
            <p className="mb-4">If you are experiencing a mental health crisis, thoughts of self-harm, or need professional support, please contact:</p>
            <ul className="mb-6 space-y-2">
              <li>Emergency services: 911 (US) or your local emergency number</li>
              <li>National Suicide Prevention Lifeline: 988</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
              <li>Your healthcare provider or a mental health professional</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">User-Generated Content</h2>
            <p className="mb-4">All stories and experiences shared on Insidelyf are user-generated content. We do not verify the accuracy of shared experiences and cannot guarantee the reliability of any information shared by community members.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">No Warranties</h2>
            <p className="mb-4">We provide our platform "as is" without any warranties, express or implied. We do not guarantee that the platform will meet your specific needs or be free from errors.</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Individual Responsibility</h2>
            <p className="mb-4">Each user is responsible for their own actions and decisions. We encourage you to use your judgment when engaging with content and other community members.</p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-blue-700">Remember: You are not alone, and professional help is always available when you need it.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;
