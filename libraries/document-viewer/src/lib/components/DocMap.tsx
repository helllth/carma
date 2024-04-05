// @ts-ignore
import { RoutedMap, TransitiveReactLeaflet } from 'react-cismap';
import { Doc, layer } from '../document-viewer';
import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import CismapLayer from 'react-cismap/CismapLayer';
// @ts-ignore
import Raster from 'leaflet-rastercoords';
// @ts-ignore
import L from 'leaflet';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const { Rectangle } = TransitiveReactLeaflet;

L.RasterCoords = Raster;

interface DocMapsProps {
  docs: Doc[];
  index: number;
  height: number;
  width: number;
}

const DocMap = ({ docs, index, height, width }: DocMapsProps) => {
  const [layer, setLayer] = useState<
    | {
        layerUrl: string;
        layerBounds: { lat: number; lng: number }[][];
        meta: {
          contentLength: string;
          pages: number;
          object: layer;
        };
        maxZoom: number;
        fallbackZoom: number;
        fallbackPosition: { lat: number; lng: number };
        bounds: any;
      }
    | undefined
  >();
  const { page } = useParams();
  const leafletMapRef = useRef<L.Map>(null);

  const getPureArrayBounds4LatLngBounds = (llBounds: any) => {
    return [
      [llBounds[0][0].lat, llBounds[0][0].lng],
      [llBounds[0][1].lat, llBounds[0][1].lng],
    ];
  };

  const getLayer = async () => {
    try {
      const meta = docs[index - 1].meta;

      let layerUrl = docs[index - 1].layer;

      if (meta) {
        // @ts-ignore
        if (meta.pages > 1) {
          layerUrl = layerUrl.replace('.pdf/', `.pdf-${parseInt(page!) - 1}/`);
        }

        const pageNumber = parseInt(page!);

        const dimensions = [
          meta['layer' + `${pageNumber - 1}`].x,
          meta['layer' + `${pageNumber - 1}`].y,
        ];

        const maxZoom = meta['layer' + `${pageNumber - 1}`].maxZoom;

        const zoomLevel = Math.ceil(
          Math.log(Math.max(dimensions[0], dimensions[1]) / 256) / Math.log(2)
        );
        // const meta = {};

        let layerBounds;

        if (leafletMapRef.current) {
          const rc = new L.RasterCoords(
            leafletMapRef.current.leafletMap.leafletElement,
            dimensions
          );
          layerBounds = [
            [
              rc.unproject([0, 0], zoomLevel),
              rc.unproject([dimensions[0], dimensions[1]], zoomLevel),
            ],
          ];
        }

        const bounds = getPureArrayBounds4LatLngBounds(layerBounds);
        const fallbackPosition = {
          lat: (layerBounds![0][0].lat + layerBounds![0][1].lat) / 2,
          lng: (layerBounds![0][0].lng + layerBounds![0][1].lng) / 2,
        };

        const fallbackZoom =
          leafletMapRef.current.leafletMap.leafletElement.getBoundsZoom(bounds);

        const layer = {
          layerUrl,
          meta,
          layerBounds,
          maxZoom: maxZoom,
          bounds,
          fallbackPosition,
          fallbackZoom,
        };
        // @ts-ignore
        setLayer(layer);
      } else {
        setLayer(undefined);
      }
    } catch (e) {
      console.log(e);
      setLayer(undefined);
    }
  };

  useEffect(() => {
    if (docs.length > 0 && index) {
      getLayer();
    }
  }, [index, docs, page]);

  return (
    <RoutedMap
      style={{ height: height, width: width, backgroundColor: 'white' }}
      backgroundLayers="no"
      minZoom={1}
      maxZoom={6}
      zoomSnap={0.1}
      zoomDelta={1}
      fallbackPosition={layer?.fallbackPosition}
      fallbackZoom={layer?.fallbackZoom}
      referenceSystem={L.CRS.Simple}
      fullScreenControlEnabled={true}
      ref={leafletMapRef}
      key={'leafletRoutedMap.' + index + layer?.layerUrl}
    >
      {layer?.layerUrl && (
        <>
          <Rectangle bounds={layer.bounds} color="#D8D8D8D8" />
          <CismapLayer
            {...{
              type: 'tiles',
              url: layer.layerUrl,
              bounds: layer.layerBounds,
              minNativeZoom: 1,
              tms: true,
              noWrap: true,
              maxNativeZoom: layer.maxZoom || 4,
              key:
                'tileLayer.' +
                JSON.stringify(layer.layerBounds) +
                '.' +
                layer.maxZoom,
            }}
          />
        </>
      )}
      <div className="leaflet-bottom leaflet-right">
        <div className="leaflet-control">
          <p
            style={{
              backgroundColor: '#D8D8D8D8',
              padding: '5px',
            }}
          >
            {docs[index - 1].file}
          </p>
        </div>
      </div>
    </RoutedMap>
  );
};

export default DocMap;
