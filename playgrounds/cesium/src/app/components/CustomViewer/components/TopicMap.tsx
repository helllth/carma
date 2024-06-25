import React, { useEffect, useRef, useState } from 'react';
import { useCesium } from 'resium';

import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
import { leafletToCesiumCamera } from '../../../utils/cesiumHelpers';
import {
  useShowPrimaryTileset,
  useViewerIsMode2d,
} from '../../../store/slices/viewer';

export const TopicMap = () => {
  const { viewer } = useCesium();
  const isPrimaryStyle = useShowPrimaryTileset();
  const isMode2d = useViewerIsMode2d();

  const componentRef = useRef<null | HTMLDivElement>(null);

  const isFocused = useRef<boolean>(false);

  useEffect(() => {
    const node = componentRef.current;

    if (node) {
      const handleFocus = () => (isFocused.current = true);
      const handleBlur = () => (isFocused.current = false);

      node.addEventListener('focusin', handleFocus);
      node.addEventListener('focusout', handleBlur);

      return () => {
        node.removeEventListener('focusin', handleFocus);
        node.removeEventListener('focusout', handleBlur);
      };
    }
  }, []);

  const handleLeafletLocationChange = (event: {
    lat: number;
    lng: number;
    zoom: number;
  }) => {
    console.log('handleLeafletLocationChange', event, isFocused.current);
    if (!isFocused.current) {
      return;
    }
    if (viewer) {
      leafletToCesiumCamera(viewer, event);
    }
  };

  const primaryLayerRef = useRef<any>(null);
  const secondaryLayerRef = useRef<any>(null);

  useEffect(() => {
    if (primaryLayerRef.current && primaryLayerRef.current.leafletElement) {
      console.log('tileLayerRef1.current', primaryLayerRef.current);
      primaryLayerRef.current.leafletElement.setOpacity(isPrimaryStyle ? 1 : 0);
    }
    if (secondaryLayerRef.current && secondaryLayerRef.current.leafletElement) {
      secondaryLayerRef.current.leafletElement.setOpacity(
        isPrimaryStyle ? 0 : 1
      );
    }
  }, [isPrimaryStyle]);

  console.log('RENDER: TopicMap isMode2d', isMode2d);

  return (
    <div
      ref={componentRef}
      style={{
        //animation: isMode2d ? 'fadein 1s' : 'fadeout 1s',
        //animationFillMode: 'both',
        pointerEvents: isMode2d ? 'auto' : 'none',
        opacity: isMode2d ? 1 : 0,
        transition: 'opacity 1s',
      }}
      //className={isMode2d ? 'fade-in' : 'fade-out'}
    >
      <TopicMapComponent
        gazData={[]}
        backgroundlayers="empty"
        hamburgerMenu={false}
        fullScreenControlEnabled={false}
        zoomSnap={1} // TODO fix zoom snapping in TopicMap Component
        zoomDelta={1}
        locationChangedHandler={handleLeafletLocationChange}
      >
        <StyledWMSTileLayer
          {...{
            ref: primaryLayerRef,
            //url: 'https://maps.wuppertal.de/karten',
            //layers: 'R102:trueortho2022',
            url: 'https://www.wms.nrw.de/geobasis/wms_nw_dop',
            layers: 'nw_dop_rgb',
            type: 'wms',
            format: 'image/png',
            tiled: true,
            maxZoom: 22,
            version: '1.1.1',
            pane: 'backgroundLayers',
            opacity: 1,
          }}
        ></StyledWMSTileLayer>

        <StyledWMSTileLayer
          {...{
            ref: secondaryLayerRef,
            type: 'wmts',
            url: 'https://geodaten.metropoleruhr.de/spw2/service',
            layers: 'spw2_graublau',
            version: '1.3.0',
            tileSize: 512,
            transparent: true,
            opacity: 0,
          }}
        ></StyledWMSTileLayer>
      </TopicMapComponent>
    </div>
  );
};

export default TopicMap;