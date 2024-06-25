import { namedStyles } from './constants';
import CismapLayer from 'react-cismap/CismapLayer';
import objectAssign from 'object-assign';

interface backgroundLayersProps {
  layerString: string;
  namedMapStyle?: string;
  config?: any;
  layerConfig?: any;
}

export default function getBackgroundLayers({
  layerString,
  namedMapStyle = 'default',
  config = {
    layerSeparator: '|',
  },
  layerConfig,
}: backgroundLayersProps) {
  let namedStylesConfig = namedStyles;
  const layerArr = (layerString || '').split(config.layerSeparator || '|');
  let namedMapStyleExtension = namedMapStyle;
  if (namedMapStyleExtension === null || namedMapStyleExtension === '') {
    namedMapStyleExtension = 'default';
  }
  namedMapStyleExtension = '.' + namedMapStyleExtension;
  const getLayer = (layerWithNamedStyleExtension, options = {}) => {
    const layerAndNamedStyleArray = layerWithNamedStyleExtension.split('.');
    let namedStyleOptions = {};

    if (layerAndNamedStyleArray.length > 1) {
      //the last named style is overriding the ones before
      let first = true;
      for (const element of layerAndNamedStyleArray) {
        if (first) {
          first = false;
        } else {
          namedStyleOptions = objectAssign(
            {},
            namedStyleOptions,
            namedStylesConfig[element]
          );
        }
      }
    }
    let mergedOptions = objectAssign({}, namedStyleOptions, options);
    const layerGetter = createLayerFactoryFunction(
      layerAndNamedStyleArray[0],
      layerConfig
    );
    if (layerGetter) {
      return layerGetter(mergedOptions);
    } else {
      return null;
    }
  };

  return (
    <div key={'layer.' + layerString}>
      {layerArr.map((layerWithOptions) => {
        const layOp = layerWithOptions.split('@');
        if (!isNaN(parseInt(layOp[1], 10))) {
          const layerWithNamedStyleExtension =
            layOp[0] + namedMapStyleExtension;

          const layerOptions = {
            opacity: parseInt(layOp[1] || '100', 10) / 100.0,
          };
          return getLayer(layerWithNamedStyleExtension, layerOptions);
        }
        if (layOp.length === 2) {
          try {
            let layerOptions = JSON.parse(layOp[1]);
            let layerWithNamedStyleExtension =
              layOp[0] + namedMapStyleExtension;
            return getLayer(layerWithNamedStyleExtension, layerOptions);
          } catch (error) {
            console.error(error);
            console.error(
              'Problems during parsing of the layer options. Skip options. You will get the 100% Layer:' +
                layOp[0]
            );
            const layerWithNamedStyleExtension =
              layOp[0] + namedMapStyleExtension;
            return getLayer(layerWithNamedStyleExtension);
          }
        } else {
          const layerWithNamedStyleExtension =
            layOp[0] + namedMapStyleExtension;
          return getLayer(layerWithNamedStyleExtension);
        }
      })}
    </div>
  );
}

const createLayerFactoryFunction = (key, _conf = defaultLayerConf) => {
  let conf = {
    namedStyles: defaultLayerConf.namedStyles,
    defaults: defaultLayerConf.defaults,
    ..._conf,
  };

  switch ((conf.namedLayers[key] || {}).type) {
    case 'wms':
    case 'wmts':
      return (options) => {
        let params = { ...conf.defaults.wms, ...conf.namedLayers[key] };
        return (
          <CismapLayer
            key={key + JSON.stringify(options)}
            {...params}
            opacity={options.opacity}
            cssFilter={options['css-filter']}
            type="wmts"
          />
        );
      };
    case 'wms-nt':
    case 'wmts-nt':
      return (options) => {
        let params = { ...conf.defaults.wms, ...conf.namedLayers[key] };
        return (
          <CismapLayer
            key={key + JSON.stringify(options)}
            {...params}
            opacity={options.opacity}
            type="wmts-nt"
          />
        );
      };
    case 'tiles':
      return (options) => {
        let params = { ...conf.defaults.wms, ...conf.namedLayers[key] };

        return (
          <CismapLayer
            key={key + JSON.stringify(options)}
            {...params}
            opacity={options.opacity}
            cssFilter={options['css-filter']}
            type="tiles"
          />
        );
      };
    case 'vector':
      return (options) => {
        let params = { ...conf.defaults.vector, ...conf.namedLayers[key] };

        return (
          <CismapLayer
            keyIn={key + JSON.stringify(options)}
            {...params}
            opacity={options.opacity}
            type="vector"
          />
        );
      };
  }
};

export const defaultLayerConf = {
  namedStyles: {
    default: { opacity: 0.6 },
    night: {
      opacity: 0.9,
      'css-filter': 'filter:grayscale(0.9)brightness(0.9)invert(1)',
    },
    blue: {
      opacity: 1.0,
      'css-filter':
        'filter:sepia(0.5) hue-rotate(155deg) contrast(0.9) opacity(0.9) invert(0)',
    },
  },
  defaults: {
    wms: {
      format: 'image/png',
      tiled: 'true',
      maxZoom: 22,
      opacity: 0.6,
      version: '1.1.1',
      pane: 'backgroundLayers',
    },
    vector: {},
  },
  namedLayers: {
    'wupp-plan-live': {
      type: 'wms',
      url: 'https://geodaten.metropoleruhr.de/spw2/service',
      layers: 'spw2_light',
      tiled: 'false',
      version: '1.3.0',
    },
    trueOrtho2020: {
      type: 'wms',
      url: 'https://maps.wuppertal.de/karten',
      layers: 'R102:trueortho2020',
      transparent: true,
    },
    rvrSchrift: {
      type: 'wmts',
      url: 'https://geodaten.metropoleruhr.de/dop/dop_overlay?language=ger',
      layers: 'dop_overlay',
      version: '1.3.0',
      tiled: false,
      transparent: true,
    },
    amtlich: {
      type: 'tiles',
      url: 'https://geodaten.metropoleruhr.de/spw2?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=spw2_light&STYLE=default&FORMAT=image/png&TILEMATRIXSET=webmercator_hq&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    },
    basemap_relief: {
      type: 'vector',
      style:
        'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_top.json',
    },
    amtlichBasiskarte: {
      type: 'wmts',
      url: 'https://maps.wuppertal.de/karten',
      layers: 'abkf',
      transparent: true,
    },
  },
};
