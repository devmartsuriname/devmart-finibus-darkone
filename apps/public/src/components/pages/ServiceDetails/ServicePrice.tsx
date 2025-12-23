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
    <div className="service-price sec-mar">
      <div className="container">
        <div className="title-wrap">
          <div className="sec-title">
            <span>Pricing</span>
            <h2>Service Plans</h2>
          </div>
        </div>
        <div className="price-tab">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "monthly" ? "active" : ""}`}
                id="pills-monthly-tab"
                type="button"
                role="tab"
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
                aria-selected={activeTab === "yearly"}
                onClick={() => setActiveTab("yearly")}
              >
                Pay Yearly
              </button>
            </li>
          </ul>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" role="tabpanel">
            <div className="row g-4 justify-content-center">
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
    </div>
  );
}

export default ServicePrice;
