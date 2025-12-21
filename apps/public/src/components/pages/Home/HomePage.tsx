import React from "react";
import HeroArea from "./HeroArea";
import ServiceArea from "./ServiceArea";
import AboutArea from "./AboutArea";
import OurPartnerArea from "./OurPartnerArea";
import PortfolioArea from "./PortfolioArea";
import NewsLatterArea from "./NewsLatterArea";
import TestimonialArea from "../../common/TestimonialArea";
import LetsTalkArea from "../../common/LetsTalkArea";
import WhyChooseUsArea from "../../common/WhyChooseUsArea";

function HomePage() {
  return (
    <>
      <HeroArea />
      <ServiceArea />
      <AboutArea black="black" light="dark" />
      <OurPartnerArea />
      <PortfolioArea black="black" />
      <WhyChooseUsArea black="black" lable="" />
      <TestimonialArea />
      <NewsLatterArea black="black" />
      <LetsTalkArea />
    </>
  );
}

export default HomePage;
