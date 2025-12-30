import React from "react";
import { Link } from "react-router-dom";
import { useServices } from "../../../hooks/useServices";

function WhatWeDoArea() {
  const { services, loading, error } = useServices();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Format count with leading zero
  const formatCount = (index: number): string => {
    return String(index + 1).padStart(2, '0');
  };

  // Render loading state with skeleton matching Finibus layout
  if (loading) {
    return (
      <section className="service-area sec-pad">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-12 col-lg-4 col-xl-4">
              <div className="title">
                <span>Our Services</span>
                <h2>Solutions Built for Mission-Critical Operations</h2>
                <div className="cmn-btn">
                  <Link onClick={scrollTop} to="/service">
                    Explore All Services
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-8">
              <div className="row g-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="single-service" style={{ opacity: 0.5 }}>
                      <span className="count">{String(i).padStart(2, '0')}</span>
                      <div className="service-icon">
                        <i>
                          <img src={`/images/icons/service-icon-${i}.png`} alt="loading" />
                        </i>
                      </div>
                      <div className="service-content">
                        <h4>Loading...</h4>
                        <p>Loading service details...</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    console.error('Services fetch error:', error);
  }

  // Split services for Finibus layout: first 4 in right column, remaining 3 at bottom
  const topServices = services.slice(0, 4);
  const bottomServices = services.slice(4, 7);
  
  return (
    <>
      <section className="service-area sec-pad">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-12 col-lg-4 col-xl-4">
              <div className="title">
                <span>Our Services</span>
                <h2>Solutions Built for Mission-Critical Operations</h2>
                <div className="cmn-btn">
                  <Link onClick={scrollTop} to="/service">
                    Explore All Services
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-8">
              <div className="row g-4">
                {topServices.map((service, index) => (
                  <div key={service.id} className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="single-service">
                      <span className="count">{formatCount(index)}</span>
                      <div className="service-icon">
                        <i>
                          {service.icon?.public_url && (
                            <img 
                              src={service.icon.public_url} 
                              alt={service.icon.alt_text || ''} 
                            />
                          )}
                        </i>
                      </div>
                      <div className="service-content">
                        <h4>{service.title}</h4>
                        <p>{service.short_description}</p>
                        <Link onClick={scrollTop} to={`/service-details/${service.slug}`}>
                          Learn More
                          <i><img src="/images/icons/arrow-circle.png" alt="arrow" /></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {bottomServices.map((service, index) => (
              <div key={service.id} className="col-md-6 col-lg-4 col-xl-4">
                <div className="single-service">
                  <span className="count">{formatCount(index + 4)}</span>
                  <div className="service-icon">
                    <i>
                      {service.icon?.public_url && (
                        <img 
                          src={service.icon.public_url} 
                          alt={service.icon.alt_text || ''} 
                        />
                      )}
                    </i>
                  </div>
                  <div className="service-content">
                    <h4>{service.title}</h4>
                    <p>{service.short_description}</p>
                    <Link onClick={scrollTop} to={`/service-details/${service.slug}`}>
                      Learn More
                      <i><img src="/images/icons/arrow-circle.png" alt="arrow" /></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default WhatWeDoArea;
