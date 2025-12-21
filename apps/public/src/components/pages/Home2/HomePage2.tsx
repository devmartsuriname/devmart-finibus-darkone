import React from "react";
import HeroArea from "../Home/HeroArea";
import ServiceArea from "../Home/ServiceArea";
import AboutArea from "../Home/AboutArea";
import OurPartnerArea from "../Home/OurPartnerArea";
import PortfolioArea from "../Home/PortfolioArea";
import NewsLatterArea from "../Home/NewsLatterArea";
import TestimonialArea from "../../common/TestimonialArea";
import LetsTalkArea from "../../common/LetsTalkArea";
import WhyChooseUsArea from "../../common/WhyChooseUsArea";

function HomePage2() {
  return (
    <div className="dark-theme">
      <HeroArea />
      <ServiceArea />
      <AboutArea black="" light="" />
      <OurPartnerArea />
      <PortfolioArea black="" />
      <WhyChooseUsArea black="" lable="" />
      <TestimonialArea />
      <NewsLatterArea black="" />
      <LetsTalkArea />
    </div>
  );
}

export default HomePage2;
