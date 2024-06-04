import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeOpacity,
  getSelectedLayerIndex,
  removeLayer,
  setSelectedLayerIndex,
} from '../../store/slices/mapping';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slider } from 'antd';

interface LayerButtonProps {
  title: string;
  id: string;
  opacity: number;
  index: number;
}

const LayerButton = ({ title, id, opacity, index }: LayerButtonProps) => {
  const dispatch = useDispatch();
  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
  const showSettings = index === selectedLayerIndex;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = { transform: CSS.Translate.toString(transform) };
  return (
    <>
      <div
        ref={setNodeRef}
        onClick={() =>
          dispatch(setSelectedLayerIndex(showSettings ? -1 : index))
        }
        style={style}
        {...listeners}
        {...attributes}
        className="w-fit relative min-w-max flex items-center gap-2 px-3 bg-white rounded-3xl h-8 z-[99999999] shadow-lg"
      >
        <span className="text-sm font-medium">{title}</span>
        <FontAwesomeIcon
          icon={faX}
          className="p-1"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            dispatch(removeLayer(id));
          }}
        />
        {showSettings && (
          <div className="bg-white absolute top-12 shadow-lg rounded-3xl w-96 h-10 flex items-center gap-2 p-2">
            <label className="mb-0">Transparenz</label>
            <Slider
              onChange={(value) =>
                dispatch(changeOpacity({ id, opacity: value }))
              }
              value={opacity}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default LayerButton;
