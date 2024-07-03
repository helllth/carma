import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appendSavedLayerConfig, getLayers } from '../store/slices/mapping';
import './popover.css';
import { nanoid } from '@reduxjs/toolkit';

const Save = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const dispatch = useDispatch();
  const layers = useSelector(getLayers);

  return (
    <div className="p-2 flex flex-col gap-3 w-80">
      {contextHolder}
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
      <label className="mb-0" htmlFor="thumbnail">
        Vorschaubild:
      </label>
      <Input
        id="thumbnail"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />

      <Button
        onClick={() => {
          const config = {
            title,
            description,
            type: 'collection',
            layers,
            thumbnail,
            id: nanoid(),
          };
          try {
            dispatch(appendSavedLayerConfig(config));
            setTitle('');
            setDescription('');
            messageApi.open({
              type: 'success',
              content: `Konfiguration "${title}" wurde erfolgreich gespeichert.`,
            });
          } catch (e) {
            messageApi.open({
              type: 'error',
              content: 'Es gab einen Fehler beim speichern der Konfiguration',
            });
          }
        }}
      >
        Konfiguration Speichern
      </Button>
    </div>
  );
};

export default Save;
