import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Modal, Tabs } from 'antd';
import WMSCapabilities from 'wms-capabilities';
import { useEffect, useState } from 'react';
import { flattenLayer } from '../helper/layerHelper';
const { Search } = Input;

// @ts-ignore
const parser = new WMSCapabilities();

const fullBboxLayers = [
  'wuppertal:2004',
  'wuppertal:1979',
  'wuppertal:1929',
  'wuppertal:1827',
  'R102:UEK125',
  'Hitze-Ist',
  'Hitze-Stark-Ist',
  'Hitze-2050',
  'Frischluftschneisen',
  'Freiflaechen',
];

interface LayerItemProps {
  title: string;
  description: string;
  tags?: string[];
  name: string;
  bbox: any;
  getMapUrl: string;
}

const LayerItem = ({
  title,
  description,
  tags,
  name,
  bbox,
  getMapUrl,
}: LayerItemProps) => {
  const box = bbox.find((box: any) => box.crs === 'EPSG:25832').extent;
  const url = `${getMapUrl}service=WMS&request=GetMap&layers=${encodeURIComponent(
    name
  )}&styles=&format=image%2Fpng&transparent=true&version=1.1.1&tiled=true&type=wms&cssFilter=undefined&width=256&height=256&srs=EPSG%3A25832&bbox=374813.20252403466,5681918.144256154,374966.07658060483,5682071.018312723`;
  const bboxUrl = `${getMapUrl}service=WMS&request=GetMap&layers=${encodeURIComponent(
    name
  )}&styles=&format=image%2Fpng&transparent=true&version=1.1.1&tiled=true&type=wms&cssFilter=undefined&width=512&height=512&srs=EPSG%3A25832&bbox=${
    box[0]
  },${box[1]},${box[2]},${box[3]}`;

  const regex = /Inhalt:(.*?)Sichtbarkeit:/s;

  const match = description?.match(regex);

  return (
    <div className="flex flex-col rounded-lg w-full h-fit">
      <button className="relative overflow-hidden isolate rounded-md flex justify-center items-center w-full aspect-[1.7777/1]">
        <img
          src={fullBboxLayers.find((value) => value === name) ? bboxUrl : url}
          alt={title}
          className="object-cover h-full overflow-clip w-[calc(130%+7.2px)]"
        />
      </button>
      <h3 className="text-lg">{title}</h3>
      <p className="text-md" style={{ color: 'rgba(0,0,0,0.7)' }}>
        {match && match.length > 1 ? match[1].trim() : description}
      </p>
      <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.875rem' }}>
        {tags?.map((tag, i) => (
          <span key={'tag_' + tag + '_' + i}>
            <span>{tag}</span>
            {i + 1 < tags.length && <span> · </span>}
          </span>
        ))}
      </p>
    </div>
  );
};

export interface LibModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LibModal = ({ open, setOpen }: LibModalProps) => {
  const [layers, setLayers] = useState<any[]>([]);

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

  const getDataFromJson = (data: any) => {
    const flattenedLayers: any[] = [];
    const rootLayer = data.Capability.Layer;
    const getUrl =
      data.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource;
    flattenedLayers.push(flattenLayer(rootLayer, [], getUrl));

    setLayers((prev) => [...prev, flattenedLayers[0]]);
  };

  useEffect(() => {
    layerNames.forEach((layer) => {
      fetch(`/${layer}.xml`)
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          const result = parser.toJSON(text);
          getDataFromJson(result);
        });
    });
  }, []);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      footer={<></>}
      width={'100%'}
      closeIcon={false}
      wrapClassName="h-full"
      className="h-[90%]"
    >
      <div className="w-full h-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="mb-0 text-2xl font-semibold">Layer Library</h1>
          <Search placeholder="Layer durchsuchen" className="w-[76%]" />
          <Button type="text">Frage einen neuen Layer an</Button>
          <Button type="text" onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faX} />
          </Button>
        </div>
        <Tabs
          defaultActiveKey="1"
          items={layerNames.map((layer) => {
            return {
              key: ' WMS ' + layer.charAt(0).toUpperCase() + layer.slice(1),
              label: layer.charAt(0).toUpperCase() + layer.slice(1),
            };
          })}
          onTabClick={(key) => {
            document
              .getElementById(key)
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <div className="">
          {layers.map((topLayer) => (
            <div id={topLayer.title.split('-')[1]}>
              <p className="mb-4 text-2xl font-semibold">
                {topLayer.title.split('-')[1]}
              </p>
              <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 gap-8">
                {topLayer?.layers?.map((layer: any) => (
                  <LayerItem
                    title={layer.title}
                    description={layer.description}
                    tags={layer.tags.slice(1, -1)}
                    name={layer.name}
                    bbox={layer.BoundingBox}
                    getMapUrl={layer.url}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default LibModal;
