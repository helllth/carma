import { useContext, useEffect } from 'react';
import { TopicMapContext } from 'react-cismap/contexts/TopicMapContextProvider';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const HomeButton = () => {
  // @ts-ignore
  const { routedMapRef } = useContext(TopicMapContext);

  useEffect(() => {
    if (routedMapRef?.leafletMap) {
      const map = routedMapRef.leafletMap.leafletElement;

      // @ts-ignore
      L.Control.Button = L.Control.extend({
        options: {
          position: 'topleft',
        },
        onAdd: function (map) {
          const container = L.DomUtil.create(
            'div',
            'leaflet-bar leaflet-control'
          );
          const button = L.DomUtil.create(
            'a',
            'leaflet-control-button',
            container
          );
          button.innerHTML = '<i class="fas fa-home fa-lg"></i>';
          L.DomEvent.disableClickPropagation(button);
          L.DomEvent.on(button, 'click', () => {
            map.panTo([51.27203462681256, 7.199971675872803], {
              animate: true,
            });
          });
          return container;
        },
        onRemove: function (map) {
          return this.div;
        },
      });

      // @ts-ignore
      const home = new L.Control.Button();
      home.addTo(map);
    }
  }, [routedMapRef]);
  return <div></div>;
};

export default HomeButton;
