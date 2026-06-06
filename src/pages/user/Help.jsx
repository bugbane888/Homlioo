import React, { useState } from "react";
import { ChevronDown, Mail, HelpCircle } from "lucide-react";
import PageTransition from "../../components/common/PageTransition";

const Help = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I find a PG near my college?",
      answer:
        "Use our search bar on the home page to enter your college name or locality. You can also apply filters for budget, gender preference, and specific amenities to narrow down your options.",
    },
    {
      id: 2,
      question: "Are all listings verified by HOMLiOO?",
      answer:
        "Yes! Every PG on HOMLiOO is physically verified by our team before listing. You'll see a 'HOMLiOO Verified' badge on all listings for your peace of mind.",
    },
    {
      id: 3,
      question: "How can I contact a PG owner?",
      answer:
        "Click on any PG listing to view the detail page. You'll find options to contact the owner directly. There's no brokerage fee for students.",
    },
    {
      id: 4,
      question: "Can I compare multiple PGs?",
      answer:
        "Absolutely! Click the compare icon on any listing card to add it to the comparison. You can compare up to 3 PGs side-by-side to make the best decision.",
    },
    {
      id: 5,
      question: "Is HOMLiOO free to use?",
      answer:
        "Yes, HOMLiOO is completely free for students. We only charge PG owners a listing fee. Students pay zero brokerage.",
    },
    {
      id: 6,
      question: "How do I report an issue with a listing?",
      answer:
        "If you find any inaccurate information or have concerns about a listing, please contact our support team using the contact form below.",
    },
    {
      id: 7,
      question: "What information is included in each PG listing?",
      answer:
        "Each listing includes photos, amenities, pricing, house rules, distance from colleges/metro stations, and direct owner contact details.",
    },
    {
      id: 8,
      question: "How often are listings updated?",
      answer:
        "Listings are updated in real-time by PG owners. Availability and pricing changes are reflected immediately when owners update their information.",
    },
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-[900] text-brand-navy dark:text-white tracking-tighter mb-4">
            How Can We Help?
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Find answers to common questions about HOMLiOO and how to make the most of our platform.
          </p>
        </div>

        {/* Contact Options — Email only */}
        <div className="flex justify-center mb-16">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 text-center w-full max-w-sm">
            <Mail size={32} className="text-brand-amber mx-auto mb-4" />
            <h3 className="font-bold text-brand-navy dark:text-white mb-2">
              Email Us
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              homlioopg@gmail.com
            </p>
            <a
              href="mailto:homlioopg@gmail.com"
              className="text-brand-purple hover:underline font-bold text-sm"
            >
              Send Email
            </a>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle size={24} className="text-brand-amber" />
            <h2 className="text-2xl sm:text-3xl font-[900] text-brand-navy dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="font-bold text-brand-navy dark:text-white text-left">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-brand-purple shrink-0 transition-transform ${
                      expandedFaq === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedFaq === faq.id && (
                  <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-r from-brand-amber/10 to-brand-purple/10 border border-brand-amber/20 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">
            Didn't find what you're looking for?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">
            Our support team is here to help. Reach out to us anytime!
          </p>
          <a
            href="mailto:homlioopg@gmail.com"
            className="inline-block bg-brand-amber hover:bg-amber-500 text-brand-navy px-8 py-3 rounded-2xl font-bold transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </PageTransition>
  );
};

export default Help;
