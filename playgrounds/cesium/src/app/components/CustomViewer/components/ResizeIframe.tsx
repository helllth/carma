import React, { useState, useEffect } from 'react';

type ResizableIframeProps = {
  iframeSrc: string;
  minLeft?: number;
  minRight?: number;
};

const ResizableIframe = ({
  iframeSrc,
  minLeft = 5,
  minRight = 1.5,
}: ResizableIframeProps) => {
  const [iframePadding, setIframePadding] = useState(100 - minRight);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const pad = (e.clientX / window.innerWidth) * 100;
      setIframePadding(Math.max(minLeft, Math.min(100 - minRight, pad)));
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleButtonClick = () => {
    window.open(iframeSrc, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: `${iframePadding}vw`,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 100,
      }}
    >
      <div
        style={{
          position: 'relative',
          left: `-${iframePadding}vw`,
          height: '100vh',
          width: '100vw',
        }}
      >
        <iframe
          key={iframeSrc} // only needed if iframe becomes unresponsive
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '100%',
            overflow: 'hidden',
            padding: 0,
            margin: 0,
            pointerEvents: isDragging ? 'none' : 'auto', // Change this line
          }}
          title="leafletSynced"
          src={iframeSrc}
          width="100%"
          height="100%"
        />
        <button
          onClick={handleButtonClick}
          style={{
            position: 'absolute',
            top: 30,
            right: 10,
            zIndex: 101,
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          h: {iframeSrc.match(/h=([^&]*)/)![1]}
          <br />
          zoom: <b>{iframeSrc.match(/zoom=([^&]*)/)![1]}</b>
          <br />
          Für beste Überlappung <br />
          nur ganzzahlige Zoom-Level <br />
          mit Leaflet nutzen
          <br />
          Mit Klick ßßhier in neuem Tab öffnen
        </button>
      </div>
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 101,
          width: '20px',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          cursor: 'ew-resize',
        }}
      />
    </div>
  );
};

export default ResizableIframe;
