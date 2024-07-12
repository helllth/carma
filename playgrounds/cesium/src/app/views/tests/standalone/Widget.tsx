//import 'bootstrap/dist/css/bootstrap.min.css';

import { useTweakpaneCtx } from '@carma/debug-ui';
import CustomCesiumWidget from '../../../components/CustomCesiumWidget';
import { useState } from 'react';
import { LatLngRecord } from '../../../../';

type Poi = {
  label: string;
  position: PositionRecord;
  range?: number;
  clipBy?: {
    radius?: number;
    polygon?: LatLngRecord[];
  };
};

const POI = {
  TOELLETURM: {
    label: 'Toelleturm',
    position: { longitude: 7.201578, latitude: 51.256565, height: 335 + 10 },
    range: 30,
    clipBy: {
      radius: 15,
    },
  },
  RATHAUS: {
    label: 'Rathaus',
    position: { longitude: 7.19993, latitude: 51.27225, height: 170 },
    range: 150,
    clipBy: {
      radius: 120,
    },
  },
  KUGELGAS: {
    label: 'Kugelgasbehälter',
    position: { longitude: 7.08586, latitude: 51.24584, height: 190 },
    range: 60,
    clipBy: {
      radius: 30,
    },
  },
  STADION: {
    label: 'Stadion am Zoo',
    position: { longitude: 7.1049, latitude: 51.23916, height: 140 },
    range: 185,
    clipBy: {
      radius: 140,
    },
  },
  HBF: {
    label: 'Hauptbahnhof',
    position: { longitude: 7.1485164, latitude: 51.2559275, height: 150 },
    range: 80,
    clipBy: {
      radius: 60,
    },
  },
};

const options = Object.entries(POI).reduce((acc, [key, value]) => {
  acc[value.label] = key;
  return acc;
}, {});

type PositionRecord = LatLngRecord & { height: number };

function View() {
  const [poiKey, setPoiKey] = useState<string>('TOELLETURM');
  const [orthographic, setOrthographic] = useState<boolean>(true);

  const [poi, setPoi] = useState<Poi | null>(POI[poiKey]);
  const [debug, setDebug] = useState<boolean>(true);
  const [animate, setAnimate] = useState<boolean>(false);

  useTweakpaneCtx(
    {
      title: 'MiniView CesiumWidget',
    },
    {
      get poi() {
        return poiKey;
      },
      set poi(v) {
        setPoiKey(v);
        setPoi(POI[v]);
      },

      get debug() {
        return debug;
      },
      set debug(value: boolean) {
        setDebug(value);
      },
      get orthographic() {
        return orthographic;
      },
      set orthographic(value: boolean) {
        setOrthographic(value);
      },
      get animate() {
        return animate;
      },
      set animate(value: boolean) {
        setAnimate(value);
      },
    },

    [
      {
        name: 'poi',
        options,
      },
      { name: 'debug', type: 'boolean' },
      { name: 'orthographic', type: 'boolean' },
      { name: 'animate', type: 'boolean' },
    ]
  );

  console.log('RENDER Widget Test View', { poi, debug });

  return (
    poi && (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#bbb',
        }}
      >
        <CustomCesiumWidget
          position={poi.position}
          range={poi.range}
          clip={false}
          clipRadius={poi.clipBy?.radius}
          orthographic={orthographic}
          pixelSize={{ width: 512, height: 512 }}
          debug={debug}
          animate={animate}
        >
          {poi.label} {orthographic ? 'orthographic' : 'perspective'}
        </CustomCesiumWidget>

        <CustomCesiumWidget
          position={poi.position}
          range={poi.range}
          clip={true}
          clipRadius={poi.clipBy?.radius}
          orthographic={orthographic}
          pixelSize={{ width: 512, height: 512 }}
          debug={debug}
          animate={animate}
        >
          {poi.label} {orthographic ? 'orthographic' : 'perspective'} clipped
        </CustomCesiumWidget>
      </div>
    )
  );
}

export default View;
