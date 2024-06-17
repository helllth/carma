import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, MutableRefObject } from 'react';

type ResizableIframeProps = {
  iframeSrcRef: MutableRefObject<string | null>;
  minLeft?: number;
  minRight?: number;
};

// TODO Remove this and replace component with topicmap

const ResizableIframe = ({
  iframeSrcRef,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const src = iframeSrcRef.current;

  if (src === null) {
    return null;
  }

  const handleButtonClick = () => {
    window.open(src, '_blank');
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
          key={src} // only needed if iframe becomes unresponsive
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
          src={src}
          width="100%"
          height="100%"
        />
        <button
          onClick={handleButtonClick}
          style={{
            position: 'absolute',
            top: 10,
            right: 45,
            zIndex: 101,
            padding: '5px 10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          h: {src.match(/h=([^&]*)/)![1]} zoom:{' '}
          <b>{src.match(/zoom=([^&]*)/)![1]}</b> im Kulturstadtplan{' '}
          <FontAwesomeIcon icon={faExternalLinkAlt} />
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
