import React, { useState, useRef } from 'react';
import Link from '@docusaurus/Link'; // 1. Import the native Docusaurus Link utility

export default function InteractiveVideo({ 
  src = "/img/brainstorm_tutorial-run_brainstorming_session_en.mp4", 
  startTime = 10, 
  endTime = 15, 
  title = "📌 Recommended Check", 
  text = "Want to see how this works in practice? Check out our other tutorial video.", 
  linkUrl = "/docs/videolibrary/other-video", 
  linkText = "Watch Related Video →" 
}) {
  const videoRef = useRef(null);
  const [showCard, setShowCard] = useState(false);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    
    if (currentTime >= startTime && currentTime <= endTime) {
      setShowCard(true);
    } else {
      setShowCard(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '2rem auto' }}>
      <video
        ref={videoRef}
        controls
        width="100%"
        onTimeUpdate={handleTimeUpdate}
        style={{ borderRadius: '8px', display: 'block' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showCard && (
        <div style={{
          position: 'absolute', 
          top: '20px', 
          right: '20px',
          background: 'var(--ifm-card-background-color, #1b1b1d)',
          color: 'var(--ifm-font-color-base, #fff)',
          border: '1px solid var(--ifm-color-emphasis-200)',
          padding: '16px', 
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)', 
          zIndex: 10, 
          maxWidth: '260px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px' }}>{title}</h4>
          <p style={{ fontSize: '13px', margin: '0 0 12px 0', opacity: 0.9 }}>{text}</p>
          
          {/* 2. Swapped <a> for <Link> and changed "href" to "to" */}
          <Link 
            to={linkUrl} 
            style={{ 
              fontSize: '13px', 
              fontWeight: 'bold', 
              color: 'var(--ifm-color-primary)', 
              textDecoration: 'none' 
            }}
          >
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
}
