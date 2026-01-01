import React from "react";
import { Link } from "react-router-dom";

interface PriceBoxProps {
  cartTitle: string;
  cartSubtitle: string;
  price: string;
  month: string;
  featurePages: string;
  featurePpc: string;
  seo: string;
  facebookComplaigns: string;
  videoCompligns: string;
}

function PriceBox(props: PriceBoxProps) {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="col-md-6 col-lg-4 col-xl-4">
        <div className="single-price-box">
          <h3>{props.cartTitle}</h3>
          <span>{props.cartSubtitle}</span>
          <h2>
            ${props.price}/<sub>Per {props.month}</sub>
          </h2>
          <ul className="feature-list">
            <li>
              <i className="fas fa-check" />
              {props.featurePages}
            </li>
            <li>
              <i className="fas fa-check" />
              {props.featurePpc}
            </li>
            <li>
              <i className="fas fa-check" />
              {props.seo}
            </li>
            <li>
              <i className="fas fa-check" />
              {props.facebookComplaigns}
            </li>
            <li>
              <i className="fas fa-check" />
              {props.videoCompligns}
            </li>
          </ul>
          <div className="pay-btn">
            <Link onClick={scrollTop} to="/quote">
              Pay Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PriceBox;
