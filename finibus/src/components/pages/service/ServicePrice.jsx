import React from "react";
import PriceBox from "./PriceBox";

function ServicePrice() {
  return (
    <>
      <section className="pricing-plan sec-mar">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-lg-6 col-xl-5 or2">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Pay Monthly
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Pay Yearly
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-6 col-xl-5 or1">
              <div className="title black">
                <span>Pricing Plan</span>
                <h2>Join Now For Your Business.</h2>
              </div>
            </div>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="row g-4">
                <PriceBox
                  month="month"
                  cartTitle="Small Business"
                  cartSubtitle="Single Business"
                  price="150.99"
                  featurePages="10 Pages Responsive Website "
                  featurePpc="5PPC Campaigns "
                  seo="10 SEO Keyword"
                  facebookComplaigns="5 Facebook Camplaigns "
                  videoCompligns="2 Video Camplaigns"
                />
                <PriceBox
                  month="month"
                  cartTitle="Professional"
                  cartSubtitle="Small team "
                  price="99.99"
                  featurePages="15 Pages Responsive Website "
                  featurePpc="10 PPC Campaigns "
                  seo="15 SEO Keyword"
                  facebookComplaigns="8 Facebook Camplaigns "
                  videoCompligns="5 Video Camplaigns"
                />
                <PriceBox
                  month="month"
                  cartTitle="Small Business"
                  cartSubtitle="Single Business"
                  price="350"
                  featurePages="20 Pages Responsive Website "
                  featurePpc="15 PPC Campaigns "
                  seo="20 SEO Keyword"
                  facebookComplaigns="15 Facebook Camplaigns "
                  videoCompligns="12 Video Camplaigns"
                />
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="row g-4">
                <PriceBox
                  month="year"
                  cartTitle="Professional"
                  cartSubtitle="Small team "
                  price="99.99"
                  featurePages="116 Pages Responsive Website "
                  featurePpc="12 PPC Campaigns "
                  seo="18 SEO Keyword"
                  facebookComplaigns="8 Facebook Camplaigns "
                  videoCompligns="7 Video Camplaigns"
                />
                <PriceBox
                  month="year"
                  cartTitle="Small Business"
                  cartSubtitle="Single Business"
                  price="150"
                  featurePages="20 Pages Responsive Website "
                  featurePpc="15 PPC Campaigns "
                  seo="20 SEO Keyword"
                  facebookComplaigns="15 Facebook Camplaigns "
                  videoCompligns="11 Video Camplaigns"
                />
                <PriceBox
                  month="year"
                  cartTitle="Small Business"
                  cartSubtitle="Single Business"
                  price="130"
                  featurePages="20 Pages Responsive Website "
                  featurePpc="15 PPC Campaigns "
                  seo="50 SEO Keyword"
                  facebookComplaigns="15 Facebook Camplaigns "
                  videoCompligns="12 Video Camplaigns"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicePrice;
