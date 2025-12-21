import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles } from "react-circular-progressbar";

function InsideStoryArea() {
  const Singlepercentage = 90;
  const singleXmPercentage = 95;
  const singleXmlPercentage = 88;
  const circlebar = {
    text: {
      fill: "#f88",
      fontSize: "16px",
    },
  };
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
                      src={process.env.PUBLIC_URL + "/images/story.png"}
                      alt="images"
                    />
                    <div className="cto-message-wrapper">
                      <div className="cto-message">
                        <p>
                          Integer purus odio, placerat neclessi rhoncus in,
                          ullamcorper nec dolor.ol aptent taciti sociosqu.
                        </p>
                        <h4>
                          Carlo Rabil. <span>CTO &amp; FOUNDER, Finibus</span>
                        </h4>
                        <img
                          src={
                            process.env.PUBLIC_URL + "/images/cto-signature.png"
                          }
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
                    <span>Inside Story</span>
                    <h2 className="mb-15">
                      We are creative Agency that creates beautiful.
                    </h2>
                  </div>
                  <p>
                    Integer purus odio, placerat nec rhoncus in, ullamcorper nec
                    dolor. Classe aptent taciti sociosqu ad litora torquent per
                    conubia nostra, per inceptosi himenaeos. Praesent nec neque
                    at dolor venenatis consectetur eu quis e Donec lacinia
                    placerat felis non aliquam.Integer purus odio.
                  </p>
                  <div className="story-skills">
                    <div className="story-skill">
                      <CircularProgressbar
                        {...circlebar}
                        valueStart={0}
                        styles={buildStyles({
                          pathTransition:
                            Singlepercentage === 0
                              ? "none"
                              : "stroke-dashoffset 0.5s ease 0s",
                        })}
                        strokeWidth={1}
                        value={Singlepercentage}
                        text={`${Singlepercentage}%`}
                        className="progress-bar-circle"
                      />

                      <span>Idea &amp; Research</span>
                    </div>
                    <div className="story-skill">
                      <CircularProgressbar
                        strokeWidth={1}
                        value={singleXmPercentage}
                        text={`${singleXmPercentage}%`}
                        className="progress-bar-circle"
                      />

                      <span>Wirfirm &amp; Design</span>
                    </div>
                    <div className="story-skill">
                      <CircularProgressbar
                        strokeWidth={1}
                        value={singleXmlPercentage}
                        text={`${singleXmlPercentage}%`}
                        className="progress-bar-circle"
                      />
                      <span>Developing &amp; Launch</span>
                    </div>
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
