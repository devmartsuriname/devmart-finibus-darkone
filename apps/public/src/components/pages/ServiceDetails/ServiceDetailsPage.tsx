import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";
import LetsTalkArea from "../../common/LetsTalkArea";
import ServiceDetailsWrapper from "./ServiceDetailsWrapper";
import ServiceDetailsSeo from "./ServiceDetailsSeo";
import { useServiceDetails } from "../../../hooks/useServiceDetails";
import ErrorPage from "../Error/ErrorPage";

function ServiceDetailsPage() {
  const { slug } = useParams<{ slug: string }>();

  // If no slug provided, redirect to services list
  if (!slug) {
    return <Navigate to="/service" replace />;
  }

  return (
    <ServiceDetailsContent slug={slug} />
  );
}

interface ServiceDetailsContentProps {
  slug: string;
}

function ServiceDetailsContent({ slug }: ServiceDetailsContentProps) {
  const { service, processSteps, pricingPlans, allServices, loading, error, notFound } = useServiceDetails(slug);

  // Show error page for not found
  if (!loading && notFound) {
    return <ErrorPage />;
  }

  // Show error page for errors
  if (!loading && error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loading && service && (
        <ServiceDetailsSeo service={service} />
      )}
      <Breadcrumb pageName={loading ? "Service Details" : (service?.title || "Service Details")} />
      <ServiceDetailsWrapper
        service={service}
        processSteps={processSteps}
        pricingPlans={pricingPlans}
        allServices={allServices}
        loading={loading}
      />
      <LetsTalkArea />
    </>
  );
}

export default ServiceDetailsPage;
