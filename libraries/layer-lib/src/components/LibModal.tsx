import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Modal, Tabs } from 'antd';
import WMSCapabilities from 'wms-capabilities';
import { useEffect, useState } from 'react';
import { flattenLayer } from '../helper/layerHelper';
const { Search } = Input;

// @ts-ignore
const parser = new WMSCapabilities();

interface LayerItemProps {
  thumbnail: string;
  title: string;
  description: string;
  tags?: string[];
}

const LayerItem = ({ thumbnail, title, description, tags }: LayerItemProps) => {
  return (
    <div className="flex flex-col rounded-lg w-fit h-fit">
      <button className="relative overflow-hidden isolate rounded-md flex justify-center items-center w-full aspect-[1.7777/1]">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover h-full overflow-clip w-[calc(130%+7.2px)]"
        />
      </button>
      <h3 className="text-lg">{title}</h3>
      <p className="text-md" style={{ color: 'rgba(0,0,0,0.7)' }}>
        {description}
      </p>
      <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.875rem' }}>
        {tags?.map((tag, i) => (
          <>
            <span>{tag}</span>
            {i + 1 < tags.length && <span> · </span>}
          </>
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

  const getDataFromJson = (data: any) => {
    // console.log(data);
    const flattenedLayers = [];
    const rootLayer = data.Capability.Layer;
    flattenedLayers.push(flattenLayer(rootLayer));

    console.log(flattenedLayers);
    setLayers(flattenedLayers);
  };

  useEffect(() => {
    fetch('/karten.xml')
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        const result = parser.toJSON(text);
        getDataFromJson(result);
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
          items={[
            { key: 'general', label: 'General' },
            { key: 'boundaries', label: 'Boundaries' },
          ]}
          onTabClick={(key) => {
            document
              .getElementById(key)
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <div className="">
          {layers.map((topLayer) => (
            <div id={topLayer.title}>
              <p className="mb-4 text-2xl font-semibold">{topLayer.title}</p>
              <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 gap-8">
                {topLayer.layers.map((layer: any) => (
                  <LayerItem
                    thumbnail="https://library-thumbnails.felt.com/Bathymetry-q80.jpg"
                    title={layer.title}
                    description={layer.description}
                    tags={layer.tags.slice(1, -1)}
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
