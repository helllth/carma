//import 'bootstrap/dist/css/bootstrap.min.css';

import CustomCesiumWidget from '../../../components/CustomCesiumWidget';

const TOELLETURM = {
  position: { longitude: 7.201578, latitude: 51.256565, height: 335 },
};
const RATHAUS = {
  position: { longitude: 7.20028, latitude: 51.27174, height: 155 },
  range: 100,
  polygon: [
    { lng: 7.2028, lat: 51.27174 },
    { lng: 7.201578, lat: 51.27174 },
    { lng: 7.201578, lat: 51.256565 },
    { lng: 7.2028, lat: 51.256565 },
  ],
};

function View() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <CustomCesiumWidget
        position={TOELLETURM.position}
        clip={true}
        pixelSize={{ width: 512, height: 512 }}
      />
      <CustomCesiumWidget
        position={TOELLETURM.position}
        pixelSize={{ width: 512, height: 512 }}
      />
      <CustomCesiumWidget
        position={TOELLETURM.position}
        clip={true}
        orthographic={true}
        pixelSize={{ width: 512, height: 512 }}
      />
      <CustomCesiumWidget
        position={TOELLETURM.position}
        orthographic={true}
        pixelSize={{ width: 512, height: 512 }}
      />
      <CustomCesiumWidget
        position={RATHAUS.position}
        range={RATHAUS.range}
        clip={true}
        pixelSize={{ width: 512, height: 512 }}
      />
      <CustomCesiumWidget
        position={RATHAUS.position}
        range={RATHAUS.range}
        pixelSize={{ width: 512, height: 512 }}
      />
      <CustomCesiumWidget
        position={RATHAUS.position}
        range={RATHAUS.range}
        clip={true}
        orthographic={true}
        pixelSize={{ width: 512, height: 512 }}
      />
      <CustomCesiumWidget
        position={RATHAUS.position}
        range={RATHAUS.range}
        orthographic={true}
        pixelSize={{ width: 512, height: 512 }}
      />
    </div>
  );
}

export default View;
