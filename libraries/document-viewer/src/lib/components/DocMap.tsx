// @ts-ignore
import { RoutedMap } from 'react-cismap';

const DocMap = () => {
  return (
    <RoutedMap
      style={{ height: 1000, width: 1000, backgroundColor: 'white' }}
      backgroundLayers="no"
      minZoom={1}
      maxZoom={6}
      zoomSnap={0.1}
      zoomDelta={1}
    ></RoutedMap>
  );
};

export default DocMap;
