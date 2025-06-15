
const TESTIMONIALS = [
  {
    name: "Sarah M.",
    quote: "The premium community changed my life. Having access to expert sessions and private groups made all the difference in my healing journey.",
    role: "Premium Member since 2023"
  },
  {
    name: "Michael R.",
    quote: "The exclusive content and priority support helped me when I needed it most. Worth every penny.",
    role: "Premium Member since 2024"
  }
];

export default function PremiumTestimonials() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8">What Our Premium Members Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TESTIMONIALS.map((testimonial, index) => (
          <div key={index} className="border-l-4 border-amber-400 pl-6">
            <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="font-semibold">{testimonial.name}</span>
              <span className="text-slate-500 text-sm">{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
