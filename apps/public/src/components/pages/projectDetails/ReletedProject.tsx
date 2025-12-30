/**
 * ReletedProject Component
 * 
 * Migrated from Finibus to React 18 + Swiper v8+
 * Phase 5.4: Wired to Supabase data
 * Note: SRLWrapper removed (not React 18 compatible), slider structure preserved
 */

import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ProjectWithMedia } from "../../../hooks/useProjects";

interface ReletedProjectProps {
  projects: ProjectWithMedia[];
  loading: boolean;
}

function ReletedProject({ projects, loading }: ReletedProjectProps) {
  const portfolioRelatedSlide = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  };

  // Don't render if no related projects and not loading
  if (!loading && projects.length === 0) {
    return null;
  }

  // Loading state - show placeholder slides
  if (loading) {
    return (
      <>
        <div className="releted-project">
          <h3>Related Project</h3>
          <div className="swiper releted-project-slider">
            <Swiper 
              {...portfolioRelatedSlide} 
              modules={[Navigation, Autoplay]}
              className="swiper-wrapper"
            >
              {[1, 2, 3].map((i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <div className="single-portfolio">
                    <div className="portfolio-data">
                      <div style={{ height: '200px', background: '#f0f0f0' }}></div>
                    </div>
                    <div className="portfolio-inner">
                      <span>Loading...</span>
                      <h4>Loading...</h4>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-next" />
            <div className="swiper-button-prev" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="releted-project">
        <h3>Related Project</h3>
        <div className="swiper releted-project-slider">
          <Swiper 
            {...portfolioRelatedSlide} 
            modules={[Navigation, Autoplay]}
            className="swiper-wrapper"
          >
            {projects.map((project) => {
              // Determine image URL - use image (thumbnail) if available, fallback to featured_image
              const imageUrl = project.image?.public_url || project.featured_image?.public_url;
              const imageAlt = project.image?.alt_text || project.featured_image?.alt_text || project.title;
              
              return (
                <SwiperSlide key={project.id} className="swiper-slide">
                  <div className="single-portfolio">
                    <div className="portfolio-data">
                      <Link to={`/project-details/${project.slug}`}>
                        {imageUrl ? (
                          <img src={imageUrl} alt={imageAlt} />
                        ) : (
                          <div style={{ height: '200px', background: '#f0f0f0' }}></div>
                        )}
                      </Link>
                    </div>
                    <div className="portfolio-inner">
                      <span>{project.category}</span>
                      <h4>{project.heading || project.title}</h4>
                      <div className="portfolio-hover">
                        <Link
                          to={`/project-details/${project.slug}`}
                          className="case-btn"
                        >
                          View Project
                        </Link>
                        {imageUrl && (
                          <a
                            data-lightbox="image1"
                            href={imageUrl}
                          >
                            <img
                              src="/images/portfolio/search-2.svg"
                              alt="images"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </div>
      </div>
    </>
  );
}

export default ReletedProject;
