import { Tabs } from 'antd';
import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const LayerTabs = () => {
  const layerNames = [
    'karten',
    'gebiet',
    'immo',
    'infra',
    'inspire',
    'planung',
    'poi',
    'umwelt',
    'verkehr',
  ];

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
        items={layerNames.map((layer, i) => {
          return {
            key: layerIds[i],
            label: layer.charAt(0).toUpperCase() + layer.slice(1),
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
