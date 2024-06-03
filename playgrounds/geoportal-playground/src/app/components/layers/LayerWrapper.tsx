import { useDispatch, useSelector } from 'react-redux';
import { getLayers, setLayers } from '../../store/slices/mapping';
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

const LayerWrapper = () => {
  const dispatch = useDispatch();
  const layers = useSelector(getLayers);
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  const getLayerPos = (id) => layers.findIndex((layer) => layer.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const originalPos = getLayerPos(active.id);
      const newPos = getLayerPos(over.id);
      const newLayers = arrayMove(layers, originalPos, newPos);

      dispatch(setLayers(newLayers));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div
        ref={setNodeRef}
        style={style}
        id="buttonWrapper"
        className="absolute flex items-center gap-2 w-[calc(100%-60px)] left-20 top-2.5 z-[999]"
      >
        <SortableContext
          items={layers}
          strategy={horizontalListSortingStrategy}
        >
          {layers.map((layer) => (
            <LayerButton title={layer.title} id={layer.id} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default LayerWrapper;
