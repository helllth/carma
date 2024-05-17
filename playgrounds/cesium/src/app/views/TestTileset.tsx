import { Cartesian3, Color } from 'cesium';
import { Cesium3DTileset, Entity } from 'resium';
import { getModelMatrix } from '../../lib/cesiumHelpers';
import CustomViewer from '../components/CustomViewer';

import { WUPP3D, WUPPERTAL } from '../config';

const modelMatrix = getModelMatrix(WUPP3D);
const pos = WUPPERTAL.position;
const home = Cartesian3.fromDegrees(pos.lon, pos.lat, WUPPERTAL.ground);

function TestTileset() {
  return (
    <CustomViewer className="App" homePos={home} initialPos={home}>
      <Cesium3DTileset
        //url="https://wupp-3d-data.cismet.de/mesh/tileset.json"
        url={WUPP3D.url}
        modelMatrix={modelMatrix}
      />
      <Entity position={home} point={{ pixelSize: 15, color: Color.YELLOW }} />
    </CustomViewer>
  );
}

export default TestTileset;
