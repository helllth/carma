import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, message } from 'antd';
import './popover.css';

export type Settings = {
  showLayerButtons: boolean;
  showLayerHideButtons: boolean;
  showFullscreen: boolean;
  showLocator: boolean;
  showMeasurement: boolean;
  showHamburgerMenu?: boolean;
};

const Save = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className="p-2 flex flex-col gap-3">
      {contextHolder}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faShareNodes} className="text-xl" />
        <h4 className="mb-0">Speichern</h4>
      </div>
      <hr className="my-0" />
      <h5 className="-mb-1 text-lg">Einstellungen:</h5>

      <Input placeholder="Name" />
      <Input placeholder="Beschreibung" />

      <Button onClick={() => {}}>Konfiguration Speichern</Button>
    </div>
  );
};

export default Save;
