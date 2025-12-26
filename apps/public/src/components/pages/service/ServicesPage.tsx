import React from "react";
import Breadcrumb from "../../common/Breadcrumb";
import LetsTalkArea from "../../common/LetsTalkArea";
import HowWeWorkArea from "./HowWeWorkArea";
import WhatWeDoArea from "./WhatWeDoArea";

function ServicesPage() {
  return (
    <>
      <Breadcrumb pageName="Service" />
      <WhatWeDoArea />
      <HowWeWorkArea />
      {/* Pricing removed per Phase 10A - pricing now only on Service Detail pages */}
      <LetsTalkArea />
    </>
  );
}

export default ServicesPage;
