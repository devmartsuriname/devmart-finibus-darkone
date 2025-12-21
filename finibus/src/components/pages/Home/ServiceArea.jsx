import React from "react";

import { Link } from "react-router-dom";
function ServiceArea() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <section className="service-area sec-pad">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-4">
              <div className="title">
                <span>what we do</span>
                <h2>we work performed for client happy.</h2>
                <div className="cmn-btn">
                  <Link
                    onClick={scrollTop}
                    to={`${process.env.PUBLIC_URL}/service`}
                  >
                    view all services
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-8">
              <div className="row g-4">
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div className="single-service">
                    <span className="count">01</span>
                    <div className="service-icon">
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/service-icon-1.png"
                          }
                          alt="images"
                        />
                      </i>
                    </div>
                    <div className="service-content">
                      <h4>web design</h4>
                      <p>
                        Fusce ornare mauris nisi, id fringilla turpis vehicula
                        justo lectus, ultricies nec sem
                      </p>
                      <Link
                        onClick={scrollTop}
                        to={`${process.env.PUBLIC_URL}/service-details`}
                      >
                        read more
                        <i>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/icons/arrow-circle.png"
                            }
                            alt="images"
                          />
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div className="single-service">
                    <span className="count">02</span>
                    <div className="service-icon">
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/service-icon-2.png"
                          }
                          alt="images"
                        />
                      </i>
                    </div>
                    <div className="service-content">
                      <h4>App design</h4>
                      <p>
                        Maecenas ut est in ante imperdiet laoreet eu quis elit
                        laoreet Phasellus Door
                      </p>
                      <Link
                        onClick={scrollTop}
                        to={`${process.env.PUBLIC_URL}/service-details`}
                      >
                        read more
                        <i>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/icons/arrow-circle.png"
                            }
                            alt="images"
                          />
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div className="single-service">
                    <span className="count">03</span>
                    <div className="service-icon">
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/service-icon-3.png"
                          }
                          alt="images"
                        />
                      </i>
                    </div>
                    <div className="service-content">
                      <h4>Developing</h4>
                      <p>
                        Etiam eu ullamcorper ipsum. Pellentesque eu ipsum luctus
                        libero euismod
                      </p>
                      <Link
                        onClick={scrollTop}
                        to={`${process.env.PUBLIC_URL}/service-details`}
                      >
                        read more
                        <i>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/icons/arrow-circle.png"
                            }
                            alt="images"
                          />
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div className="single-service">
                    <span className="count">04</span>
                    <div className="service-icon">
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/service-icon-4.png"
                          }
                          alt="images"
                        />
                      </i>
                    </div>
                    <div className="service-content">
                      <h4>Graphic design</h4>
                      <p>
                        Quisque in massa nunc. Etiam blandit tortor nisl, auctor
                        vulputate felis convallis at.
                      </p>
                      <Link
                        onClick={scrollTop}
                        to={`${process.env.PUBLIC_URL}/service-details`}
                      >
                        read more
                        <i>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/icons/arrow-circle.png"
                            }
                            alt="images"
                          />
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceArea;
