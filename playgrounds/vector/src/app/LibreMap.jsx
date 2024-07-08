import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';
import './mapLibre.css';
import { Button } from 'react-bootstrap';
import { Map } from 'maplibre-gl';

export default function LibreMap({ opacity = 0.1, vectorStyles = [] }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(7.150764);
  const [lat] = useState(51.256);
  const [zoom] = useState(15);
  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      _style: `https://omt.map-hosting.de/styles/osm-bright/style.json`,

      style: {
        version: 8,
        sources: {
          rvr_wms: {
            type: 'raster',
            tiles: [
              'https://geodaten.metropoleruhr.de/spw2?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=spw2_light&STYLE=default&FORMAT=image/png&TILEMATRIXSET=webmercator_hq&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: 'wms-test-layer',
            type: 'raster',
            opacity: 0.25,

            source: 'rvr_wms',
            paint: { 'raster-opacity': 0.7 },
          },
        ],
      },
      __style: {
        version: 8,
        sources: {},
        layers: [],
      },
      center: [lng, lat],
      zoom: zoom,
      opacity: 1,
      maxZoom: 19,
    });

    map.current.on('load', function () {
      for (const vectorStyle of vectorStyles) {
        // Fetch and add additional layers from external style JSON
        const additionalStyleUrl = vectorStyle;

        fetch(additionalStyleUrl)
          .then((response) => response.json())
          .then((additionalStyle) => {
            // Add glyphs and sprite to the map
            map.current.setStyle({
              ...map.current.getStyle(),
              glyphs: additionalStyle.glyphs,
              sprite: additionalStyle.sprite,
              // sprite: { default: additionalStyle.sprite },
            });

            console.log('sprites', map.current.getStyle().sprite);

            // Add sources from the additional style
            Object.keys(additionalStyle.sources).forEach((sourceName) => {
              map.current.addSource(
                sourceName,
                additionalStyle.sources[sourceName]
              );
            });

            // Add layers from the additional style
            additionalStyle.layers.forEach((layer) => {
              map.current.addLayer(layer);
            });
          });
      }
      console.log('map.current', map.current);
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-left');
  });

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}