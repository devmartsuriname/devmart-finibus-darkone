import React from "react";
import Breadcrumb from "../../common/Breadcrumb";
import WhatWeDoArea from "./WhatWeDoArea";
import HowWeWorkArea from "./HowWeWorkArea";
import WhyChooseUsArea from "../../common/WhyChooseUsArea";
import TestimonialArea from "../../common/TestimonialArea";
import LetsTalkArea from "../../common/LetsTalkArea";

function ServicesPage() {
  return (
    <>
      <Breadcrumb pageName="Services" />
      <WhatWeDoArea />
      <HowWeWorkArea />
      <WhyChooseUsArea black="" lable="" />
      <TestimonialArea />
      <LetsTalkArea />
    </>
  );
}

export default ServicesPage;
