import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DocMap from './components/DocMap';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

export type layer = {
  [key: string]: {
    x: number;
    y: number;
    maxZoom: number;
  };
};

export type Doc = {
  url: string;
  layer: string;
  title?: string;
  group: string;
  file: string;
  meta: {
    [key: string]: {
      x: number;
      y: number;
      maxZoom: number;
    } & {
      contentLength: string;
      pages: number;
    };
  };
};

/* eslint-disable-next-line */
export interface DocumentViewerProps {
  docs: Doc[];
}

export function DocumentViewer({ docs }: DocumentViewerProps) {
  let { file } = useParams();
  const sideBarMinSize = 130;
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [wholeWidthTrigger, setWholeWidthTrigger] = useState(undefined);
  const [wholeHeightTrigger, setWholeHeightTrigger] = useState(undefined);
  const [resizing, setResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(sideBarMinSize);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const mapHeight = 'calc(100vh - 49px)';

  const onMouseDown = (e) => {
    if (e.button === 0) {
      startResizing();
    }
  };

  const startResizing = () => {
    setResizing(true);
  };

  const stopResizing = () => {
    setResizing(false);
  };

  const onMouseMove = (e) => {
    if (resizing) {
      e.preventDefault();
      resize(e.clientX);
    }
  };

  const onTouchMove = (e) => {
    if (resizing) {
      e.preventDefault();
      resize(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, []);

  const resize = (clientX) => {
    if (resizing) {
      let newSidebarWidth;
      if (sidebarRef.current) {
        newSidebarWidth =
          clientX - sidebarRef.current?.getBoundingClientRect().left + 5;
      } else {
        newSidebarWidth = sidebarWidth;
      }

      let countWrapps = 0;
      if (newSidebarWidth > sideBarMinSize) {
        setSidebarWidth(newSidebarWidth);
      }
    }
  };

  return (
    <div style={{ background: '#343a40', height: '100vh' }}>
      <div
        style={{
          backgroundImage: 'linear-gradient(to bottom, #3c3c3c 0, #222 100%)',
        }}
      >
        <Navbar
          title={docs[0]?.title}
          // @ts-ignore
          maxIndex={docs[parseInt(file!) - 1]?.meta.pages}
          downloadUrl={docs[parseInt(file!) - 1]?.url}
          docs={docs}
          setHeightTrigger={setWholeHeightTrigger}
          setWidthTrigger={setWholeWidthTrigger}
          currentHeightTrigger={wholeHeightTrigger}
          currentWidthTrigger={wholeWidthTrigger}
        />
      </div>

      <div
        style={{
          height: mapHeight,
          background: 'grey',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignContent: 'center',
        }}
      >
        {docs.length > 1 && (
          <div
            id="sidebar"
            style={{
              background: 'rgb(153, 153, 153)',
              height: mapHeight,
              width: sidebarWidth,
              padding: '5px 1px 5px 5px',
              overflow: 'scroll',
            }}
            ref={sidebarRef}
          >
            <Sidebar
              docs={docs}
              index={parseInt(file!)}
              // @ts-ignore
              maxIndex={docs[parseInt(file!) - 1]?.meta.pages}
            />
          </div>
        )}
        <div
          id="sidebar-slider"
          style={{
            background: '#999999',
            height: mapHeight,
            width: 10,
            cursor: 'col-resize',
          }}
          onMouseDown={onMouseDown}
          onTouchStart={startResizing}
          onTouchEnd={stopResizing}
        ></div>
        <div
          id="docviewer"
          style={{
            height: mapHeight,
            width: '100%',
          }}
          ref={mapWrapperRef}
        >
          {mapWrapperRef.current && (
            <DocMap
              docs={docs}
              index={parseInt(file!)}
              height={mapWrapperRef?.current?.clientHeight}
              width={mapWrapperRef?.current?.clientWidth}
              setWholeHeight={wholeHeightTrigger}
              setWholeWidth={wholeWidthTrigger}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;
