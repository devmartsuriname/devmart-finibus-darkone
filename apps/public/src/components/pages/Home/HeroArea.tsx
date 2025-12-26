import React from "react";
import { Link } from "react-router-dom";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { useHomepageSettings, HeroSlide } from "../../../hooks/useHomepageSettings";
import { usePublicSettings } from "../../../hooks/usePublicSettings";

// Static fallback slides (Finibus defaults)
const STATIC_SLIDES: HeroSlide[] = [
  {
    image: "/images/hero-slider-1.jpg",
    subtitle: "Creative",
    title_prefix: "Best solution for your",
    title_highlight: "Business.",
    description: "Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla an Duis a orci nunc. Suspendisse ac convallis sapien, quis commodosani libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.",
    cta1_label: "About us",
    cta1_url: "/about",
    cta2_label: "How we work",
    cta2_url: "/project-details"
  },
  {
    image: "/images/hero-slider-2.png",
    subtitle: "Creative",
    title_prefix: "Best solution for your",
    title_highlight: "Finances.",
    description: "Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla an Duis a orci nunc. Suspendisse ac convallis sapien, quis commodosani libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.",
    cta1_label: "About us",
    cta1_url: "/about",
    cta2_label: "How we work",
    cta2_url: "/project-details"
  },
  {
    image: "/images/hero-slider-3.png",
    subtitle: "Creative",
    title_prefix: "Best solution for your",
    title_highlight: "Markets.",
    description: "Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla an Duis a orci nunc. Suspendisse ac convallis sapien, quis commodosani libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.",
    cta1_label: "About us",
    cta1_url: "/about",
    cta2_label: "How we work",
    cta2_url: "/project-details"
  }
];

function HeroArea() {
  const { data: homepageData } = useHomepageSettings();
  const { settings } = usePublicSettings();
  
  // Use DB slides or fallback to static
  const slides = homepageData?.hero?.slides?.length ? homepageData.hero.slides : STATIC_SLIDES;
  
  // Social links from settings with fallbacks
  const facebookUrl = settings.facebook_url || "https://www.facebook.com/";
  const instagramUrl = settings.instagram_url || "https://www.instagram.com/";
  const linkedinUrl = settings.linkedin_url || "https://www.linkedin.com/";

  const HeroSlider = {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 0,
    loop: true,
    autoplay: true,
    effect: "fade" as const,
    centeredSlides: true,
    roundLengths: true,
    fadeEffect: {
      crossFade: true,
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
      <section className="hero-area">
        <div className="swiper hero-slider">
          <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            pagination={{
              type: "bullets",
              clickable: true,
            }}
            {...HeroSlider}
            className="swiper-wrapper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="hero-content-wrapper">
                        <div className="hero-content-wrap">
                          <div className="hero-content-img">
                            <img
                              src={slide.image}
                              alt="images"
                            />
                          </div>
                          <div className="hero-content">
                            <h2>{slide.subtitle}</h2>
                            <h1>
                              {slide.title_prefix} <span>{slide.title_highlight}</span>
                            </h1>
                            <p>{slide.description}</p>
                            <Link
                              onClick={scrollTop}
                              to={slide.cta1_url}
                              className="about-btn"
                            >
                              {slide.cta1_label}
                            </Link>
                            <Link
                              onClick={scrollTop}
                              to={slide.cta2_url}
                              className="work-btn"
                            >
                              {slide.cta2_label}
                            </Link>
                            <div className="slider-num">
                              <span>{String(index + 1).padStart(2, '0')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination" />
        </div>
        <div className="social-media">
          <ul className="social-list">
            <li>
              <a rel="noopener noreferrer" href={facebookUrl}>
                Facebook
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href={instagramUrl}>
                instagram
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href={linkedinUrl}>
                Linked in
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default HeroArea;
