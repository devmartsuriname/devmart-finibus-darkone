/**
 * WhyChooseUsArea Component
 * 
 * Migrated from Finibus to React 18
 * Note: Uses react-modal-video for video popup
 * Progress bars implemented with inline styles (removed @ramonak/react-progress-bar dependency)
 */

import React, { useState } from 'react'

interface WhyChooseUsAreaProps {
  black?: string
  light?: string
  lable?: string
}

interface ProgressBarProps {
  completed: number
  label?: string
}

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
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <section className="why-choose-us sec-mar">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className={`title ${black}`}>
                <span>Why Choose Devmart</span>
                <h2 className="mb-15">
                  success is just around the next online corner
                </h2>
              </div>
              <div className="video-demo">
                <img src="/images/play-video.jpg" alt="Video demo" />
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
                <div className="signle-bar pt-0">
                  <h6>Web Design</h6>
                  <ProgressBar completed={85} />
                </div>
                <div className="signle-bar">
                  <h6>App Development</h6>
                  <ProgressBar completed={75} />
                </div>
                <div className="signle-bar">
                  <h6>Backend</h6>
                  <ProgressBar completed={55} />
                </div>
                <div className="signle-bar">
                  <h6>Video Animation</h6>
                  <ProgressBar completed={65} />
                </div>
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
              src="https://www.youtube.com/embed/L61p2uyiMSo?autoplay=1"
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
