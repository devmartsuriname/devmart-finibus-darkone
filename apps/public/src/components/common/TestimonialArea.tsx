/**
 * TestimonialArea Component
 * 
 * Migrated from Finibus to React 18 + Swiper v11
 * Phase 7: Wired to testimonials table
 */

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useTestimonials, TestimonialWithMedia } from '../../hooks/useTestimonials'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Static fallback testimonials (Finibus defaults)
const STATIC_TESTIMONIALS = [
  {
    id: "static-1",
    author_name: "Savannah Nguyen",
    author_title: "Executive CEO",
    quote: "Curabitur magna nisi, egestas quis est in, finibus pulvinar ipsum. Nunc sit amet odio interdum, maximus dolor quis, ullamcorper lectus. Mauris vitae faucibus libero. Curabitur eu convallis purus. Nunc accumsan diam in arcu pellentesque sagittis. Curabitur dolor odio, aliquam vitae noday backowner condimentum this fire ongon then only on",
    rating: 5,
    avatar_url: "/images/client.jpg"
  },
  {
    id: "static-2",
    author_name: "Nailong Jeso",
    author_title: "CTO Founder",
    quote: "Curabitur magna nisi, egestas quis est in, finibus pulvinar ipsum. Nunc sit amet odio interdum, maximus dolor quis, ullamcorper lectus. Mauris vitae faucibus libero. Curabitur eu convallis purus. Nunc accumsan diam in arcu pellentesque sagittis. Curabitur dolor odio, aliquam vitae noday backowner condimentum this fire ongon then only on",
    rating: 5,
    avatar_url: "/images/client-2.jpg"
  },
  {
    id: "static-3",
    author_name: "Gautam Yamni",
    author_title: "Designer Head",
    quote: "Curabitur magna nisi, egestas quis est in, finibus pulvinar ipsum. Nunc sit amet odio interdum, maximus dolor quis, ullamcorper lectus. Mauris vitae faucibus libero. Curabitur eu convallis purus. Nunc accumsan diam in arcu pellentesque sagittis. Curabitur dolor odio, aliquam vitae noday backowner condimentum this fire ongon then only on",
    rating: 5,
    avatar_url: "/images/client-3.jpg"
  }
];

function TestimonialArea() {
  const { testimonials: dbTestimonials } = useTestimonials();
  
  // Use DB testimonials or fallback to static
  const displayTestimonials = dbTestimonials.length > 0 
    ? dbTestimonials.map((t, i) => ({
        id: t.id,
        author_name: t.author_name,
        author_title: t.author_title || "Client",
        quote: t.quote,
        rating: t.rating || 5,
        avatar_url: t.avatar?.public_url || STATIC_TESTIMONIALS[i % 3].avatar_url
      }))
    : STATIC_TESTIMONIALS;

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <i key={i} className="fas fa-star" />
    ));
  };

  return (
    <section className="testimonial-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="swiper testimonial-slider">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                loop={true}
                speed={2000}
                autoplay={{
                  delay: 5000,
                }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{
                  type: 'fraction',
                }}
                className="swiper-wrapper"
              >
                {displayTestimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="swiper-slide">
                    <div className="testimonial-content">
                      <div className="quote">
                        <i className="fas fa-quote-left" />
                      </div>
                      <div className="client-info">
                        <div className="client-pic">
                          <img src={testimonial.avatar_url} alt={testimonial.author_name} />
                        </div>
                        <div className="client-details">
                          <h4>{testimonial.author_name}</h4>
                          <span>{testimonial.author_title}</span>
                        </div>
                      </div>
                      <p>
                        <i className="fas fa-quote-left" /> {testimonial.quote}{' '}
                        <i className="fas fa-quote-right" />
                      </p>
                      <div className="rating">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-button-next" />
              <div className="swiper-button-prev" />
              <div className="swiper-pagination" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialArea
