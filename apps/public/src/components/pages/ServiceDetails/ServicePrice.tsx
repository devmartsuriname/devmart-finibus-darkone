import React, { useState } from "react";
import PriceBox from "./PriceBox";
import type { ServicePricingPlan } from "../../../types/database";

interface ServicePriceProps {
  pricingPlans: ServicePricingPlan[];
}

function ServicePrice({ pricingPlans }: ServicePriceProps) {
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");

  // Filter plans by billing period
  const monthlyPlans = pricingPlans.filter((p) => p.billing_period === "monthly");
  const yearlyPlans = pricingPlans.filter((p) => p.billing_period === "yearly");

  // If no pricing plans, don't render the section
  if (pricingPlans.length === 0) {
    return null;
  }

  const activePlans = activeTab === "monthly" ? monthlyPlans : yearlyPlans;

  return (
    <section className="pricing-plan sec-mar">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-12 col-lg-6 col-xl-5 or2">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "monthly" ? "active" : ""}`}
                  id="pills-monthly-tab"
                  type="button"
                  role="tab"
                  aria-controls="pills-monthly"
                  aria-selected={activeTab === "monthly"}
                  onClick={() => setActiveTab("monthly")}
                >
                  Pay Monthly
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "yearly" ? "active" : ""}`}
                  id="pills-yearly-tab"
                  type="button"
                  role="tab"
                  aria-controls="pills-yearly"
                  aria-selected={activeTab === "yearly"}
                  onClick={() => setActiveTab("yearly")}
                >
                  Pay Yearly
                </button>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-6 col-xl-5 or1">
            <div className="title black">
              <span>Pricing Plan</span>
              <h2>Service Plans</h2>
            </div>
          </div>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby={`pills-${activeTab}-tab`}
          >
            <div className="row g-4">
              {activePlans.map((plan) => (
                <PriceBox
                  key={plan.id}
                  planName={plan.plan_name}
                  planSubtitle={plan.plan_subtitle}
                  priceAmount={plan.price_amount}
                  currency={plan.currency}
                  billingPeriod={plan.billing_period}
                  features={plan.features}
                  ctaLabel={plan.cta_label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicePrice;
