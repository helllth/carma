import { Button, Checkbox, Input, Radio, message } from 'antd';
import { useSelector } from 'react-redux';
import { getBackgroundLayer, getLayers } from '../store/slices/mapping';
import LZString from 'lz-string';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import './popover.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

export type Settings = {
  showLayerButtons: boolean;
  showLayerHideButtons: boolean;
  showFullscreen: boolean;
  showLocator: boolean;
  showMeasurement: boolean;
  showHamburgerMenu?: boolean;
};

const Share = () => {
  const backgroundLayer = useSelector(getBackgroundLayer);
  const activeLayers = useSelector(getLayers);
  const [searchParams, setSearchParams] = useSearchParams();
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();
  const [mode, setMode] = useState('');
  const [customAppKey, setCustomAppKey] = useState('');
  const [settings, setSettings] = useState<Settings>({
    showLayerButtons: true,
    showLayerHideButtons: true,
    showFullscreen: true,
    showLocator: true,
    showMeasurement: true,
    showHamburgerMenu: true,
  });

  return (
    <div className="p-2 flex flex-col gap-3">
      {contextHolder}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faShareNodes} className="text-xl" />
        <h4 className="mb-0">Teilen als</h4>
      </div>
      <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
        <div className="flex items-center gap-1">
          <Radio value={''}>Geoportal Konfiguration</Radio>
          <Radio value={'publish/'}>Map Publishing</Radio>
        </div>
      </Radio.Group>
      <hr className="my-0" />
      <h5 className="-mb-1 text-lg">Einstellungen:</h5>
      <div className="flex items-center gap2">
        <label htmlFor="customAppKey" className="mb-0 w-1/4">
          App Key:
        </label>
        <Input
          id="customAppKey"
          type="text"
          value={customAppKey}
          onChange={(e) => setCustomAppKey(e.target.value)}
        />
      </div>
      <h5 className="mb-0">Layer</h5>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={settings.showLayerButtons}
          onChange={(e) =>
            setSettings({ ...settings, showLayerButtons: e.target.checked })
          }
          disabled={mode === ''}
        >
          Layer Buttons anzeigen
        </Checkbox>
        <Checkbox
          checked={!settings.showLayerHideButtons}
          onChange={(e) =>
            setSettings({
              ...settings,
              showLayerHideButtons: !e.target.checked,
            })
          }
          disabled={!settings.showLayerButtons || mode === ''}
        >
          Layer entfernbar
        </Checkbox>
      </div>
      <h5 className="mb-0">Karte</h5>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={settings.showFullscreen}
          onChange={(e) =>
            setSettings({ ...settings, showFullscreen: e.target.checked })
          }
          disabled={mode === ''}
        >
          Fullscreen
        </Checkbox>
        <Checkbox
          checked={settings.showLocator}
          onChange={(e) =>
            setSettings({ ...settings, showLocator: e.target.checked })
          }
          disabled={mode === ''}
        >
          Navigator
        </Checkbox>
        <Checkbox
          checked={settings.showMeasurement}
          onChange={(e) =>
            setSettings({ ...settings, showMeasurement: e.target.checked })
          }
          disabled={mode === ''}
        >
          Messung
        </Checkbox>
      </div>

      <Checkbox
        checked={settings.showHamburgerMenu}
        onChange={(e) =>
          setSettings({ ...settings, showHamburgerMenu: e.target.checked })
        }
        disabled={mode === ''}
      >
        Hamburger Menu
      </Checkbox>

      <Button
        onClick={() => {
          const newConfig = {
            backgroundLayer: backgroundLayer,
            layers: activeLayers,
            settings: mode === 'publish/' ? settings : undefined,
          };
          const jsonString = JSON.stringify(newConfig);
          const compressed = LZString.compressToEncodedURIComponent(jsonString);
          try {
            const baseUrl = window.location.origin + window.location.pathname;
            const queryString = new URLSearchParams(searchParams).toString();
            const url = `${baseUrl}#/${mode}?data=${compressed}&${queryString}${
              customAppKey ? `&appKey=${encodeURIComponent(customAppKey)}` : ''
            }`;
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
