import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { removeLayer } from '../../store/slices/mapping';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

interface LayerButtonProps {
  title: string;
  id: string;
}

const LayerButton = ({ title, id }: LayerButtonProps) => {
  const dispatch = useDispatch();
  const [openSettings, setOpenSettings] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = { transform: CSS.Translate.toString(transform) };
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        ref={setNodeRef}
        onClick={() => setOpenSettings(true)}
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
      {openSettings && (
        <div
          className="bg-white shadow-lg rounded-3xl w-96 h-10"
          onClick={() => setOpenSettings(false)}
        ></div>
      )}
    </div>
  );
};

export default LayerButton;
