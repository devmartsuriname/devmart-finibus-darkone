import React from "react";
import Breadcrumb from "../../common/Breadcrumb";
import InsideStoryArea from "./InsideStoryArea";
import LatesNewsArea from "./LatesNewsArea";
import WhyChooseUsArea from "../../common/WhyChooseUsArea";
import TestimonialArea from "../../common/TestimonialArea";
import LetsTalkArea from "../../common/LetsTalkArea";

function AboutPage() {
  return (
    <>
      <Breadcrumb pageName="About Us" />
      <InsideStoryArea />
      <WhyChooseUsArea black="black" lable="" />
      <TestimonialArea />
      <LatesNewsArea />
      <LetsTalkArea />
    </>
  );
}

export default AboutPage;
