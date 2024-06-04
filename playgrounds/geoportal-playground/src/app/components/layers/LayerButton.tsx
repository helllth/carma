import {
  faChevronLeft,
  faChevronRight,
  faInfo,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeOpacity,
  getSelectedLayerIndex,
  removeLayer,
  setNextSelectedLayerIndex,
  setPreviousSelectedLayerIndex,
  setSelectedLayerIndex,
} from '../../store/slices/mapping';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slider } from 'antd';
import { useContext } from 'react';
import { TopicMapContext } from 'react-cismap/contexts/TopicMapContextProvider';

interface LayerButtonProps {
  title: string;
  id: string;
  opacity: number;
  index: number;
}

const LayerButton = ({ title, id, opacity, index }: LayerButtonProps) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { routedMapRef } = useContext(TopicMapContext);
  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
  const showSettings = index === selectedLayerIndex;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = { transform: CSS.Translate.toString(transform) };
  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        onClick={() =>
          dispatch(setSelectedLayerIndex(showSettings ? -1 : index))
        }
        style={style}
        {...listeners}
        {...attributes}
        className="w-fit min-w-max flex items-center gap-2 px-3 bg-white rounded-3xl h-8 z-[99999999] shadow-lg"
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
      </div>
      {showSettings && (
        <div className="bg-white absolute top-12 shadow-lg rounded-3xl w-96 h-10 flex items-center gap-2 p-2">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-base"
            role="button"
            onClick={() => dispatch(setPreviousSelectedLayerIndex())}
          />
          <label className="mb-0 text-md font-medium">Transparenz</label>
          <Slider
            onFocus={() => {
              routedMapRef?.leafletMap?.leafletElement.dragging.disable();
            }}
            onChange={(value) => {
              dispatch(changeOpacity({ id, opacity: value }));
            }}
            onChangeComplete={() => {
              routedMapRef?.leafletMap?.leafletElement.dragging.enable();
            }}
            value={opacity}
            min={0}
            max={1}
            step={0.1}
            className="w-full"
          />
          <FontAwesomeIcon icon={faInfo} className="text-base" />
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-base"
            role="button"
            onClick={() => dispatch(setNextSelectedLayerIndex())}
          />
        </div>
      )}
    </div>
  );
};

export default LayerButton;
