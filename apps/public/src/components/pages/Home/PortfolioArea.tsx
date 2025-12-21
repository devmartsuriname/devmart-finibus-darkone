import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

interface PortfolioAreaProps {
  black?: string;
}

function PortfolioArea({ black = "" }: PortfolioAreaProps) {
  const portfolioSlider = {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1400: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    },
  };
  
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <>
      <div className={`portfolio-area sec-mar-top ${black}`}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-7 col-xl-5">
              <div className={`title ${black}`}>
                <span>Case Study</span>
                <h2>A diversified resilient portfolio.</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper portfolio-slider">
          <Swiper
            modules={[Navigation, Autoplay]}
            {...portfolioSlider}
            pagination={{
              type: "bullets",
              clickable: true,
            }}
            className="swiper-wrapper"
          >
            <SwiperSlide className="swiper-slide">
              <div className="single-portfolio">
                <div className="portfolio-data">
                  <a href="/">
                    <img
                      src="/images/portfolio/portfolio-1.jpg"
                      alt="images"
                    />
                  </a>
                </div>
                <div className="portfolio-inner">
                  <span>Template</span>
                  <h4>Creative Agency</h4>
                  <div className="portfolio-hover">
                    <Link
                      onClick={scrollTop}
                      to="/project-details"
                      className="case-btn"
                    >
                      Case Study
                    </Link>
                    <a
                      data-lightbox="image1"
                      href="/images/portfolio/portfolio-1.jpg"
                    >
                      <i className="fas fa-search" />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-portfolio">
                <div className="portfolio-data">
                  <a href="#s">
                    <img
                      src="/images/portfolio/portfolio-2.jpg"
                      alt="images"
                    />
                  </a>
                </div>
                <div className="portfolio-inner">
                  <span>UI Kit</span>
                  <h4>E-Shop Ecommerce</h4>
                  <div className="portfolio-hover">
                    <Link
                      onClick={scrollTop}
                      to="/project-details"
                      className="case-btn"
                    >
                      Case Study
                    </Link>
                    <a
                      data-lightbox="image1"
                      href="/images/portfolio/portfolio-2.jpg"
                    >
                      <img
                        alt="images"
                        src="/images/portfolio/search-2.svg"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-portfolio">
                <div className="portfolio-data">
                  <a href="#s">
                    <img
                      src="/images/portfolio/portfolio-3.jpg"
                      alt="images"
                    />
                  </a>
                </div>
                <div className="portfolio-inner">
                  <span>Software</span>
                  <h4>Desktop Mockup</h4>
                  <div className="portfolio-hover">
                    <Link
                      onClick={scrollTop}
                      to="/project-details"
                      className="case-btn"
                    >
                      Case Study
                    </Link>
                    <a
                      data-lightbox="image1"
                      href="/images/portfolio/portfolio-3.jpg"
                    >
                      <img
                        alt="images"
                        src="/images/portfolio/search-2.svg"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-portfolio">
                <div className="portfolio-data">
                  <a href="#s">
                    <img
                      src="/images/portfolio/portfolio-4.jpg"
                      alt="images"
                    />
                  </a>
                </div>
                <div className="portfolio-inner">
                  <span>Graphic</span>
                  <h4>Art Deco Cocktails</h4>
                  <div className="portfolio-hover">
                    <Link
                      onClick={scrollTop}
                      to="/project-details"
                      className="case-btn"
                    >
                      Case Study
                    </Link>
                    <a
                      data-lightbox="image1"
                      href="/images/portfolio/portfolio-4.jpg"
                    >
                      <img
                        alt="images"
                        src="/images/portfolio/search-2.svg"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-portfolio">
                <div className="portfolio-data">
                  <a href="#s">
                    <img
                      src="/images/portfolio/portfolio-5.jpg"
                      alt="images"
                    />
                  </a>
                </div>
                <div className="portfolio-inner">
                  <span>App</span>
                  <h4>Mobile Crypto Wallet</h4>
                  <div className="portfolio-hover">
                    <Link
                      onClick={scrollTop}
                      to="/project-details"
                      className="case-btn"
                    >
                      Case Study
                    </Link>
                    <a
                      data-lightbox="image1"
                      href="/images/portfolio/portfolio-5.jpg"
                    >
                      <img
                        alt="images"
                        src="/images/portfolio/search-2.svg"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-portfolio">
                <div className="portfolio-data">
                  <a href="#s">
                    <img
                      src="/images/portfolio/portfolio-3.jpg"
                      alt="images"
                    />
                  </a>
                </div>
                <div className="portfolio-inner">
                  <span>Template</span>
                  <h4>Creative Agency</h4>
                  <div className="portfolio-hover">
                    <Link
                      onClick={scrollTop}
                      to="/project-details"
                      className="case-btn"
                    >
                      Case Study
                    </Link>
                    <a
                      data-lightbox="image1"
                      href="/images/portfolio/portfolio-3.jpg"
                    >
                      <i className="fas fa-search" />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="swiper-pagination" />
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </div>
      </div>
    </>
  );
}

export default PortfolioArea;
