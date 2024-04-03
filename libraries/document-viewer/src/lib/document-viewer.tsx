import { useEffect, useState } from 'react';
import { constants } from '../constants/Documents';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DocMap from './components/DocMap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

export type Doc = {
  url: string;
  layer: string;
  title: string;
  group: string;
  file: string;
  meta: string;
};

/* eslint-disable-next-line */
export interface DocumentViewerProps {
  docs: Doc[];
}

export function DocumentViewer({ docs }: DocumentViewerProps) {
  const [pendingLoader, setPendingLoader] = useState(0);
  let { file } = useParams();

  const LOADING_FINISHED = 'LOADING_FINISHED';
  const LOADING_OVERLAY = 'LOADING_OVERLAY';

  const zipFileNameMapping = constants.ZIP_FILE_NAME_MAPPING;
  const filenameShortenerMapping = constants.SIDEBAR_FILENAME_SHORTENER;

  const sideBarMinSize = 130;
  const mapHeight = '100vh';
  let numPages = 1;
  let downloadUrl;

  const fallbackPosition = { lat: 0, lng: 0 };
  const fallbackZoom = 2;

  const loadData = async (dataLoader: any) => {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // entweder dataLoader ist eine Funktion oder ein Array von Funktionen
        if (Array.isArray(dataLoader)) {
          setPendingLoader(dataLoader.length);
          for (const loader of dataLoader) {
            loader(() => {
              setPendingLoader(pendingLoader - 1);
            });
          }
        } else {
          setPendingLoader(1);
          if (dataLoader) {
            dataLoader(() => {
              setPendingLoader(0);
            });
          }
        }
        resolve('ok');
      }, 100);
    });
    return promise;
  };

  useEffect(() => {}, []);

  return (
    <div style={{ background: '#343a40' }}>
      <Navbar
        title={docs[0]?.title}
        currentIndex={parseInt(file!)}
        maxIndex={docs.length}
      />
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
        <div
          id="sidebar"
          style={{
            background: '#999999',
            height: mapHeight,
            width: sideBarMinSize,
            padding: '5px 1px 5px 5px',
            overflow: 'scroll',
          }}
          // ref={(ref) => (this.sidebarRef = ref)}
        >
          <Sidebar docs={docs} index={parseInt(file!)} />
        </div>
        <div
          id="sidebar-slider"
          style={{
            background: '#999999',
            height: mapHeight,
            width: 10,
            cursor: 'col-resize',
          }}
        ></div>
        <div
          id="docviewer"
          style={{
            height: mapHeight,
            width: 200,
          }}
        >
          <DocMap docs={docs} index={parseInt(file!)} />
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;
