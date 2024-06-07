import React from 'react';
import { FOOTPRINT_GEOJSON_SOURCES } from '../../../config/dataSources.config';
import GeoJsonSelector from '../../../components/obsolete/GeoJsonSelector';
import { useState } from 'react';
import RadioSelector from '../../../components/UI/RadioSelector';
import { useTilesetControl } from '../../../utils/controls';

const jsonOptions = Object.entries(FOOTPRINT_GEOJSON_SOURCES).map(
  ([key, { url, name }]) => ({
    label: name,
    value: url,
  })
);

const DebugGeoJsonSelector = ({ initialSrc, debug, renderPoint }) => {
  const [show, setShow] = useState(true);
  const [src, setSrc] = useState(initialSrc);

  useTilesetControl();

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
  console.log('View Test Geojson.tsx');
  return (
    <DebugGeoJsonSelector
      initialSrc={FOOTPRINT_GEOJSON_SOURCES.VORONOI.url}
      debug={true}
      renderPoint={false}
    />
  );
}
export default View;
