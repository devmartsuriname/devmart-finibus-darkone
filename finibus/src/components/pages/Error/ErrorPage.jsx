import React from "react";
import { Link } from "react-router-dom";
import LetsTalkArea from "../../common/LetsTalkArea";
function ErrorPage() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <section className="notfound-error">
        <div className="container">
          <div className="error-wrapper">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6 col-xl-6 or2">
                <div className="error-content">
                  <h2>404 Error</h2>
                  <h1>Page not found</h1>
                  <p>
                    Donec bibendum enim ut elit porta ullamcorper. Vestibulum
                    Nai quam nulla, venenatis eget dapibus ac, catali topuny
                    wekemdini iaculis vitae nulla. Morbi mattis nec mi ac
                    mollis.
                  </p>
                  <div className="cmn-btn">
                    <Link onClick={scrollTop} to={"/"}>
                      Back to home
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-6 or1">
                <div className="error-img">
                  <img
                    src={process.env.PUBLIC_URL + "/images/error.png"}
                    alt="error images"
                  />
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

export default ErrorPage;
