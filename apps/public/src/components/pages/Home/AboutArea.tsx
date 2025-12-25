import React from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CountUp from "react-countup";
import { useHomepageSettings, StatItem, SkillBar } from "../../../hooks/useHomepageSettings";

interface AboutAreaProps {
  black?: string;
  light?: string;
}

// Static fallback data (Finibus defaults)
const STATIC_ABOUT = {
  title: "Direction with our company.",
  description: "Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Classe aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent nec neque at dolor venenatis consectetur eu quis ei Donec lacinia placerat felis non aliquam.Integer purus odio.",
  mission_title: "Our Mission",
  mission_text: "Integer purus odio, placerat nec rhoni olor Class online and video.",
  cta_label: "About more",
  cta_url: "/about",
  skills: [
    { label: "Web", sublabel: "Clean Design", percent: 85 },
    { label: "App", sublabel: "Developing", percent: 68 }
  ] as SkillBar[]
};

const STATIC_STATS: StatItem[] = [
  { icon: "/images/icons/count-1.png", value: 250, label: "Project Completed" },
  { icon: "/images/icons/count-2.png", value: 150, label: "Satisfied Clients" },
  { icon: "/images/icons/count-3.png", value: 150, label: "Expert Teams" },
  { icon: "/images/icons/count-4.png", value: 100, label: "Win Awards" }
];

function AboutArea({ black = "", light = "" }: AboutAreaProps) {
  const { data: homepageData } = useHomepageSettings();
  
  // Use DB data or fallback to static
  const about = homepageData?.home_about || STATIC_ABOUT;
  const stats = homepageData?.stats?.length ? homepageData.stats : STATIC_STATS;
  const skills = about.skills?.length ? about.skills : STATIC_ABOUT.skills;

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <>
      <section className={`about-area sec-mar ${black}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-6">
              <div className="about-left">
                <div className="title black">
                  <span>About us</span>
                  <h2 className="mb-15">{about.title}</h2>
                </div>
                <p>{about.description}</p>
                <div className="our-mission">
                  <div className="msn-icon">
                    <i>
                      <img
                        src="/images/icons/mission-icon.png"
                        alt="images"
                      />
                    </i>
                  </div>
                  <div className="msn-content">
                    <h5>{about.mission_title}</h5>
                    <p>{about.mission_text}</p>
                  </div>
                  <div className="cto">
                    <img
                      src="/images/ctoFounder.png"
                      alt="imgs"
                    />
                  </div>
                </div>
                <div className="cmn-btn">
                  <Link onClick={scrollTop} to={about.cta_url}>{about.cta_label}</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="about-right">
                <div className="group-images">
                  <img
                    src="/images/about-bottom.jpg"
                    alt="images"
                  />
                  <div className="about-top">
                    <img
                      src="/images/about-top.png"
                      alt="images"
                    />
                  </div>
                  <div className="about-skills">
                    {skills[0] && (
                      <div className="signle-skill">
                        <CircularProgressbar
                          value={skills[0].percent}
                          text={`${skills[0].percent}%`}
                          className="progress-bar-circle"
                        />
                        <div className="skill-content">
                          <h6>{skills[0].label}</h6>
                          <p>{skills[0].sublabel || ''}</p>
                        </div>
                      </div>
                    )}
                    {skills[1] && (
                      <div className="signle-skill xsm">
                        <CircularProgressbar
                          value={skills[1].percent}
                          text={`${skills[1].percent}%`}
                          className="progress-bar-circle"
                        />
                        <div className="skill-content">
                          <h6>{skills[1].label}</h6>
                          <p>{skills[1].sublabel || ''}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="features-count">
            <div className="row">
              {stats.map((stat, index) => (
                <div key={index} className="col-sm-6 col-md-3 col-lg-3 col-xl-3">
                  <div className={`single-count ${index === 3 ? 'xsm' : ''}`}>
                    <i>
                      <img
                        src={stat.icon}
                        alt={stat.label}
                      />
                    </i>
                    <div className="counter">
                      <CountUp end={stat.value} delay={index + 1} duration={5} /> <sup>+</sup>
                    </div>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutArea;
