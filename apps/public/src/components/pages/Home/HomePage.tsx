import React from 'react'
import TestimonialArea from '../../common/TestimonialArea'
import LetsTalkArea from '../../common/LetsTalkArea'
import WhyChooseUsArea from '../../common/WhyChooseUsArea'

// Placeholder components - to be copied 1:1 from finibus
function HeroArea() {
  return (
    <section className="hero-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="hero-content">
              <span>Welcome to Devmart</span>
              <h1>We Create Digital Solutions</h1>
              <p>Building innovative digital experiences for forward-thinking businesses.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceArea() {
  return <section className="service-area sec-mar"><div className="container"><h2>Our Services</h2></div></section>
}

function AboutArea({ black, light }: { black?: string; light?: string }) {
  return <section className={`about-area sec-mar ${black}`}><div className="container"><h2>About Us</h2></div></section>
}

function OurPartnerArea() {
  return <section className="partner-area"><div className="container"><h2>Our Partners</h2></div></section>
}

function PortfolioArea({ black }: { black?: string }) {
  return <section className={`portfolio-area sec-mar ${black}`}><div className="container"><h2>Portfolio</h2></div></section>
}

function NewsLatterArea({ black }: { black?: string }) {
  return <section className={`newsletter-area ${black}`}><div className="container"><h2>Newsletter</h2></div></section>
}

function HomePage() {
  return (
    <>
      <HeroArea />
      <ServiceArea />
      <AboutArea black="black" light="dark" />
      <OurPartnerArea />
      <PortfolioArea black="black" />
      <WhyChooseUsArea black="black" lable="" />
      <TestimonialArea />
      <NewsLatterArea black="black" />
      <LetsTalkArea />
    </>
  )
}

export default HomePage
