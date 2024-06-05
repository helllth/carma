import {
  faChevronLeft,
  faChevronRight,
  faInfo,
  faX,
  faCircle,
  faGlobe,
  faMap,
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
import { faSquare } from '@fortawesome/free-regular-svg-icons';
// import { faCircle } from '@fortawesome/free-regular-svg-icons';

interface LayerButtonProps {
  title: string;
  id: string;
  opacity: number;
  index: number;
  description?: string;
  icon?: string;
}

const iconMap = {
  bäume: faCircle,
  gärten: faSquare,
  ortho: faGlobe,
};

const iconColorMap = {
  bäume: 'green',
  gärten: 'purple',
  ortho: 'black',
};

const LayerButton = ({
  title,
  id,
  opacity,
  index,
  description,
  icon,
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
        className={cn(
          'w-fit min-w-max flex items-center gap-2 px-3 rounded-3xl h-8 z-[99999999] button-shadow',
          selectedLayerIndex === -1
            ? 'bg-white'
            : showSettings
            ? 'bg-white'
            : 'bg-neutral-200'
        )}
      >
        <FontAwesomeIcon
          icon={icon ? iconMap[icon] : faMap}
          className="text-base p-1"
          style={{ color: iconColorMap[icon] }}
        />
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
              `bg-white rounded-3xl 2xl:w-1/2 w-full flex flex-col relative px-10 gap-2 py-2`,
              showInfo ? 'h-56' : 'h-12'
            )}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-base absolute top-4 left-2.5"
              role="button"
              onClick={() => dispatch(setPreviousSelectedLayerIndex())}
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-base absolute top-4 right-2.5"
              role="button"
              onClick={() => dispatch(setNextSelectedLayerIndex())}
            />
            <div className="flex items-center h-8 gap-6">
              <div className="w-1/4 min-w-max truncate flex items-center gap-2">
                <label className="mb-0 text-sm font-medium" htmlFor="icon">
                  {title}:
                </label>
                <FontAwesomeIcon
                  icon={icon ? iconMap[icon] : faMap}
                  className="text-base"
                  style={{ color: iconColorMap[icon] }}
                />
              </div>
              <div className="w-full flex items-center gap-2">
                <label
                  className="mb-0 text-sm font-medium"
                  htmlFor="opacity-slider"
                >
                  Transparenz:
                </label>
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
                  id="opacity-slider"
                />
              </div>
              <FontAwesomeIcon
                icon={faInfo}
                className="text-base"
                onClick={() => dispatch(setShowInfo(!showInfo))}
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
