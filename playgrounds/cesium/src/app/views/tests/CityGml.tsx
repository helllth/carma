import React from 'react';
import { Cesium3DTileset } from 'resium';
import { Cartesian3, Cartographic, Cesium3DTileStyle, Color } from 'cesium';
import { toDegFactor } from '../../lib/cesiumHelpers';
import {
  WUPP3D,
  FOOTPRINT_GEOJSON_SOURCES,
  WUPPERTAL,
  CITYGML_TEST_TILESET,
} from '../../config';
import GeoJsonSelector from '../../components/GeoJsonSelector';
import { useState } from 'react';
import RadioSelector from '../../components/RadioSelector';
import { useTilesetControl } from '../../utils/controls';
import { off } from 'process';

const jsonOptions = Object.entries(FOOTPRINT_GEOJSON_SOURCES).map(
  ([key, { url, name }]) => ({
    label: name,
    value: url,
  })
);

const getTileSetInfo = (tileset) => {
  const { center } = tileset.root.boundingSphere;
  const cartographic = Cartographic.fromCartesian(center);
  const longitude = cartographic.longitude * toDegFactor;
  const latitude = cartographic.latitude * toDegFactor;
  const height = cartographic.height;

  console.log(
    `Longitude: ${longitude}, Latitude: ${latitude}, Height: ${height}, center: ${center}, ${tileset.basePath}}`
  );
};

// needs own State to toggle visibility and not cause rerender of the whole app and reseting position
const DebugTileset = ({
  url,
  onReady,
  style,
}: {
  url: string;
  onReady: (Cesium3DTileset) => void;
  style?: Cesium3DTileStyle;
}) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Cesium3DTileset
        url={url}
        onReady={onReady}
        style={
          style ??
          new Cesium3DTileStyle({
            show: 'true',
            color: "color('#ffffff')",
            heightOffset: '100',
          })
        }
        show={show}
        // debugWireframe={true}
      />
      <label
        className="leaflet-bar"
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          padding: 3,
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      >
        <input type="checkbox" checked={show} onChange={() => setShow(!show)} />
        Show CityGML Tileset
      </label>
    </>
  );
};

const DebugGeoJsonSelector = ({ initialSrc, debug, renderPoint }) => {
  const [show, setShow] = useState(true);
  const [src, setSrc] = useState(initialSrc);

  return (
    <>
      {show ? (
        <GeoJsonSelector
          srcExtruded={src}
          debug={debug}
          renderPoint={renderPoint}
        />
      ) : null}
      <div
        className="leaflet-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: 'white',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      >
        {' '}
        <input type="checkbox" checked={show} onChange={() => setShow(!show)} />
        Show Footprints
        <RadioSelector
          options={jsonOptions}
          value={src}
          onChange={(value) => {
            console.log('value', value);
            setSrc(value);
          }}
        />
      </div>
    </>
  );
};

function View() {
  const [footprintsSrc, setFootprintsSrc] = useState(
    FOOTPRINT_GEOJSON_SOURCES.VORONOI.url
  );

  const geoJsonSelector = (
    <GeoJsonSelector
      srcExtruded={footprintsSrc}
      debug={true}
      renderPoint={false}
    />
  );

  useTilesetControl();

  return (
    <>
      <DebugTileset url={CITYGML_TEST_TILESET.url} onReady={getTileSetInfo} />
      <DebugGeoJsonSelector
        initialSrc={FOOTPRINT_GEOJSON_SOURCES.VORONOI.url}
        debug={true}
        renderPoint={false}
      />
    </>
  );
}
export default View;
