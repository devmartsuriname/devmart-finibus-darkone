import React from "react";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";

SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay]);
function TestimonialArea() {
  const testimonialSlider = {
    slidesPerView: 1,
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };
  return (
    <>
      <section className="testimonial-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="swiper testimonial-slider">
                <Swiper
                  pagination={{
                    type: "fraction",
                  }}
                  {...testimonialSlider}
                  className="swiper-wrapper"
                >
                  <SwiperSlide className="swiper-slide">
                    <div className="testimonial-content">
                      <div className="quote">
                        <i className="fas fa-quote-left" />
                      </div>
                      <div className="client-info">
                        <div className="client-pic">
                          <img
                            src={process.env.PUBLIC_URL + "/images/client.jpg"}
                            alt="images"
                          />
                        </div>
                        <div className="client-details">
                          <h4>Savannah Nguyen</h4>
                          <span>Executive CEO</span>
                        </div>
                      </div>
                      <p>
                        <i className="fas fa-quote-left" /> Curabitur magna
                        nisi, egestas quis est in, finibus pulvinar ipsum. Nunc
                        sit amet odio interdum, maximus dolor quis, ullamcorper
                        lectus. Mauris vitae faucibus libero. Curabitur eu
                        convallis purus. Nunc accumsan diam in arcu pellentesque
                        sagittis. Curabitur dolor odio, aliquam vitae noday
                        backowner condimentum this fire ongon then only on{" "}
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
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/client-2.jpg"
                            }
                            alt="images"
                          />
                        </div>
                        <div className="client-details">
                          <h4>Nailong Jeso</h4>
                          <span>CTO Founder</span>
                        </div>
                      </div>
                      <p>
                        <i className="fas fa-quote-left" /> Curabitur magna
                        nisi, egestas quis est in, finibus pulvinar ipsum. Nunc
                        sit amet odio interdum, maximus dolor quis, ullamcorper
                        lectus. Mauris vitae faucibus libero. Curabitur eu
                        convallis purus. Nunc accumsan diam in arcu pellentesque
                        sagittis. Curabitur dolor odio, aliquam vitae noday
                        backowner condimentum this fire ongon then only on{" "}
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
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/client-3.jpg"
                            }
                            alt="images"
                          />
                        </div>
                        <div className="client-details">
                          <h4>Gautam Yamni</h4>
                          <span>Designer Head</span>
                        </div>
                      </div>
                      <p>
                        <i className="fas fa-quote-left" /> Curabitur magna
                        nisi, egestas quis est in, finibus pulvinar ipsum. Nunc
                        sit amet odio interdum, maximus dolor quis, ullamcorper
                        lectus. Mauris vitae faucibus libero. Curabitur eu
                        convallis purus. Nunc accumsan diam in arcu pellentesque
                        sagittis. Curabitur dolor odio, aliquam vitae noday
                        backowner condimentum this fire ongon then only on{" "}
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
    </>
  );
}

export default TestimonialArea;
