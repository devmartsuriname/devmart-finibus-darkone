import React from "react";
import { Link } from "react-router-dom";

function BannerWiget() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  
  return (
    <>
      <div className="widget-banner">
        <img src="/images/widget-banner.jpg" alt="bannerWiget" />
        <div className="banner-content">
          <div className="banner-inner">
            <h2>Ready to Build Something Great?</h2>
            <div className="cmn-btn">
              <Link onClick={scrollTop} to="/contact">
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerWiget;
