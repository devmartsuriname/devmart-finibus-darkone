import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";
import LetsTalkArea from "../../common/LetsTalkArea";

function ProjectDetailsPage() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Breadcrumb pageName="Project Details" />
      <section className="project-details sec-mar">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="project-details-content">
                <div className="project-thumb">
                  <img src="/images/portfolio/portfolio-1.jpg" alt="Project" />
                </div>
                <h3>Creative Agency Website</h3>
                <p>
                  Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor.
                  Classe aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos. Praesent nec neque at dolor venenatis
                  consectetur eu quis ex. Donec lacinia placerat felis non aliquam.
                </p>
                <div className="project-details-img">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <img src="/images/project/project-single-step-1.jpg" alt="Step 1" />
                    </div>
                    <div className="col-md-6">
                      <img src="/images/project/project-single-step-2.jpg" alt="Step 2" />
                    </div>
                  </div>
                </div>
                <h4>Project Overview</h4>
                <p>
                  Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla
                  porttitor. Duis a orci nunc. Suspendisse ac convallis sapien, quis
                  commodo libero. Donec nec dui luctus, pellentesque lacus sed, mollis
                  leo. Proin neque lacus, semper vel ex a, lobortis blandit mi.
                </p>
                <div className="project-details-img">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <img src="/images/project/project-single-step-3.jpg" alt="Step 3" />
                    </div>
                    <div className="col-md-6">
                      <img src="/images/project/project-single-step-4.jpg" alt="Step 4" />
                    </div>
                  </div>
                </div>
                <h4>Our Solution</h4>
                <p>
                  Maecenas ut est in ante imperdiet laoreet eu quis elit. Phasellus
                  porta libero in dolor luctus fringilla. Vestibulum maximus id nulla
                  sit amet sollicitudin. Etiam eu ullamcorper ipsum.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="project-info">
                <h4>Project Info</h4>
                <ul>
                  <li>
                    <span>Client:</span> Example Corp
                  </li>
                  <li>
                    <span>Category:</span> Web Design
                  </li>
                  <li>
                    <span>Date:</span> January 2022
                  </li>
                  <li>
                    <span>Duration:</span> 3 Months
                  </li>
                  <li>
                    <span>Website:</span>{" "}
                    <a href="https://example.com">www.example.com</a>
                  </li>
                </ul>
                <div className="project-share">
                  <h5>Share:</h5>
                  <div className="social-links">
                    <a href="https://facebook.com">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="https://twitter.com">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="https://linkedin.com">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-nav">
            <div className="row">
              <div className="col-6">
                <Link onClick={scrollTop} to="/project" className="prev-project">
                  <i className="bi bi-arrow-left" /> Previous Project
                </Link>
              </div>
              <div className="col-6 text-end">
                <Link onClick={scrollTop} to="/project" className="next-project">
                  Next Project <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LetsTalkArea />
    </>
  );
}

export default ProjectDetailsPage;
