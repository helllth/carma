import { Button, Checkbox, Radio, message } from 'antd';
import { useSelector } from 'react-redux';
import { getBackgroundLayer, getLayers } from '../store/slices/mapping';
import LZString from 'lz-string';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import './popover.css';

const Share = () => {
  const backgroundLayer = useSelector(getBackgroundLayer);
  const activeLayers = useSelector(getLayers);
  const [searchParams, setSearchParams] = useSearchParams();
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();
  const [mode, setMode] = useState('');
  const [settings, setSettings] = useState({
    showLayerButtons: true,
    layerButtonsDeletable: true,
  });
  return (
    <div className="p-2 flex flex-col gap-3">
      {contextHolder}
      <h4>Teilen</h4>
      <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
        <div className="flex items-center gap-1">
          <h5 className="mb-0 pr-2">Modus:</h5>
          <Radio value={''}>Geoportal</Radio>
          <Radio value={'context'}>Publish</Radio>
        </div>
      </Radio.Group>
      <Checkbox
        checked={settings.showLayerButtons}
        onChange={(e) =>
          setSettings({ ...settings, showLayerButtons: e.target.checked })
        }
      >
        Layer Buttons anzeigen
      </Checkbox>
      <Checkbox
        checked={settings.layerButtonsDeletable}
        onChange={(e) =>
          setSettings({ ...settings, layerButtonsDeletable: e.target.checked })
        }
        disabled={!settings.showLayerButtons}
      >
        Layer Buttons entfernbar
      </Checkbox>
      <Button
        onClick={() => {
          const newConfig = {
            backgroundLayer: backgroundLayer,
            layers: activeLayers,
          };
          const jsonString = JSON.stringify(newConfig);
          const compressed = LZString.compressToEncodedURIComponent(jsonString);
          try {
            const baseUrl = window.location.origin + window.location.pathname;
            const queryString = new URLSearchParams(searchParams).toString();
            const url = `${baseUrl}#/?data=${compressed}&${queryString}`;
            copyToClipboard(url);
            messageApi.open({
              type: 'success',
              content: `Link wurde in die Zwischenablage kopiert.`,
            });
          } catch {
            messageApi.open({
              type: 'error',
              content: `Es gab einen Fehler beim kopieren des Links`,
            });
          }
        }}
      >
        Link kopieren
      </Button>
    </div>
  );
};

export default Share;
