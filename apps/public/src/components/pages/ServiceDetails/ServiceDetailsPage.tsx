import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";
import LetsTalkArea from "../../common/LetsTalkArea";

function ServiceDetailsPage() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Breadcrumb pageName="Service Details" />
      <section className="service-details sec-mar">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="service-details-content">
                <div className="service-thumb">
                  <img src="/images/overview-1.jpg" alt="Service" />
                </div>
                <h3>Web Design & Development</h3>
                <p>
                  Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor.
                  Classe aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos. Praesent nec neque at dolor venenatis
                  consectetur eu quis ex. Donec lacinia placerat felis non aliquam.
                </p>
                <div className="service-details-img">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <img src="/images/overview-1.jpg" alt="Overview 1" />
                    </div>
                    <div className="col-md-6">
                      <img src="/images/overview-2.jpg" alt="Overview 2" />
                    </div>
                  </div>
                </div>
                <h4>Our Approach</h4>
                <p>
                  Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla
                  porttitor. Duis a orci nunc. Suspendisse ac convallis sapien, quis
                  commodo libero. Donec nec dui luctus, pellentesque lacus sed, mollis
                  leo. Proin neque lacus, semper vel ex a, lobortis blandit mi.
                </p>
                <div className="service-features">
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li>
                          <i className="bi bi-check-circle" /> Responsive Design
                        </li>
                        <li>
                          <i className="bi bi-check-circle" /> Modern Technologies
                        </li>
                        <li>
                          <i className="bi bi-check-circle" /> SEO Optimization
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li>
                          <i className="bi bi-check-circle" /> Fast Loading Speed
                        </li>
                        <li>
                          <i className="bi bi-check-circle" /> Cross-Browser Support
                        </li>
                        <li>
                          <i className="bi bi-check-circle" /> 24/7 Support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <h4>Why Choose Us</h4>
                <p>
                  Maecenas ut est in ante imperdiet laoreet eu quis elit. Phasellus
                  porta libero in dolor luctus fringilla. Vestibulum maximus id nulla
                  sit amet sollicitudin. Etiam eu ullamcorper ipsum.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar-widget">
                  <h4>All Services</h4>
                  <ul className="service-list">
                    <li>
                      <Link onClick={scrollTop} to="/service-details">
                        <i>
                          <img src="/images/icons/dash-circle-icon.svg" alt="icon" />
                        </i>
                        Web Design <span>(15)</span>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={scrollTop} to="/service-details">
                        <i>
                          <img src="/images/icons/dash-circle-icon.svg" alt="icon" />
                        </i>
                        App Development <span>(18)</span>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={scrollTop} to="/service-details">
                        <i>
                          <img src="/images/icons/dash-circle-icon.svg" alt="icon" />
                        </i>
                        Software Development <span>(21)</span>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={scrollTop} to="/service-details">
                        <i>
                          <img src="/images/icons/dash-circle-icon.svg" alt="icon" />
                        </i>
                        UI/UX Design <span>(29)</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="widget-banner">
                  <img src="/images/widget-banner.jpg" alt="Banner" />
                  <div className="banner-content">
                    <div className="banner-inner">
                      <h2>Need Help?</h2>
                      <div className="cmn-btn">
                        <Link onClick={scrollTop} to="/contact">
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LetsTalkArea />
    </>
  );
}

export default ServiceDetailsPage;
