import { useSelector } from 'react-redux';
import { getLayers } from '../../store/slices/mapping';
import LayerButton from './LayerButton';

const LayerWrapper = () => {
  const layers = useSelector(getLayers);

  return (
    <div
      id="buttonWrapper"
      className="absolute flex items-center gap-2 w-[calc(100%-60px)] left-20 top-2.5 z-[999]"
    >
      {layers.map((layer) => (
        <LayerButton title={layer.title} id={layer.id} />
      ))}
    </div>
  );
};

export default LayerWrapper;
