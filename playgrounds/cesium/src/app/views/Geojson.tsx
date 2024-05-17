import { Cesium3DTileset } from 'resium';
import { Cartesian3 } from 'cesium';
import { logTileSetInfoOnReady } from '../../lib/cesiumHelpers';
import CustomViewer from '../components/CustomViewer';
import { WUPP3D, FOOTPRINT_GEOJSON_SOURCES, WUPPERTAL } from '../config';
import GeoJsonSelector from '../components/GeoJsonSelector';

const home = Cartesian3.fromDegrees(
  WUPPERTAL.position.lon,
  WUPPERTAL.position.lat,
  WUPPERTAL.ground
);

function App() {
  return (
    <CustomViewer initialPos={home} homePos={home}>
      <Cesium3DTileset url={WUPP3D.url} onReady={logTileSetInfoOnReady} />

      <GeoJsonSelector src={FOOTPRINT_GEOJSON_SOURCES.VORONOI.url} />
    </CustomViewer>
  );
}

export default App;
