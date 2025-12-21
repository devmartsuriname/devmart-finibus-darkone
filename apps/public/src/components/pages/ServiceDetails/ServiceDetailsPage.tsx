import React from "react";
import Breadcrumb from "../../common/Breadcrumb";
import LetsTalkArea from "../../common/LetsTalkArea";
import ServiceDetailsWrapper from "./ServiceDetailsWrapper";

function ServiceDetailsPage() {
  return (
    <>
      <Breadcrumb pageName="Service Details" />
      <ServiceDetailsWrapper />
      <LetsTalkArea />
    </>
  );
}

export default ServiceDetailsPage;
