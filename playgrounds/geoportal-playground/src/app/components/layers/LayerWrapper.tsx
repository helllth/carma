import { useDispatch, useSelector } from 'react-redux';
import {
  getLayers,
  getSelectedLayerIndex,
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
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../../helper/helper';
import './button.css';

const LayerWrapper = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { routedMapRef } = useContext(TopicMapContext);
  const layers = useSelector(getLayers);
  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
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
        className="absolute flex items-center justify-center gap-2 w-[calc(100%-60px)] left-20 pr-72 top-2.5 z-[999]"
      >
        <div
          className={cn(
            'w-fit min-w-max flex items-center gap-2 px-3 rounded-[10px] h-8 z-[99999999] button-shadow',
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
    </DndContext>
  );
};

export default LayerWrapper;
