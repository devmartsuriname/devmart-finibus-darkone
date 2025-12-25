import React from "react";
import { Link } from "react-router-dom";
import { useServices } from "../../../hooks/useServices";

// Static fallback services (Finibus defaults)
const STATIC_SERVICES = [
  {
    id: "static-1",
    title: "web design",
    short_description: "Fusce ornare mauris nisi, id fringilla turpis vehicula justo lectus, ultricies nec sem",
    slug: "service-details",
    icon_url: "/images/icons/service-icon-1.png"
  },
  {
    id: "static-2",
    title: "App design",
    short_description: "Maecenas ut est in ante imperdiet laoreet eu quis elit laoreet Phasellus Door",
    slug: "service-details",
    icon_url: "/images/icons/service-icon-2.png"
  },
  {
    id: "static-3",
    title: "Developing",
    short_description: "Etiam eu ullamcorper ipsum. Pellentesque eu ipsum luctus libero euismod",
    slug: "service-details",
    icon_url: "/images/icons/service-icon-3.png"
  },
  {
    id: "static-4",
    title: "Graphic design",
    short_description: "Quisque in massa nunc. Etiam blandit tortor nisl, auctor vulputate felis convallis at.",
    slug: "service-details",
    icon_url: "/images/icons/service-icon-4.png"
  }
];

function ServiceArea() {
  const { services: dbServices, loading } = useServices();
  
  // Use first 4 DB services or fallback to static
  const displayServices = dbServices.length > 0 
    ? dbServices.slice(0, 4).map((s, i) => ({
        id: s.id,
        title: s.title,
        short_description: s.short_description,
        slug: s.slug,
        icon_url: s.icon?.public_url || STATIC_SERVICES[i % 4].icon_url
      }))
    : STATIC_SERVICES;

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <>
      <section className="service-area sec-pad">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-4">
              <div className="title">
                <span>what we do</span>
                <h2>we work performed for client happy.</h2>
                <div className="cmn-btn">
                  <Link onClick={scrollTop} to="/service">
                    view all services
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-8">
              <div className="row g-4">
                {displayServices.map((service, index) => (
                  <div key={service.id} className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="single-service">
                      <span className="count">{String(index + 1).padStart(2, '0')}</span>
                      <div className="service-icon">
                        <i>
                          <img
                            src={service.icon_url}
                            alt={service.title}
                          />
                        </i>
                      </div>
                      <div className="service-content">
                        <h4>{service.title}</h4>
                        <p>{service.short_description}</p>
                        <Link onClick={scrollTop} to={`/service/${service.slug}`}>
                          read more
                          <i>
                            <img
                              src="/images/icons/arrow-circle.png"
                              alt="arrow"
                            />
                          </i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceArea;
