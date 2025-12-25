/**
 * WhyChooseUsArea Component
 * 
 * Migrated from Finibus to React 18
 * Phase 7: Wired to homepage_settings
 */

import React, { useState } from 'react'
import { useHomepageSettings, SkillBar } from '../../hooks/useHomepageSettings'

interface WhyChooseUsAreaProps {
  black?: string
  light?: string
  lable?: string
}

interface ProgressBarProps {
  completed: number
  label?: string
}

// Static fallback data (Finibus defaults)
const STATIC_WHY_CHOOSE = {
  title: "success is just around the next online corner",
  video_url: "https://www.youtube.com/embed/L61p2uyiMSo",
  video_poster: "/images/play-video.jpg",
  skills: [
    { label: "Web Design", percent: 85 },
    { label: "App Development", percent: 75 },
    { label: "Backend", percent: 55 },
    { label: "Video Animation", percent: 65 }
  ] as SkillBar[]
};

// Simple progress bar component to replace @ramonak/react-progress-bar
function ProgressBar({ completed, label }: ProgressBarProps) {
  return (
    <div className="progress-container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <div 
        style={{ 
          flex: 1,
          height: '5px', 
          backgroundColor: '#d90a2c80',
          borderRadius: '3px',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{ 
            width: `${completed}%`, 
            height: '100%', 
            backgroundColor: '#D90A2C',
            transition: 'width 1s ease-in-out',
            borderRadius: '3px'
          }} 
        />
      </div>
      <span style={{ marginLeft: '10px', fontWeight: 600 }}>{completed}%</span>
    </div>
  )
}

function WhyChooseUsArea({ black = '', light = '', lable = '' }: WhyChooseUsAreaProps) {
  const { data: homepageData } = useHomepageSettings();
  const [isOpen, setOpen] = useState(false)

  // Use DB data or fallback to static
  const whyChoose = homepageData?.why_choose || STATIC_WHY_CHOOSE;
  const skills = whyChoose.skills?.length ? whyChoose.skills : STATIC_WHY_CHOOSE.skills;

  return (
    <>
      <section className="why-choose-us sec-mar">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className={`title ${black}`}>
                <span>Why Choose Devmart</span>
                <h2 className="mb-15">
                  {whyChoose.title}
                </h2>
              </div>
              <div className="video-demo">
                <img src={whyChoose.video_poster} alt="Video demo" />
                <div className="play-btn">
                  <div onClick={() => setOpen(true)} className="popup-video">
                    <i className="fas fa-play" /> Play now
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className={`valuable-skills ${light}`}>
                <img src="/images/valuable-skill.jpg" alt="Valuable skills" />
                {skills.map((skill, index) => (
                  <div key={index} className={`signle-bar ${index === 0 ? 'pt-0' : ''}`}>
                    <h6>{skill.label}</h6>
                    <ProgressBar completed={skill.percent} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal - Simple implementation */}
      {isOpen && (
        <div 
          className="video-modal-overlay" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setOpen(false)}
        >
          <div 
            style={{ 
              position: 'relative',
              width: '80%',
              maxWidth: '900px',
              aspectRatio: '16/9'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '30px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`${whyChoose.video_url}?autoplay=1`}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}

export default WhyChooseUsArea
