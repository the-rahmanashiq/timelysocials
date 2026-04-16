import MainLayout from "@/app/components/shared/MainLayout";
import Image from "next/image";
import React from "react";

const ContentPlatform = () => {
  const platforms = [
    { src: "/assets/social/x.svg", alt: "Twitter/X" },
    { src: "/assets/social/instagram.svg", alt: "Instagram" },
    { src: "/assets/social/tiktok.svg", alt: "TikTok" },
    { src: "/assets/social/pinterest.svg", alt: "Pinterest" },
    { src: "/assets/social/linkedin.svg", alt: "LinkedIn" },
    { src: "/assets/social/threads.svg", alt: "Threads" },
    { src: "/assets/social/facebook.svg", alt: "Facebook" },
    { src: "/assets/social/bluesky.svg", alt: "Bluesky" },
    { src: "/assets/social/plus.svg", alt: "Ask for a new platform" },
  ];

  return (
    <section className="bg-blue-50 py-16 mb-20" id="platforms">
      <MainLayout>
        <div className="px-4 sm:px-6">
          {/* Heading */}
          <h2 className="text-center text-3xl italic font-bold text-gray-900">
            You can schedule content on these platforms.
          </h2>

          {/* Platform Grid */}
          <div className="mt-32 grid grid-cols-2 sm:grid-cols-4 gap-16">
            {platforms.map(({ src, alt }, i) => {
              const isLast = i === platforms.length - 1;
              return (
                <div
                  key={i}
                  className={
                    // span full width on the last item, so it sits in the center
                    isLast
                      ? "col-span-2 sm:col-span-4 flex flex-col items-center"
                      : "flex flex-col items-center text-center"
                  }
                >
                  <Image src={src} alt={alt} width={75} height={75} />
                  <span className="mt-2 font-bold text-lg italic text-gray-800">
                    {alt}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </MainLayout>
    </section>
  );
};

export default ContentPlatform;
