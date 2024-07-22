import { AutoComplete, Button } from 'antd';
import Map from './components/Map';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { useEffect, useState } from 'react';
import { getAllLayers } from './helper/layers';
import { getLayers, setLayers } from './store/slices/mapping';
import { useDispatch, useSelector } from 'react-redux';

export function App() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const layers = useSelector(getLayers);
  const dispatch = useDispatch();
  const [selectedLayer, setSelectedLayer] = useState(null);

  useEffect(() => {
    getAllLayers().then((result) => {
      dispatch(setLayers(result));
    });
  }, []);

  const renderTitle = (title: string) => (
    <span className="text-lg font-semibold text-black">{title}</span>
  );

  const renderItem = (layer: any) => {
    const item = {
      name: layer.Name,
      url: layer.url,
    };

    return {
      value: JSON.stringify(item),
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
    <div className="flex flex-col items-center h-screen w-full gap-2 p-2">
      <div className="w-full rounded-md h-20 flex items-center gap-2">
        <AutoComplete
          onSelect={(value) => {
            console.log('value', JSON.parse(value));
            setSelectedLayer(JSON.parse(value));
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
      <div className="flex w-full items-center justify-center gap-2 h-full">
        {/* Map */}
        <div className="h-full rounded-md w-2/3">
          <Map layer={selectedLayer} />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
          {/* JSON + GML Output */}
          <div className="rounded-md w-full h-1/3 flex gap-2">
            <div className="border-solid rounded-md border-black border-[1px] w-full h-full">
              Hier kommt die JSON Ausgabe
            </div>
            <div className="border-solid rounded-md border-black border-[1px] w-full h-full">
              Hier kommt die GML Ausgabe
            </div>
          </div>
          {/* Editor */}
          <div className="rounded-md w-full h-1/3 flex gap-2">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                width: '100%',
                border: '1px solid black',
                borderRadius: '6px',
              }}
            />
          </div>
          {/* Feature Box + Alte Variante */}
          <div className="rounded-md w-full h-1/3 flex gap-2">
            <div className="border-solid rounded-md border-black border-[1px] w-full h-full">
              Altes Design
            </div>
            <div className="border-solid rounded-md border-black border-[1px] w-full h-full">
              Neues Design
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;