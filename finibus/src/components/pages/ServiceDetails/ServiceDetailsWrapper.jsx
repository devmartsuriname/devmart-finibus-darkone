import React from "react";
import { Link } from "react-router-dom";
function ServiceDetailsWrapper() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <section className="service-details sec-mar">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8 col-xl-8 or2">
              <div className="signle-service-details">
                <h3>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/icons/service-details-icon.svg"
                    }
                    alt="images"
                  />
                  Web Design
                </h3>
                <p>
                  In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis
                  finibus, metus sapien venenatis orci,in eget lacinia magna
                  justo vehicula metus. Morbi sit amet erat faucibus, sagittis
                  libero sed, thatenigr condimentum tortor. Aenean ac nunc
                  dolor. Quisque vestibulum mollis nisi, vel dictum nisi. nangol
                  Vestibulum tempor tristique neque non pretium. Etiam leo
                  risus, consectetur sagittis ullamcorper scelerisque, blandit
                  vitae sem. Etiam semper enim sapien, nec consequat lectus
                  pellentesque sit amet. Curabitur viverra ac tortor a
                  porttitor. Donec tristique, dui at molestie facilisis, justo
                  dolor on dapibus urna, sit amet viverra elit neque a
                  lectus.Etiam semper enim sapien, nec consequat lectus
                  pellentesque sit amet.Fusce mollis faucibus malesuada.
                  Curabitur et enim auctor, rhoncus elit then fermentum, luctus
                  tortor. Curabitur quam nisi, ornare elementum tellus eget,
                  nangol Vestibulum tempor tristique neque non pretium. Etiam
                  leo risus, consectetur sagittis ullamcorper scelerisque,
                  blandit vitae sem. Etiam semper enim sapien, nec consequat
                  lectus pellentesque sit amet. Curabitur viverra ac tortor a
                  porttitor. Donec tristique, dui at molestie facilisis, justo
                  dolor on dapibus urna, sit amet viverra elit neque a lectus.
                  luctus maximus fore lectus. Sed egestas facilisis convallis.
                  Proin dapibus magna vitae dolor accumsan, a egestas velitEtiam
                  semper enim sapien.
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
                    placeholder="Search Here"
                  />
                  <button type="submit">
                    <i className="bi bi-search" />
                  </button>
                </form>
              </div>
              <div className="sidebar-widget">
                <h4>Services</h4>
                <ul className="service-list">
                  <li>
                    <Link
                      onClick={scrollTop}
                      to={`${process.env.PUBLIC_URL}/service-details`}
                    >
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/dash-circle-icon.svg"
                          }
                          alt="images"
                        />
                      </i>
                      Web Design <span>(15)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={scrollTop}
                      to={`${process.env.PUBLIC_URL}/service-details`}
                    >
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/dash-circle-icon.svg"
                          }
                          alt="images"
                        />
                      </i>
                      Apps Development <span>(18)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={scrollTop}
                      to={`${process.env.PUBLIC_URL}/service-details`}
                    >
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/dash-circle-icon.svg"
                          }
                          alt="images"
                        />
                      </i>
                      Software Development <span>(21)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={scrollTop}
                      to={`${process.env.PUBLIC_URL}/service-details`}
                    >
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/dash-circle-icon.svg"
                          }
                          alt="images"
                        />
                      </i>
                      Motion Graphics <span>(25)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={scrollTop}
                      to={`${process.env.PUBLIC_URL}/service-details`}
                    >
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/dash-circle-icon.svg"
                          }
                          alt="images"
                        />
                      </i>
                      UI/UX Design <span>(29)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={scrollTop}
                      to={`${process.env.PUBLIC_URL}/service-details`}
                    >
                      <i>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/icons/dash-circle-icon.svg"
                          }
                          alt="images"
                        />
                      </i>
                      Graphic Design <span>(31)</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="single-service-work-process">
            <h3>How We Work in our services</h3>
            <div className="single-step">
              <div className="row">
                <div className="col-md-8 col-xl-8 or2">
                  <div className="step">
                    <div className="step-count">
                      <span>01</span>
                    </div>
                    <h4>Wireframe &amp; Design</h4>
                    <p>
                      In euismod lacinia rhoncus. Morbi ornare, lectus quis
                      mattis finibus, metus sapien venenatis orci, eget lacinia
                      magna justo vehiculametus. Morbi sit amet erat faucibus,
                      sagittis libero sed, condimentum tortor. Aenean ac nunc
                      dolor. Quisque vestibulum mollis nisi, vel dictum nisi.
                      Vestibulum tempor tristique neque non pretium. Etiam leo
                      risus, consectetur sagittis ullamcorper scelerisque,
                      blandit vitae sem.
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-xl-4 or1">
                  <div className="step-img">
                    <img
                      src={process.env.PUBLIC_URL + "/images/step-1.png"}
                      alt="images"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="single-step">
              <div className="row">
                <div className="col-md-4 col-xl-4">
                  <div className="step-img">
                    <img
                      src={process.env.PUBLIC_URL + "/images/step-2.jpg"}
                      alt="images"
                    />
                  </div>
                </div>
                <div className="col-md-8 col-xl-8">
                  <div className="step">
                    <div className="step-count">
                      <span>02</span>
                    </div>
                    <h4>Developing</h4>
                    <p>
                      In euismod lacinia rhoncus. Morbi ornare, lectus quis
                      mattis finibus, metus sapien venenatis orci, eget lacinia
                      magna justo vehiculametus. Morbi sit amet erat faucibus,
                      sagittis libero sed, condimentum tortor. Aenean ac nunc
                      dolor. Quisque vestibulum mollis nisi, vel dictum nisi.
                      Vestibulum tempor tristique neque non pretium. Etiam leo
                      risus, consectetur sagittis ullamcorper scelerisque,
                      blandit vitae sem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="single-step">
              <div className="row">
                <div className="col-md-8 col-xl-8 or2">
                  <div className="step">
                    <div className="step-count">
                      <span>03</span>
                    </div>
                    <h4>Checkup &amp; Launch</h4>
                    <p>
                      In euismod lacinia rhoncus. Morbi ornare, lectus quis
                      mattis finibus, metus sapien venenatis orci, eget lacinia
                      magna justo vehiculametus. Morbi sit amet erat faucibus,
                      sagittis libero sed, condimentum tortor. Aenean ac nunc
                      dolor. Quisque vestibulum mollis nisi, vel dictum nisi.
                      Vestibulum tempor tristique neque non pretium. Etiam leo
                      risus, consectetur sagittis ullamcorper scelerisque,
                      blandit vitae sem.
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-xl-4 or1">
                  <div className="step-img">
                    <img
                      src={process.env.PUBLIC_URL + "/images/step-3.jpg"}
                      alt="images"
                    />
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

export default ServiceDetailsWrapper;
