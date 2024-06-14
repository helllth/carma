import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { getBackgroundLayer, getLayers } from '../store/slices/mapping';
import LZString from 'lz-string';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { useSearchParams } from 'react-router-dom';

const Share = () => {
  const backgroundLayer = useSelector(getBackgroundLayer);
  const activeLayers = useSelector(getLayers);
  const [searchParams, setSearchParams] = useSearchParams();
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div className="p-2 flex flex-col gap-2">
      {contextHolder}
      <h4>Teilen</h4>
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
