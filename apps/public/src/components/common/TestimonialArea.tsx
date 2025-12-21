/**
 * TestimonialArea Component
 * 
 * Migrated from Finibus to React 18 + Swiper v11
 * Updated Swiper import syntax for v11 compatibility
 */

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function TestimonialArea() {
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
                <SwiperSlide className="swiper-slide">
                  <div className="testimonial-content">
                    <div className="quote">
                      <i className="fas fa-quote-left" />
                    </div>
                    <div className="client-info">
                      <div className="client-pic">
                        <img src="/images/client.jpg" alt="Client" />
                      </div>
                      <div className="client-details">
                        <h4>Savannah Nguyen</h4>
                        <span>Executive CEO</span>
                      </div>
                    </div>
                    <p>
                      <i className="fas fa-quote-left" /> Curabitur magna nisi,
                      egestas quis est in, finibus pulvinar ipsum. Nunc sit amet
                      odio interdum, maximus dolor quis, ullamcorper lectus.
                      Mauris vitae faucibus libero. Curabitur eu convallis
                      purus. Nunc accumsan diam in arcu pellentesque sagittis.
                      Curabitur dolor odio, aliquam vitae noday backowner
                      condimentum this fire ongon then only on{' '}
                      <i className="fas fa-quote-right" />
                    </p>
                    <div className="rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="testimonial-content">
                    <div className="quote">
                      <i className="fas fa-quote-left" />
                    </div>
                    <div className="client-info">
                      <div className="client-pic">
                        <img src="/images/client-2.jpg" alt="Client" />
                      </div>
                      <div className="client-details">
                        <h4>Nailong Jeso</h4>
                        <span>CTO Founder</span>
                      </div>
                    </div>
                    <p>
                      <i className="fas fa-quote-left" /> Curabitur magna nisi,
                      egestas quis est in, finibus pulvinar ipsum. Nunc sit amet
                      odio interdum, maximus dolor quis, ullamcorper lectus.
                      Mauris vitae faucibus libero. Curabitur eu convallis
                      purus. Nunc accumsan diam in arcu pellentesque sagittis.
                      Curabitur dolor odio, aliquam vitae noday backowner
                      condimentum this fire ongon then only on{' '}
                      <i className="fas fa-quote-right" />
                    </p>
                    <div className="rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="testimonial-content">
                    <div className="quote">
                      <i className="fas fa-quote-left" />
                    </div>
                    <div className="client-info">
                      <div className="client-pic">
                        <img src="/images/client-3.jpg" alt="Client" />
                      </div>
                      <div className="client-details">
                        <h4>Gautam Yamni</h4>
                        <span>Designer Head</span>
                      </div>
                    </div>
                    <p>
                      <i className="fas fa-quote-left" /> Curabitur magna nisi,
                      egestas quis est in, finibus pulvinar ipsum. Nunc sit amet
                      odio interdum, maximus dolor quis, ullamcorper lectus.
                      Mauris vitae faucibus libero. Curabitur eu convallis
                      purus. Nunc accumsan diam in arcu pellentesque sagittis.
                      Curabitur dolor odio, aliquam vitae noday backowner
                      condimentum this fire ongon then only on{' '}
                      <i className="fas fa-quote-right" />
                    </p>
                    <div className="rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </SwiperSlide>
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
