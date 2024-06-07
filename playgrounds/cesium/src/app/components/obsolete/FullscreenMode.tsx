import { useCesium } from 'resium';

const FullScreenMode = () => {
  const { viewer } = useCesium();
  return (
    <div className="leaflet-control-fullscreen leaflet-bar leaflet-control">
      <button
        className="leaflet-control-fullscreen-button leaflet-bar-part"
        title="Vollbildmodus"
        onClick={() => {
          console.log('fullscreen handling not implemented', viewer);
        }}
      ></button>
    </div>
  );
};

export default FullScreenMode;
