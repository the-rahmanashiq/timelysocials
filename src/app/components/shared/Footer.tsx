import Image from "next/image";
import Link from "next/link";
import MainLayout from "./MainLayout";

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-800">
      {/* Container */}
      <MainLayout>
        <div className="px-6 py-12 md:py-16">
          {/* Four-column grid on md+, stacks on small screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* 1) Logo + Description */}
            <div className="space-y-4">
              {/* Replace text with <Image> if you have a logo file */}
              <Image
                src="/assets/TimelySocialsLogo.png"
                width={250}
                height={50}
                alt="logo"
              />
              <p className="text-gray-600 leading-relaxed text-sm">
                TimelySocials helps you seamlessly manage, schedule, crosspost
                and optimize your content across Twitter, Facebook, Instagram,
                TikTok, YouTube, Pinterest, Threads, Telegram, LinkedIn, Bluesky
                social media platforms with our powerful social media management
                tools.
              </p>
            </div>

            {/* 2) Links */}
            <div>
              <h3 className="text-lg font-medium mb-4">Links</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link href="/support" className="hover:text-gray-900">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-gray-900">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/affiliates" className="hover:text-gray-900">
                    Affiliates
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3) Legal */}
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link href="/terms" className="hover:text-gray-900">
                    Terms of Services
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* 4) Social Media Platforms */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                Social Media Platforms
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link
                    href="/facebook-scheduler"
                    className="hover:text-gray-900"
                  >
                    Facebook Scheduler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/instagram-scheduler"
                    className="hover:text-gray-900"
                  >
                    Instagram Scheduler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tiktok-scheduler"
                    className="hover:text-gray-900"
                  >
                    TikTok Scheduler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/linkedin-scheduler"
                    className="hover:text-gray-900"
                  >
                    LinkedIn Scheduler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pinterest-scheduler"
                    className="hover:text-gray-900"
                  >
                    Pinterest Scheduler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/twitter-scheduler"
                    className="hover:text-gray-900"
                  >
                    Twitter/X Scheduler
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-200" />

          {/* Bottom bar */}
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TimelySocials. All rights reserved.
          </div>
        </div>
      </MainLayout>
    </footer>
  );
}
