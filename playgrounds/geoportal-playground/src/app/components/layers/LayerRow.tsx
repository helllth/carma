import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LayerRowProps {
  title: string;
  id: string;
}

const LayerRow = ({ title, id }: LayerRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div
      style={style}
      {...listeners}
      {...attributes}
      className="w-full flex items-center gap-2"
    >
      <button
        ref={setNodeRef}
        className="flex items-center justify-center !cursor-grab"
      >
        <FontAwesomeIcon icon={faGripVertical} />
      </button>
      <p className="mb-0 text-lg">{title}</p>
    </div>
  );
};

export default LayerRow;
