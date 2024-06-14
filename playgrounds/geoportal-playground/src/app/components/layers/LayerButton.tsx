import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faEye, faLayerGroup, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '../../helper/helper';
import {
  getLayers,
  getSelectedLayerIndex,
  removeLayer,
  setSelectedLayerIndex,
  setShowLeftScrollButton,
  setShowRightScrollButton,
} from '../../store/slices/mapping';
import SecondaryView from './SecondaryView';
import { iconColorMap, iconMap } from './items';
import './tabs.css';
import { useInView } from 'react-intersection-observer';
import { getShowLayerHideButtons } from '../../store/slices/ui';
// import { faCircle } from '@fortawesome/free-regular-svg-icons';

interface LayerButtonProps {
  title: string;
  id: string;
  index: number;
  icon?: string;
  layer: Layer;
  background?: boolean;
}

const LayerButton = ({
  title,
  id,
  index,
  icon,
  layer,
  background,
}: LayerButtonProps) => {
  const { ref, inView } = useInView({
    threshold: 0.99,
  });
  const dispatch = useDispatch();
  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
  const showLayerHideButtons = useSelector(getShowLayerHideButtons);
  const showSettings = index === selectedLayerIndex;
  const layersLength = useSelector(getLayers).length;
  let urlPrefix = window.location.origin + window.location.pathname;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });
  const infoRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const style = { transform: CSS.Translate.toString(transform) };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        infoRef.current &&
        !infoRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        dispatch(setSelectedLayerIndex(-2));
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!inView && index === -1) {
      dispatch(setShowLeftScrollButton(true));
    }
    if (!inView && index === layersLength - 1) {
      dispatch(setShowRightScrollButton(true));
    }
    if (inView && index === -1) {
      dispatch(setShowLeftScrollButton(false));
    }
    if (inView && index === layersLength - 1) {
      dispatch(setShowRightScrollButton(false));
    }
    if (!inView && selectedLayerIndex === index) {
      document.getElementById(`layer-${id}`).scrollIntoView();
    }
  }, [inView, selectedLayerIndex]);

  return (
    <div
      ref={(el) => {
        buttonRef.current = el;
        ref(el);
      }}
      className={cn(
        '',
        index === -1 && 'ml-auto',
        index === layersLength - 1 && 'mr-auto'
      )}
      id={`layer-${id}`}
    >
      <div
        ref={setNodeRef}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setSelectedLayerIndex(showSettings ? -2 : index));
        }}
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          'w-fit min-w-max flex items-center gap-2 px-3 rounded-[10px] h-8 z-[99999999] button-shadow',
          selectedLayerIndex === -2
            ? 'bg-white'
            : showSettings
            ? 'bg-white'
            : 'bg-neutral-200'
        )}
      >
        {icon === 'ortho' ? (
          <div style={{ height: 14, width: 14 }}>
            <img
              src={urlPrefix + 'images/ortho.png'}
              alt="Ortho"
              className="h-full"
            />
          </div>
        ) : (
          <FontAwesomeIcon
            icon={icon ? iconMap[icon] : faLayerGroup}
            className="text-base"
            style={{ color: iconColorMap[icon] }}
            id="icon"
          />
        )}
        {!background && (
          <>
            <span className="text-base">{title}</span>
            <button
              className="hover:text-gray-500 text-gray-600 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeLayer(id));
              }}
            >
              <FontAwesomeIcon icon={showLayerHideButtons ? faEye : faX} />
            </button>
          </>
        )}
      </div>
      {showSettings && (
        <SecondaryView
          icon={icon}
          layer={layer}
          ref={infoRef}
          background={background}
        />
      )}
    </div>
  );
};

export default LayerButton;
