import React from "react";
import { Link } from "react-router-dom";
import ServicePrice from "./ServicePrice";
import type { Service, ServiceProcessStep, ServicePricingPlan, Media } from "../../../types/database";

interface ServiceWithIcon extends Service {
  icon: Media | null;
}

interface ProcessStepWithImage extends ServiceProcessStep {
  image: Media | null;
}

interface ServiceDetailsWrapperProps {
  service: ServiceWithIcon | null;
  processSteps: ProcessStepWithImage[];
  pricingPlans: ServicePricingPlan[];
  allServices: ServiceWithIcon[];
  loading: boolean;
}

function ServiceDetailsWrapper({
  service,
  processSteps,
  pricingPlans,
  allServices,
  loading,
}: ServiceDetailsWrapperProps) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="service-details sec-mar">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8 col-xl-8 or2">
              <div className="signle-service-details">
                <h3 className="placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h3>
                <p className="placeholder-glow">
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-8"></span>
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-4 or1">
              <div className="sidebar-widget">
                <h4>Our Services</h4>
                <ul className="service-list placeholder-glow">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i}>
                      <span className="placeholder col-10"></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="service-details sec-mar">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8 col-xl-8 or2">
              <div className="signle-service-details">
                <h3>
                  {service?.icon?.public_url && (
                    <img
                      src={service.icon.public_url}
                      alt={service.icon.alt_text || service.title}
                    />
                  )}
                  {service?.title || "Service"}
                </h3>
                <p>
                  {service?.full_description || service?.short_description || ""}
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-4 or1">
              <div className="sidebar-search">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  action="#"
                  method="post"
                >
                  <input
                    type="search"
                    name="search"
                    placeholder="Search (coming soon)"
                  />
                  <button type="submit">
                    <i className="bi bi-search" />
                  </button>
                </form>
              </div>
              <div className="sidebar-widget">
                <h4>Our Services</h4>
                <ul className="service-list">
                  {allServices.map((svc) => (
                    <li key={svc.id}>
                      <Link onClick={scrollTop} to={`/service-details/${svc.slug}`}>
                        <i>
                          <img
                            src="/images/icons/dash-circle-icon.svg"
                            alt="service icon"
                          />
                        </i>
                        {svc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Process Steps Section */}
          {processSteps.length > 0 && (
            <div className="single-service-work-process">
              <h3>Our Delivery Process</h3>
              {processSteps.map((step, index) => {
                const isOdd = step.step_number % 2 === 1;
                const stepNumber = String(step.step_number).padStart(2, "0");

                return (
                  <div className="single-step" key={step.id}>
                    <div className="row">
                      {isOdd ? (
                        <>
                          {/* Odd steps: content left, image right */}
                          <div className="col-md-8 col-xl-8 or2">
                            <div className="step">
                              <div className="step-count">
                                <span>{stepNumber}</span>
                              </div>
                              <h4>{step.title}</h4>
                              <p>{step.description}</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-xl-4 or1">
                            {step.image?.public_url && (
                              <div className="step-img">
                                <img
                                  src={step.image.public_url}
                                  alt={step.image.alt_text || step.title}
                                />
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Even steps: image left, content right */}
                          <div className="col-md-4 col-xl-4">
                            {step.image?.public_url && (
                              <div className="step-img">
                                <img
                                  src={step.image.public_url}
                                  alt={step.image.alt_text || step.title}
                                />
                              </div>
                            )}
                          </div>
                          <div className="col-md-8 col-xl-8">
                            <div className="step">
                              <div className="step-count">
                                <span>{stepNumber}</span>
                              </div>
                              <h4>{step.title}</h4>
                              <p>{step.description}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section - Phase 10B: Conditional render based on Admin toggle */}
      {service?.show_pricing && (
        <ServicePrice 
          pricingPlans={pricingPlans}
          monthlyEnabled={service.pricing_monthly_enabled}
          yearlyEnabled={service.pricing_yearly_enabled}
        />
      )}
    </>
  );
}

export default ServiceDetailsWrapper;
