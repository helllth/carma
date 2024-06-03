import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { removeLayer } from '../../store/slices/mapping';

interface LayerButtonProps {
  title: string;
  id: string;
}

const LayerButton = ({ title, id }: LayerButtonProps) => {
  const dispatch = useDispatch();
  return (
    <div className="w-fit min-w-max flex items-center gap-2 px-3 bg-white rounded-3xl h-8 z-[99999999] shadow-lg">
      <span className="text-sm font-medium">{title}</span>
      <FontAwesomeIcon
        icon={faX}
        className="p-1"
        role="button"
        onClick={() => dispatch(removeLayer(id))}
      />
    </div>
  );
};

export default LayerButton;
