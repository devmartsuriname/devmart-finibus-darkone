import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useProjects } from "../../../hooks/useProjects";

interface PortfolioAreaProps {
  black?: string;
}

// Static fallback projects (Finibus defaults)
const STATIC_PROJECTS = [
  { id: "static-1", category: "Template", title: "Creative Agency", image: "/images/portfolio/portfolio-1.jpg", slug: "project-details" },
  { id: "static-2", category: "UI Kit", title: "E-Shop Ecommerce", image: "/images/portfolio/portfolio-2.jpg", slug: "project-details" },
  { id: "static-3", category: "Software", title: "Desktop Mockup", image: "/images/portfolio/portfolio-3.jpg", slug: "project-details" },
  { id: "static-4", category: "Graphic", title: "Art Deco Cocktails", image: "/images/portfolio/portfolio-4.jpg", slug: "project-details" },
  { id: "static-5", category: "App", title: "Mobile Crypto Wallet", image: "/images/portfolio/portfolio-5.jpg", slug: "project-details" },
  { id: "static-6", category: "Template", title: "Creative Agency", image: "/images/portfolio/portfolio-3.jpg", slug: "project-details" }
];

function PortfolioArea({ black = "" }: PortfolioAreaProps) {
  const { projects: dbProjects } = useProjects();
  
  // Use DB projects or fallback to static (need at least 5 for carousel)
  const displayProjects = dbProjects.length >= 5 
    ? dbProjects.slice(0, 6).map((p, i) => ({
        id: p.id,
        category: p.category,
        title: p.title,
        image: p.image?.public_url || p.featured_image?.public_url || STATIC_PROJECTS[i % 6].image,
        slug: p.slug
      }))
    : STATIC_PROJECTS;

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
            {displayProjects.map((project, index) => (
              <SwiperSlide key={project.id} className="swiper-slide">
                <div className="single-portfolio">
                  <div className="portfolio-data">
                    <a href="#s">
                      <img
                        src={project.image}
                        alt={project.title}
                      />
                    </a>
                  </div>
                  <div className="portfolio-inner">
                    <span>{project.category}</span>
                    <h4>{project.title}</h4>
                    <div className="portfolio-hover">
                      <Link
                        onClick={scrollTop}
                        to={`/project/${project.slug}`}
                        className="case-btn"
                      >
                        Case Study
                      </Link>
                      <a
                        data-lightbox="image1"
                        href={project.image}
                      >
                        {index === 0 || index === 5 ? (
                          <i className="fas fa-search" />
                        ) : (
                          <img
                            alt="search"
                            src="/images/portfolio/search-2.svg"
                          />
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
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
