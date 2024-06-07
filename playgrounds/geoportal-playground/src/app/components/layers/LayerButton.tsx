import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faLayerGroup, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '../../helper/helper';
import {
  getSelectedLayerIndex,
  removeLayer,
  setSelectedLayerIndex,
} from '../../store/slices/mapping';
import SecondaryView from './SecondaryView';
import { iconColorMap, iconMap } from './items';
import './tabs.css';

interface LayerButtonProps {
  title: string;
  id: string;
  opacity: number;
  index: number;
  description?: string;
  icon?: string;
  layer: Layer;
}

const LayerButton = ({
  title,
  id,
  opacity,
  index,
  description,
  icon,
  layer,
}: LayerButtonProps) => {
  const dispatch = useDispatch();
  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
  const showSettings = index === selectedLayerIndex;
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
        dispatch(setSelectedLayerIndex(-1));
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={buttonRef}>
      <div
        ref={setNodeRef}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setSelectedLayerIndex(showSettings ? -1 : index));
        }}
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          'w-fit min-w-max flex items-center gap-2 px-3 rounded-[10px] h-8 z-[99999999] button-shadow',
          selectedLayerIndex === -1
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
        <span className="text-base">{title}</span>
        <button
          className="p-1 hover:text-gray-500 text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(removeLayer(id));
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      {showSettings && (
        <SecondaryView
          icon={icon}
          title={title}
          opacity={opacity}
          id={id}
          description={description}
          legend={layer.legend}
          ref={infoRef}
        />
      )}
    </div>
  );
};

export default LayerButton;
