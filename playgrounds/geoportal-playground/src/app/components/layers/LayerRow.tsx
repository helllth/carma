import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  faEye,
  faEyeSlash,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Slider } from 'antd';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';
import { useDispatch } from 'react-redux';
import { changeOpacity, changeVisibility } from '../../store/slices/mapping';

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
      <div className="lg:max-w-80 max-w-44 w-full flex items-center gap-2">
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
      <button
        className="hover:text-gray-500 text-gray-600 flex items-center justify-center"
        onClick={(e) => {
          if (layer.visible) {
            dispatch(changeVisibility({ id, visible: false }));
          } else {
            dispatch(changeVisibility({ id, visible: true }));
          }
        }}
      >
        <FontAwesomeIcon icon={layer.visible ? faEye : faEyeSlash} />
      </button>
    </div>
  );
};

export default LayerRow;
