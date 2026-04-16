import MainLayout from "@/app/components/shared/MainLayout";
import Image from "next/image";
import React from "react";

const PromoSection = () => {
  return (
    <section className="bg-white py-16">
      <MainLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 items-start px-4 sm:px-6">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Cheapest &amp; Easiest Social Media Content Scheduler on the
              Planet.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Schedule content in seconds to all major social media platforms.
              Grow your socials on auto-pilot.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Post to all your socials in one click without switching tabs",
                "Save time every week by scheduling content in advance",
                "Stay consistent even when you're offline or busy",
                "Easily manage multiple brands or clients from one place",
                "Plan smarter with a simple visual calendar built for creators",
                "Schedule unlimited posts across all major platforms for as low as $4/month",
              ].map((text, i) => (
                <li key={i} className="flex items-start">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={20}
                    height={20}
                  />
                  <span className="ml-3 text-base text-gray-700">{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 inline-block px-6 py-3 font-bold text-lg rounded-full bg-teal text-black border-4 border-black"
            >
              Try it for free!
            </a>
            <div className="flex md:justify-items-center">
              <div className="mt-6 flex items-center ">
                {[
                  "bg-cyan-400",
                  "bg-red-500",
                  "bg-yellow-300",
                  "bg-pink-500",
                  "bg-green-400",
                ].map((color, i) => (
                  <span key={i} className={`w-8 h-8 ${color} rounded-full`} />
                ))}
              </div>
              <div className="ml-7">
                <div className="mt-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      src="/assets/icons/star.svg"
                      alt="star"
                      width={16}
                      height={16}
                    />
                  ))}
                </div>
                <div className=" text-black font-bold">
                  Loved by xxxx creators
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="h-full flex items-center w-3/4 mx-auto">
            <div className="mt-10 md:mt-0 flex flex-wrap justify-center items-center gap-4">
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
          </div>
        </div>
      </MainLayout>
    </section>
  );
};

export default PromoSection;
