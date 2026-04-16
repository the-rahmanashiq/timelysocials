import MainLayout from "@/app/components/shared/MainLayout";
import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What social platforms do you support?",
      answer:
        "Currently we support Twitter/X, Instagram, LinkedIn, Facebook, TikTok, YouTube, Bluesky, Threads, Pinterest for scheduled posting and instant posting.",
    },
    {
      question: "How many social accounts can I connect?",
      answer:
        "Depends on your plan, see the pricing section for more details. By the way, this is the most affordable option in the market which does all the things like the expensive tools.",
    },
    {
      question: "Can I connect 2 accounts to the same platform?",
      answer:
        "Yes. Example: Starter plan can connect 5 total accounts, all of them can be TikTok accounts, or 3 of them could be TikTok and 2 Instagram accounts for their cap of 5.",
    },
    {
      question: "How many posts can I make and schedule per month?",
      answer:
        "Unlimited for paying users. 5 for free users. 1 post to 4 platforms = 4 posts total.",
    },
    {
      question: "What types of content can I post?",
      answer:
        "You can create and schedule various types of posts including: videos, images, text posts, carousels (multiple images), and reels. This gives you the flexibility to share all types of content across your social media platforms.",
    },
    {
      question: "Will my posts get less reach using this app?",
      answer: "No, you will have the same reach as if you posted manually.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes, there’s no lock-in and you can cancel your subscription at anytime of the month. When canceling it will cancel at the end of your current billing period; you can still use the pro features until the end of your billing period.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes! You can request a refund within 7 days of being charged. Just reach out by email in this time frame.",
    },
    {
      question: "Do I need to share my social media passwords with you?",
      answer:
        "No, we never ask for or store your passwords directly. We use official authentication methods provided by each social platform, which means you log in securely through their official login pages. This is the same secure method used by all legitimate social media management tools.",
    },
    {
      question: "How does TimelySocials’s pricing work?",
      answer:
        "TimelySocials offers flexible billing options to suit your needs. Choose between monthly or annual billing, with annual plans saving you 40% compared to monthly payments. This means you get 12 months of premium service for the price of just over 7 months when you choose annual billing. All plans include our core features, with higher tiers offering more social accounts and advanced capabilities.",
    },
  ];

  return (
    <section className="bg-blue-50 py-16 mb-20" id="faq">
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8 rounded-md">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-6 text-center">
            <span className="italic font-bold">Frequently Asked</span>{" "}
            <span className="italic text-teal font-bold">Questions</span>{" "}
            <span className="italic font-bold">(FAQ)</span>
          </h2>

          <div className="hs-accordion-group space-y-4">
            {faqs.map((faq, index) => {
              const headingId = `hs-faq-heading-${index}`;
              const collapseId = `hs-faq-collapse-${index}`;
              const isActive = index === 0;

              return (
                <div
                  key={index}
                  className={`hs-accordion ${isActive ? "active" : ""}`}
                  id={headingId}
                >
                  <button
                    className="hs-accordion-toggle py-3 inline-flex gap-x-3 w-full text-start text-black hover:text-gray-600 focus:outline-none text-2xl items-baseline"
                    aria-expanded={isActive}
                    aria-controls={collapseId}
                  >
                    <svg
                      className="hs-accordion-active:hidden mt-1 block size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg
                      className="hs-accordion-active:block mt-1 hidden size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                    </svg>
                    <strong>{faq.question}</strong>
                  </button>

                  <div
                    id={collapseId}
                    className={`hs-accordion-content ${
                      isActive ? "" : "hidden"
                    } w-full overflow-hidden transition-[height] duration-300`}
                    role="region"
                    aria-labelledby={headingId}
                  >
                    <p className="text-black px-7 mt-2 pb-2 text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MainLayout>
    </section>
  );
};

export default FAQ;
