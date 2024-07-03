import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appendSavedLayerConfig, getLayers } from '../store/slices/mapping';
import './popover.css';

const Save = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const layers = useSelector(getLayers);

  return (
    <div className="p-2 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faFileExport} className="text-xl" />
        <h4 className="mb-0">Speichern</h4>
      </div>
      <hr className="my-0" />
      <h5 className="-mb-1 text-lg">Einstellungen:</h5>

      <label className="mb-0" htmlFor="title">
        Name:
      </label>
      <Input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="mb-0" htmlFor="description">
        Beschreibung:
      </label>
      <Input.TextArea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button
        onClick={() => {
          const config = {
            title,
            description,
            type: 'collection',
            layers,
          };
          dispatch(appendSavedLayerConfig(config));
          setTitle('');
          setDescription('');
        }}
      >
        Konfiguration Speichern
      </Button>
    </div>
  );
};

export default Save;
