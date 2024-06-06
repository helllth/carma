import { useDispatch, useSelector } from 'react-redux';
import {
  getLayers,
  getSelectedLayerIndex,
  getShowLeftScrollButton,
  getShowRightScrollButton,
  setLayers,
  setSelectedLayerIndex,
} from '../../store/slices/mapping';
import LayerButton from './LayerButton';
import {
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { TopicMapContext } from 'react-cismap/contexts/TopicMapContextProvider';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMap,
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '../../helper/helper';
import './button.css';

const LayerWrapper = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { routedMapRef } = useContext(TopicMapContext);
  const layers = useSelector(getLayers);
  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
  const showLeftScrollButton = useSelector(getShowLeftScrollButton);
  const showRightScrollButton = useSelector(getShowRightScrollButton);
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  const getLayerPos = (id) => layers.findIndex((layer) => layer.id === id);

  const handleDragEnd = (event) => {
    routedMapRef?.leafletMap?.leafletElement.dragging.enable();
    const { active, over } = event;
    if (active.id !== over.id) {
      const originalPos = getLayerPos(active.id);
      const newPos = getLayerPos(over.id);
      const newLayers = arrayMove(layers, originalPos, newPos);

      dispatch(setLayers(newLayers));
      dispatch(setSelectedLayerIndex(newPos));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } })
  );

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      onDragStart={() =>
        routedMapRef?.leafletMap?.leafletElement.dragging.disable()
      }
    >
      <div
        ref={setNodeRef}
        style={style}
        id="buttonWrapper"
        className="absolute w-[calc(100%-60px)] left-20 pr-[20px] top-2.5 z-[999]"
      >
        <div className="relative w-full">
          {showLeftScrollButton && (
            <div
              className={cn(
                'absolute left-0 bg-white w-fit min-w-max flex items-center gap-2 px-3 rounded-3xl h-8 z-[99999999] button-shadow'
              )}
              role="button"
              onClick={() => {
                document.getElementById('test').scrollLeft -= 200;
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          )}
          {showRightScrollButton && (
            <div
              className={cn(
                'absolute right-0 bg-white w-fit min-w-max flex items-center gap-2 px-3 rounded-3xl h-8 z-[99999999] button-shadow'
              )}
              role="button"
              onClick={() => {
                document.getElementById('test').scrollLeft += 200;
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          )}
          <div
            id="test"
            className="w-full scroll-smooth overflow-x-hidden flex items-center gap-2"
          >
            <div
              className={cn(
                'w-fit min-w-max flex items-center gap-2 px-3 rounded-3xl h-8 z-[99999999] button-shadow',
                selectedLayerIndex === -1 ? 'bg-white' : 'bg-neutral-200'
              )}
            >
              <FontAwesomeIcon icon={faMap} />
            </div>
            <SortableContext
              items={layers}
              strategy={horizontalListSortingStrategy}
            >
              {layers.map((layer, i) => (
                <LayerButton
                  title={layer.title}
                  id={layer.id}
                  opacity={layer.opacity}
                  index={i}
                  description={layer.description}
                  icon={
                    layer.title.includes('Orthofoto')
                      ? 'ortho'
                      : layer.title === 'Bäume'
                      ? 'bäume'
                      : layer.title.includes('gärten')
                      ? 'gärten'
                      : undefined
                  }
                  layer={layer}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default LayerWrapper;
