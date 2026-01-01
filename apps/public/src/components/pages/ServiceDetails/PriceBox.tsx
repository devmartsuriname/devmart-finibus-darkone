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

  const periodLabel = billingPeriod === "monthly" ? "per month" : "per year";

  return (
    <div className="col-md-6 col-lg-4 col-xl-4">
      <div className="single-price-box">
        <h3>{planName}</h3>
        {planSubtitle && <span>{planSubtitle}</span>}
        <h2>
          {formatPrice(priceAmount, currency)}/<sub>{periodLabel}</sub>
        </h2>
        <ul className="feature-list">
          {features.map((feature, index) => (
            <li key={index}>
              <i className="fas fa-check" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="pay-btn">
          <Link onClick={scrollTop} to="/quote">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PriceBox;
