"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MainLayout from "@/app/components/shared/MainLayout";
import Image from "next/image";

interface Plan {
  title: string;
  desc: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState("yearly");

  const plans: { [key: string]: Plan[] } = {
    monthly: [
      {
        title: "Starter",
        price: "$6.67",
        desc: "Perfect for individuals and small creators",
        features: [
          "7 connected social media accounts",
          "Multiple accounts per platform",
          "Unlimited posts & scheduling",
          "Carousel posts (Instagram only)",
          "Reels/shorts/TikTok scheduling",
          "Visual content calendar",
          "Content performance insights",
          "1 user",
        ],
      },
      {
        title: "Growth",
        price: "$13.33",
        desc: "Perfect for growing creators & businesses",
        popular: true,
        features: [
          "15 connected social media accounts",
          "Multiple accounts per platform",
          "Unlimited posts & scheduling",
          "Carousel posts (Instagram only)",
          "Reels/shorts/TikTok scheduling",
          "Visual content calendar",
          "Content performance insights",
          "Content planner for social media platforms",
          "AI content assistant",
          "Best time to post for every niche (coming soon)",
          "2 users",
        ],
      },
      {
        title: "Explode",
        price: "$21.67",
        desc: "Perfect for agencies & large organizations",
        features: [
          "Unlimited social media accounts",
          "Multiple accounts per platform",
          "Unlimited posts & scheduling",
          "Carousel posts (Instagram only)",
          "Reels/shorts/TikTok scheduling",
          "Visual content calendar",
          "Content performance insights",
          "Content planner for social media platforms",
          "AI content assistant",
          "Best time to post for every niche (coming soon)",
          "5 users",
          "More features are coming soon for teams",
        ],
      },
    ],
    yearly: [
      {
        title: "Starter",
        price: "$4.00",
        desc: "Perfect for individuals and small creators",
        features: [
          "7 connected social media accounts",
          "Multiple accounts per platform",
          "Unlimited posts & scheduling",
          "Carousel posts (Instagram only)",
          "Reels/shorts/TikTok scheduling",
          "Visual content calendar",
          "Content performance insights",
          "1 user",
        ],
      },
      {
        title: "Growth",
        price: "$8.00",
        desc: "Perfect for growing creators & businesses",
        popular: true,
        features: [
          "15 connected social media accounts",
          "Multiple accounts per platform",
          "Unlimited posts & scheduling",
          "Carousel posts (Instagram only)",
          "Reels/shorts/TikTok scheduling",
          "Visual content calendar",
          "Content performance insights",
          "Content planner for social media platforms",
          "AI content assistant",
          "Best time to post for every niche (coming soon)",
          "2 users",
        ],
      },
      {
        title: "Explode",
        price: "$13.00",
        desc: "Perfect for agencies & large organizations",
        features: [
          "Unlimited social media accounts",
          "Multiple accounts per platform",
          "Unlimited posts & scheduling",
          "Carousel posts (Instagram only)",
          "Reels/shorts/TikTok scheduling",
          "Visual content calendar",
          "Content performance insights",
          "Content planner for social media platforms",
          "AI content assistant",
          "Best time to post for every niche (coming soon)",
          "5 users",
          "More features are coming soon for teams",
        ],
      },
    ],
  };

  return (
    <MainLayout>
      <section className="bg-white py-16  px-6" id="pricing">
        <div className="text-center max-w-3xl mx-auto ">
          <h2 className="text-3xl italic font-bold text-black">
            For a price of your morning coffee, you can grow on socials.
          </h2>
          <p className="mt-2 text-black">
            Most affordable scheduling tool for creators and all kinds of
            businesses.
            <br />
            <span className="font-bold">
              {" "}
              Start at as little as $4/month. No hidden fees. Cancel anytime.
              Save 25% when you pay yearly.
            </span>
          </p>

          <div className="flex justify-center gap-3 mt-6">
            {[
              { src: "/assets/social/x.svg", alt: "X" },
              { src: "/assets/social/tiktok.svg", alt: "TikTok" },
              { src: "/assets/social/pinterest.svg", alt: "Pinterest" },
              { src: "/assets/social/linkedin.svg", alt: "LinkedIn" },
              { src: "/assets/social/youtube.svg", alt: "YouTube" },
              { src: "/assets/social/instagram.svg", alt: "Instagram" },
              { src: "/assets/social/facebook.svg", alt: "Facebook" },
              { src: "/assets/social/mastodon.svg", alt: "Mastodon" },
              { src: "/assets/social/telegram.svg", alt: "Telegram" },
              { src: "/assets/social/bluesky.svg", alt: "Blue Sky" },
            ].map(({ src, alt }, i) => (
              <Image key={i} src={src} alt={alt} width={48} height={48} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <motion.div
              layout
              className="flex items-center bg-gray-100 p-2 rounded-full"
            >
              <motion.button
                layout
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 font-bold ${
                  billingCycle === "monthly"
                    ? "bg-teal text-black"
                    : "text-gray-800"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </motion.button>
              <motion.button
                layout
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 font-bold ${
                  billingCycle === "yearly"
                    ? "bg-teal text-black"
                    : "text-gray-800"
                }`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly <span className="text-xs">(40% Off)</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        <div className="relative mt-10 max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <AnimatePresence initial={false} mode="popLayout">
            {plans[billingCycle].map((plan) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                layout
                className={`rounded-xl p-6 border shadow-sm ${
                  plan.popular ? "border-teal ring-2 ring-blue-200" : ""
                }`}
              >
                {plan.popular && (
                  <div className="text-xs text-white bg-red-500 px-2 py-1 rounded-full inline-block mb-2">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{plan.desc}</p>
                <div className="text-3xl font-bold mt-4">
                  {plan.price}
                  <span className="text-base font-normal">/month</span>
                </div>
                <button className="mt-4 w-full bg-teal text-black font-bold py-2 rounded-md text-sm">
                  Start 7 day free trial →
                </button>
                <ul className="mt-4 text-sm text-gray-700 list-disc list-inside space-y-1">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </MainLayout>
  );
};

export default PricingSection;
