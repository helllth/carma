import { Radio, Tabs } from 'antd';
import { parseDescription } from '../../helper/helper';
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

interface InfoProps {
  description: string;
  legend: any;
}

const Info = ({ description, legend }: InfoProps) => {
  const dispatch = useDispatch();
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
          <Radio.Group
            value={backgroundLayer.id}
            onChange={(e) => {
              dispatch(
                setBackgroundLayer({
                  id: e.target.value,
                  title: layerMap[e.target.value].title,
                  opacity: 1.0,
                  description: '',
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
            <Radio value="amtlich">Amtlich</Radio>
            <Radio value="stadtplan">Stadtplan</Radio>
            <Radio value="luftbild">Luftbild</Radio>
          </Radio.Group>
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
                          title={layer.title}
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
