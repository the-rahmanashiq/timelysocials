import React from "react";
import GrowingBrand from "./components/GrowingBrand";
import FeaturesSection from "./components/FeaturesSection";
import PromoSection from "./components/PromoSection";
import PricingSection from "./components/PricingSection";
import FAQ from "./components/FAQ";
import ContentPlatform from "./components/ContentPlatform";

const page = () => {
  return (
    <div>
      <PromoSection></PromoSection>
      <GrowingBrand></GrowingBrand>
      <FeaturesSection></FeaturesSection>
      <ContentPlatform></ContentPlatform>
      <PricingSection></PricingSection>
      <FAQ></FAQ>
    </div>
  );
};

export default page;
