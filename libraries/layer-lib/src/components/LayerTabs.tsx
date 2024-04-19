import { Badge, Tabs } from 'antd';
import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LayerTabsProps {
  layers: any[];
}

const LayerTabs = ({ layers }: LayerTabsProps) => {
  const [activeId, setActiveId] = useState<string>();

  const layerIds = [
    'WMS',
    'WMS Gebiet',
    'WMS Immo',
    'WMS Infra',
    'WMS Inspire',
    'WMS Planung',
    'WMS POI',
    'WMS Umwelt',
    'Verkehr',
  ];

  useIntersectionObserver(setActiveId, layerIds);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={layers.map((layer, i) => {
          return {
            key: layerIds[i],
            label: (
              <div className="flex items-center gap-2">
                <span>{layerIds[i]}</span>
                {layer.layers.length > 0 && (
                  <Badge count={layer.layers.length} color="#808080" />
                )}
              </div>
            ),
            disabled: layer.layers.length === 0,
          };
        })}
        activeKey={activeId}
        onTabClick={(key) => {
          document.getElementById(key)?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </>
  );
};

export default LayerTabs;
