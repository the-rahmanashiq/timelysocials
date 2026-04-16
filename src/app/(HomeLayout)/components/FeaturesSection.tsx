import MainLayout from "@/app/components/shared/MainLayout";
import Image from "next/image";
import React from "react";

const FeaturesSection = () => {
  return (
    <section className="bg-blue-50 py-16 mb-20" id="features">
      <MainLayout>
        <div className="px-4 sm:px-6">
          {/* Heading */}
          <h2 className="text-center text-3xl italic font-bold text-gray-900">
            Every feature you need in one simple platform.
          </h2>

          {/* Two‐column grid of features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              {/* 1) Unlimited social media accounts */}
              <FeatureItem
                iconSrc="/assets/homepage/unlimited.png"
                iconAlt="Infinite accounts"
                title="Unlimited social media accounts"
                description="Connect all your social profiles with no restrictions. Perfect for agencies and power users managing multiple brands."
              />

              {/* 2) Shorts/Reels/Tiktoks scheduling */}
              <FeatureItem
                iconSrc="/assets/homepage/reels.png"
                iconAlt="Short-form video"
                title="Shorts/Reels/Tiktoks scheduling"
                description="Schedule short-form video content for Instagram Reels and YouTube Shorts to boost engagement and reach new audiences."
              />

              {/* 3) Content performance analytics */}
              <FeatureItem
                iconSrc="/assets/homepage/analytics.png"
                iconAlt="Analytics chart"
                title="Content performance analytics"
                description="Make data-driven decisions with detailed content performance metrics, and audience insights across all your social platforms."
              />

              {/* 4) Post preview */}
              <FeatureItem
                iconSrc="/assets/homepage/preview.png"
                iconAlt="Post preview"
                title="Post preview"
                description="See exactly how your post will look on every platform before it goes live."
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {/* 5) Smart visual scheduling */}
              <FeatureItem
                iconSrc="/assets/homepage/calendar.png"
                iconAlt="Calendar scheduling"
                title="Smart visual scheduling"
                description="Plan your posts ahead with a drag-and-drop calendar that makes staying consistent effortless."
              />

              {/* 6) Carousel posts scheduling */}
              <FeatureItem
                iconSrc="/assets/homepage/carousel.png"
                iconAlt="Carousel posts"
                title="Carousel posts scheduling"
                description="Create and schedule multi-image carousel posts that drive engagement and tell your brand story with impact."
              />

              {/* 7) Content management */}
              <FeatureItem
                iconSrc="/assets/homepage/management.png"
                iconAlt="Content management"
                title="Content management"
                description="View all of your posted content and scheduled content in one place, edit scheduled posts and view your old posts."
              />

              {/* 8) Content Ideas Vault (coming soon) */}
              <FeatureItem
                iconSrc="/assets/homepage/vault.png"
                iconAlt="Content Ideas Vault"
                title="Content Ideas Vault (coming soon)"
                description="Get inspired with proven, viral content templates and ideas curated for your niche."
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </section>
  );
};

interface FeatureItemProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  iconSrc,
  iconAlt,
  title,
  description,
}) => (
  <div className="flex items-start">
    <div className="flex-none w-8 aspect-square bg-teal rounded-full overflow-hidden flex items-center justify-center">
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={16}
        height={16}
        style={{ objectFit: "contain" }}
      />
    </div>
    <div className="ml-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  </div>
);

export default FeaturesSection;
