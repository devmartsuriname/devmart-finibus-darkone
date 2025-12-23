import React from "react";
import { Link } from "react-router-dom";

interface PriceBoxProps {
  planName: string;
  planSubtitle?: string | null;
  priceAmount: number;
  currency: string;
  billingPeriod: "monthly" | "yearly";
  features: string[];
  ctaLabel: string;
}

function PriceBox({
  planName,
  planSubtitle,
  priceAmount,
  currency,
  billingPeriod,
  features,
  ctaLabel,
}: PriceBoxProps) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Format price with currency symbol
  const formatPrice = (amount: number, curr: string) => {
    if (curr === "USD") return `$${amount}`;
    if (curr === "EUR") return `€${amount}`;
    if (curr === "GBP") return `£${amount}`;
    return `${curr} ${amount}`;
  };

  const periodLabel = billingPeriod === "monthly" ? "/mo" : "/yr";

  return (
    <div className="col-md-6 col-lg-4">
      <div className="price-card">
        <span className="package-name">{planName}</span>
        {planSubtitle && <p className="package-subtitle">{planSubtitle}</p>}
        <div className="price-count">
          <span className="pack-currency">{formatPrice(priceAmount, currency)}</span>
          <span className="pack-duration">{periodLabel}</span>
        </div>
        <ul className="price-feature">
          {features.map((feature, index) => (
            <li key={index}>
              <i className="bi bi-check-lg" /> {feature}
            </li>
          ))}
        </ul>
        <div className="price-btn">
          <Link onClick={scrollTop} to="/contact">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PriceBox;
