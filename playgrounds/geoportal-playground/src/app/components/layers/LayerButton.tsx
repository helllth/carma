import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { removeLayer } from '../../store/slices/mapping';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Slider } from 'antd';

interface LayerButtonProps {
  title: string;
  id: string;
  opacity: number;
}

const LayerButton = ({ title, id, opacity }: LayerButtonProps) => {
  console.log('opacity', opacity);
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
        onClick={() => setOpenSettings(!openSettings)}
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
        <div className="bg-white shadow-lg rounded-3xl w-96 h-10 flex items-center gap-2 p-2 text-center">
          <label className="mb-0">Transparenz</label>
          <Slider
            value={opacity}
            min={0}
            max={1}
            step={0.1}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default LayerButton;
