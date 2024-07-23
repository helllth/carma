import { AutoComplete, Button } from 'antd';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-xml-doc';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'react-simple-code-editor';
import Map from './components/Map';
import { getAllLayers } from './helper/layers';
import {
  getGMLOutput,
  getJSONOutput,
  getLayers,
  getOldVariant,
  setLayers,
} from './store/slices/mapping';
import { findLayerByTitle } from './helper/featureInfo';

export function App() {
  const [code, setCode] = useState(`function getHeader(json) {
  return "Maximale Wassertiefe";
}`);
  const layers = useSelector(getLayers);
  const gmlOutput = useSelector(getGMLOutput);
  const jsonOutput = useSelector(getJSONOutput);
  const oldVariant = useSelector(getOldVariant);
  const dispatch = useDispatch();
  const [selectedLayer, setSelectedLayer] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [header, setHeader] = useState('');
  const [primaryText, setPrimaryText] = useState('');
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const requestLayers = async () => {
      const result = await getAllLayers();
      dispatch(setLayers(result));
    };

    requestLayers();
  }, []);

  const renderTitle = (title: string) => (
    <span className="text-lg font-semibold text-black">{title}</span>
  );

  const renderItem = (layer: any) => {
    return {
      value: layer.Title,
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {layer.Title}
        </div>
      ),
    };
  };

  return (
    <div
      className="flex flex-col items-center h-screen w-full gap-2 p-2"
      style={{ maxHeight: window.innerHeight, maxWidth: window.innerWidth }}
    >
      <div className="w-full rounded-md h-20 flex items-center gap-2">
        <AutoComplete
          onSelect={(value) => {
            const layer = findLayerByTitle(layers, value);
            const item = {
              name: layer.Name,
              url: layer.url,
            };
            setSelectedLayer(item);
          }}
          options={layers.map((value) => {
            const layers = value.layers.map((layer) => {
              return renderItem(layer);
            });
            return { label: renderTitle(value.title), options: layers };
          })}
          style={{ width: '50%' }}
          placeholder={
            layers.length > 0 ? 'Layer auswählen' : 'Layer werden geladen'
          }
        />
      </div>
      <div
        className="flex w-full items-center justify-center gap-2 h-full"
        style={{ maxHeight: window.innerHeight - 100 }}
      >
        <div className="h-full rounded-md w-1/3">
          <Map layer={selectedLayer} selectedFeature={selectedFeature} />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center w-2/3 h-full">
          <div className="max-w-full w-full h-1/3 flex gap-2">
            <div className="border-solid p-2 overflow-auto rounded-md border-black border-[1px] w-full h-full">
              GML:
              <div>{gmlOutput && <pre>{gmlOutput}</pre>}</div>
            </div>
            <div className="border-solid p-2 rounded-md overflow-auto border-black border-[1px] w-full h-full">
              JSON:
              <div>
                {jsonOutput && (
                  <pre>{JSON.stringify(jsonOutput, null, '\t')}</pre>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-md border-solid border-black border-[1px] p-2 w-full h-1/3 flex flex-col gap-2">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                width: '100%',
                height: '100%',
              }}
            />
            <Button
              onClick={() => {
                console.log('xxx', code.split('\n'));
                const conf = code.split('\n');
                let functionString = `(function(p) {
                  const info = {`;

                conf.forEach((rule) => {
                  functionString += `${rule.trim()},\n`;
                });

                functionString += `
                                        };
                                        return info;
                  })`;
                console.log('xxx functionString', functionString);

                const tmpInfo = eval(functionString)(jsonOutput);

                console.log('xxx tmpInfo', tmpInfo);

                const properties = {
                  ...tmpInfo,
                };

                setSelectedFeature({
                  properties,
                });
                // const result = eval('(' + code + ')');

                // setPrimaryText(result(jsonOutput));
              }}
            >
              Anwenden
            </Button>
          </div>

          <div className="rounded-md w-full h-1/3 flex gap-2">
            <div className="border-solid p-2 overflow-auto rounded-md border-black border-[1px] w-full h-full">
              Altes Design:
              {oldVariant && (
                <div dangerouslySetInnerHTML={{ __html: oldVariant }} />
              )}
            </div>
            <div className="border-solid p-2 rounded-md overflow-auto border-black border-[1px] w-full h-full">
              Neues Design:
              <h2>{primaryText}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
