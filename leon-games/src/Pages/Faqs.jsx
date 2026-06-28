import { Navigation } from "../components/common/Navbar";

export default function Faqs() {
  return (
    <div className="bg-[#050505] text-white font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-400 min-h-screen overflow-x-hidden relative">
      <Navigation variant="subpage" label="FAQs" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="space-y-4">
          <div className="bg-[#111] p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">What is your return policy?</h2>
            <p className="text-gray-300">We offer a 30-day return policy for all items.</p>
          </div>
          <div className="bg-[#111] p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">How do I track my order?</h2>
            <p className="text-gray-300">You can track your order using the tracking number provided in your confirmation email.</p>
          </div>
        </div>
      </main>
    </div>
  );
}   