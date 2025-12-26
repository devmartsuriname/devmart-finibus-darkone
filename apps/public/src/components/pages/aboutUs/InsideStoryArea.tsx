import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useAboutPageSettings, STATIC_INSIDE_STORY } from "../../../hooks/useAboutPageSettings";

function InsideStoryArea() {
  const { insideStory } = useAboutPageSettings();
  
  // If section is disabled, don't render
  if (!insideStory.enabled) {
    return null;
  }

  const stats = insideStory.progress_stats || STATIC_INSIDE_STORY.progress_stats;
  
  return (
    <>
      <section className="about-area sec-mar">
        <div className="container">
          <div className="out-story">
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="story-left">
                  <div className="office-group-img">
                    <img
                      src={insideStory.main_image_url}
                      alt="images"
                    />
                    <div className="cto-message-wrapper">
                      <div className="cto-message">
                        <p>{insideStory.cto_message}</p>
                        <h4>
                          {insideStory.cto_name} <span>{insideStory.cto_title}</span>
                        </h4>
                        <img
                          src={insideStory.cto_signature_url}
                          alt="images"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-6">
                <div className="story-right">
                  <div className="title black">
                    <span>{insideStory.section_label}</span>
                    <h2 className="mb-15">{insideStory.title}</h2>
                  </div>
                  <p>{insideStory.description}</p>
                  <div className="story-skills">
                    {stats.map((stat, index) => (
                      <div className="story-skill" key={index}>
                        <CircularProgressbar
                          styles={buildStyles({
                            pathTransition:
                              stat.percentage === 0
                                ? "none"
                                : "stroke-dashoffset 0.5s ease 0s",
                          })}
                          strokeWidth={1}
                          value={stat.percentage}
                          text={`${stat.percentage}%`}
                          className="progress-bar-circle"
                        />
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InsideStoryArea;
