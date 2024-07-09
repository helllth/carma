import { Radio, Tabs } from 'antd';
import { cn, parseDescription } from '../../helper/helper';
import { tabItems } from './items';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveTabKey, setActiveTabKey } from '../../store/slices/ui';
import {
  getBackgroundLayer,
  getLayers,
  getSelectedLayerIndex,
  setBackgroundLayer,
  setLayers,
} from '../../store/slices/mapping';
import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import LayerRow from './LayerRow';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { layerMap } from '../TopNavbar';
import { useState } from 'react';

interface InfoProps {
  description: string;
  legend: any;
}

const Info = ({ description, legend }: InfoProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const activeTabKey = useSelector(getActiveTabKey);
  const parsedDescription = parseDescription(description);
  const layers = useSelector(getLayers);
  const selectedLayerIndex = useSelector(getSelectedLayerIndex);
  const isBaseLayer = selectedLayerIndex === -1;
  const backgroundLayer = useSelector(getBackgroundLayer);

  const getLayerPos = (id) => layers.findIndex((layer) => layer.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const originalPos = getLayerPos(active.id);
      const newPos = getLayerPos(over.id);
      const newLayers = arrayMove(layers, originalPos, newPos);

      dispatch(setLayers(newLayers));
    }
  };

  return (
    <>
      <h4 className="font-semibold">Informationen</h4>
      {parsedDescription && !isBaseLayer && (
        <div>
          <h5 className="font-semibold">Inhalt</h5>
          <p className="text-sm">{parsedDescription.inhalt}</p>
          <h5 className="font-semibold">Sichtbarkeit</h5>
          <p className="text-sm">
            {parsedDescription.sichtbarkeit.slice(0, -1)}
          </p>
          <h5 className="font-semibold">Nutzung</h5>
          <p className="text-sm">{parsedDescription.nutzung}</p>
        </div>
      )}
      {isBaseLayer && (
        <div className="flex flex-col gap-2 pb-4">
          <h5 className="font-semibold">Hintergrund Layer:</h5>
          {/* <Radio.Group
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="pb-2"
            optionType="default"
          >
            <Radio value="1">Stadtplan</Radio>
            <Radio value="2">Gelände</Radio>
            <Radio value="3">Amtliche Geobasisdaten</Radio>
          </Radio.Group> */}
          {/* <Radio.Group
            value={backgroundLayer.id}
            className="w-full h-full"
            onChange={(e) => {
              dispatch(
                setBackgroundLayer({
                  id: e.target.value,
                  title: layerMap[e.target.value].title,
                  opacity: 1.0,
                  description: layerMap[e.target.value].description,
                  layerType: 'wmts',
                  visible: true,
                  props: {
                    name: '',
                    url: layerMap[e.target.value].url,
                  },
                  layers: layerMap[e.target.value].layers,
                })
              );
            }}
          >
            <Radio.Button className="w-1/2 h-full" value="stadtplan">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                Karte
                <Radio.Group
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  className="pb-2"
                  // optionType="default"
                >
                  <Radio value="1">Stadtplan</Radio>
                  <Radio value="2">Gelände</Radio>
                  <Radio value="3">Amtliche Geobasisdaten</Radio>
                </Radio.Group>
              </div>
            </Radio.Button>
            <Radio.Button className="w-1/2 h-full" value="luftbild">
              <div className="w-full flex items-center justify-center">
                Luftbild
              </div>
            </Radio.Button>
          </Radio.Group> */}

          <div className="w-full flex last:rounded-s-md first:rounded-s-md">
            <button
              onClick={() => {
                dispatch(
                  setBackgroundLayer({
                    id: 'stadtplan',
                    title: layerMap['stadtplan'].title,
                    opacity: 1.0,
                    description: layerMap['stadtplan'].description,
                    layerType: 'wmts',
                    visible: true,
                    props: {
                      name: '',
                      url: layerMap['stadtplan'].url,
                    },
                    layers: layerMap['stadtplan'].layers,
                  })
                );
              }}
              className={cn(
                'w-full group border-[1px] rounded-s-md',
                backgroundLayer.id === 'stadtplan' && 'border-[#1677ff]'
              )}
            >
              <div className="w-full flex flex-col text-[14px]/[30px] items-center justify-center gap-3">
                <p
                  className={cn(
                    'mb-0 group-hover:text-[#1677ff]',
                    backgroundLayer.id === 'stadtplan' && 'text-[#1677ff]'
                  )}
                >
                  Karte
                </p>
                <Radio.Group
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  className="pb-2"
                  optionType="default"
                >
                  <Radio value="1">Stadtplan</Radio>
                  <Radio value="2">Gelände</Radio>
                  <Radio value="3">Amtliche Geobasisdaten</Radio>
                </Radio.Group>
              </div>
            </button>
            <button
              onClick={() => {
                dispatch(
                  setBackgroundLayer({
                    id: 'luftbild',
                    title: layerMap['luftbild'].title,
                    opacity: 1.0,
                    description: layerMap['luftbild'].description,
                    layerType: 'wmts',
                    visible: true,
                    props: {
                      name: '',
                      url: layerMap['luftbild'].url,
                    },
                    layers: layerMap['luftbild'].layers,
                  })
                );
              }}
              className={cn(
                'w-full group rounded-e-md border-[1px]',
                backgroundLayer.id === 'luftbild' && 'border-[#1677ff]'
              )}
            >
              <div className="flex text-[14px]/[30px] flex-col items-center h-full justify-start">
                <p
                  className={cn(
                    'mb-0 group-hover:text-[#1677ff]',
                    backgroundLayer.id === 'luftbild' && 'text-[#1677ff]'
                  )}
                >
                  Luftbild
                </p>
              </div>
            </button>
          </div>
          <h5 className="font-semibold pt-2">Inhalt</h5>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
      <hr className="h-px my-0 bg-gray-300 border-0 w-full" />
      {isBaseLayer ? (
        <Tabs
          animated={false}
          items={[
            {
              key: '1',
              label: 'Layer',
              children: (
                <DndContext
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <div className="h-full overflow-auto flex flex-col gap-2">
                    <SortableContext
                      items={layers}
                      strategy={verticalListSortingStrategy}
                    >
                      {layers.map((layer, i) => (
                        <LayerRow
                          key={`layer.${i}`}
                          layer={layer}
                          id={layer.id}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </DndContext>
              ),
            },
          ]}
        />
      ) : (
        <Tabs
          animated={false}
          items={tabItems(legend)}
          activeKey={activeTabKey}
          onChange={(key) => dispatch(setActiveTabKey(key))}
        />
      )}
    </>
  );
};

export default Info;
