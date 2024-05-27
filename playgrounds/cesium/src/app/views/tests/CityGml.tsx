import React from 'react';
import { Cesium3DTileset } from 'resium';
import { Cesium3DTileStyle } from 'cesium';
import { getTileSetInfo } from '../../utils/cesiumHelpers';
import { FOOTPRINT_GEOJSON_SOURCES, CITYGML_TEST_TILESET } from '../../config';
import GeoJsonSelector from '../../components/obsolete/GeoJsonSelector';
import { useState } from 'react';
import RadioSelector from '../../components/UI/RadioSelector';
import { useTilesetControl } from '../../utils/controls';

const jsonOptions = Object.entries(FOOTPRINT_GEOJSON_SOURCES).map(
  ([key, { url, name }]) => ({
    label: name,
    value: url,
  })
);
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
          top: 100,
          padding: '0 10px',
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
          top: 70,
          padding: '0 10px',
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
