import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Slider } from 'antd';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';
import { useDispatch } from 'react-redux';
import { changeOpacity } from '../../store/slices/mapping';

interface LayerRowProps {
  layer: Layer;
  id: string;
}

const LayerRow = ({ layer, id }: LayerRowProps) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div style={style} className="w-full flex items-center gap-2">
      <div className="max-w-80 w-full flex items-center gap-2">
        <button
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="flex items-center justify-center !cursor-grab"
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </button>
        <p className="mb-0 text-lg truncate">{layer.title}</p>
      </div>
      <Slider
        min={0}
        max={1}
        step={0.1}
        onChange={(value) => {
          dispatch(changeOpacity({ id: layer.id, opacity: value }));
        }}
        className="w-full"
        value={layer.opacity}
      />
    </div>
  );
};

export default LayerRow;
