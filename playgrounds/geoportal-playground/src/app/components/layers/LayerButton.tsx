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
  getShowInfo,
  removeLayer,
  setNextSelectedLayerIndex,
  setPreviousSelectedLayerIndex,
  setSelectedLayerIndex,
  setShowInfo,
} from '../../store/slices/mapping';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slider } from 'antd';
import { useContext, useRef, useState } from 'react';
import { TopicMapContext } from 'react-cismap/contexts/TopicMapContextProvider';
import { cn } from '../../helper/helper';

interface LayerButtonProps {
  title: string;
  id: string;
  opacity: number;
  index: number;
  description?: string;
}

const LayerButton = ({
  title,
  id,
  opacity,
  index,
  description,
}: LayerButtonProps) => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { routedMapRef } = useContext(TopicMapContext);
  const showInfo = useSelector(getShowInfo);
  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
  const showSettings = index === selectedLayerIndex;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = { transform: CSS.Translate.toString(transform) };
  return (
    <div>
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
        <div className="absolute top-12 w-[calc(100%-60px)] left-20 pr-72 z-[999] flex justify-center items-center">
          <div
            className={cn(
              `bg-white shadow-lg rounded-3xl w-1/2 flex flex-col gap-2 p-2`,
              showInfo ? 'h-56' : 'h-10'
            )}
          >
            <div className="flex items-center h-6 gap-6">
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
              <FontAwesomeIcon
                icon={faInfo}
                className="text-base"
                onClick={() => dispatch(setShowInfo(!showInfo))}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-base"
                role="button"
                onClick={() => dispatch(setNextSelectedLayerIndex())}
              />
            </div>

            {showInfo && (
              <>
                <h3>Informationen</h3>
                {description && <p>{description}</p>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LayerButton;
