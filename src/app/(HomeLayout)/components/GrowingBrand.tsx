import MainLayout from "@/app/components/shared/MainLayout";
import Image from "next/image";
import React from "react";

const GrowingBrand = () => {
  return (
    <section className="bg-blue-50 py-16 mb-20">
      <MainLayout>
        <div className="px-4 sm:px-6">
          {/* Heading */}
          <h2 className="text-center text-3xl italic font-bold text-gray-900">
            Growing your brand with posting content shouldn’t be this hard.
          </h2>

          {/* Two‐column grid of “pain points” */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-none w-8 aspect-square bg-teal rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/assets/homepage/copy.png"
                    alt="Copy Icon"
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Wasting Hours Posting the Same Thing on Every Platform
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Copy-pasting captions, switching tabs, resizing images; it’s
                    a never-ending loop that kills your time and momentum.
                  </p>
                </div>
              </div>

              {/* 2) You Can't Plan Ahead, You're Always Scrambling */}
              <div className="flex items-start">
                <div className="flex-none w-8 aspect-square bg-teal rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/assets/homepage/marathon.png"
                    alt="Copy Icon"
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    You Can’t Plan Ahead, You’re Always Scrambling
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Posting “on the fly” means no consistency, no strategy, and
                    no time for the stuff that actually grows your brand.
                  </p>
                </div>
              </div>

              {/* 3) Missing the Best Times to Post */}
              <div className="flex items-start">
                <div className="flex-none w-8 aspect-square bg-teal rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/assets/homepage/time.png"
                    alt="Copy Icon"
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Missing the Best Times to Post
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    You’re busy when your audience is most active. Without
                    scheduling, you’re either late or not seen.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (2 items) */}
            <div className="space-y-8">
              {/* 4) Overwhelmed Managing Multiple Accounts */}
              <div className="flex items-start">
                <div className="flex-none w-8 aspect-square bg-teal rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/assets/homepage/accounts.png"
                    alt="Copy Icon"
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Overwhelmed Managing Multiple Accounts
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Instagram, Facebook, LinkedIn, TikTok, X… juggling all of
                    them manually leads to burnout or total neglect.
                  </p>
                </div>
              </div>

              {/* 5) You Forget to Post, Then Feel Guilty Later */}
              <div className="flex items-start">
                <div className="flex-none w-8 aspect-square bg-teal rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/assets/homepage/upload.png"
                    alt="Copy Icon"
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    You Forget to Post, Then Feel Guilty Later
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    One missed day turns into three. Then the algorithm punishes
                    you, and your audience moves on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </section>
  );
};

export default GrowingBrand;
