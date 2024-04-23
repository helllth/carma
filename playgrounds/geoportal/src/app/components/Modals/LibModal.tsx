import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Modal, Tabs } from 'antd';
import './modal.css';

const { Search } = Input;

interface LayerItemProps {
  thumbnail: string;
  title: string;
  description: string;
}

const LayerItem = ({ thumbnail, title, description }: LayerItemProps) => {
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
      <p className="text-md text-gray-400">{description}</p>
    </div>
  );
};

interface LibModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LibModal = ({ open, setOpen }: LibModalProps) => {
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
          <div id="general">
            <p className="mb-4 text-2xl font-semibold">General</p>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 gap-8">
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bathymetry-q80.jpg"
                title="Bathymetry"
                description="Coloring of the ocean depth in 1000 meter intervals."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bicycle%20Lanes-q80.jpg"
                title="Bicycle Lanes"
                description="Bicycle lanes from OpenStreetMap. OpenStreetMap contributors."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bathymetry-q80.jpg"
                title="Bathymetry"
                description="Coloring of the ocean depth in 1000 meter intervals."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bicycle%20Lanes-q80.jpg"
                title="Bicycle Lanes"
                description="Bicycle lanes from OpenStreetMap. OpenStreetMap contributors."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bathymetry-q80.jpg"
                title="Bathymetry"
                description="Coloring of the ocean depth in 1000 meter intervals."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bicycle%20Lanes-q80.jpg"
                title="Bicycle Lanes"
                description="Bicycle lanes from OpenStreetMap. OpenStreetMap contributors."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bathymetry-q80.jpg"
                title="Bathymetry"
                description="Coloring of the ocean depth in 1000 meter intervals."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bicycle%20Lanes-q80.jpg"
                title="Bicycle Lanes"
                description="Bicycle lanes from OpenStreetMap. OpenStreetMap contributors."
              />
            </div>
          </div>

          <div id="boundaries">
            <p className="mb-4 text-2xl font-semibold">Boundaries</p>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 gap-8">
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bathymetry-q80.jpg"
                title="Bathymetry"
                description="Coloring of the ocean depth in 1000 meter intervals."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bicycle%20Lanes-q80.jpg"
                title="Bicycle Lanes"
                description="Bicycle lanes from OpenStreetMap. OpenStreetMap contributors."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bathymetry-q80.jpg"
                title="Bathymetry"
                description="Coloring of the ocean depth in 1000 meter intervals."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bicycle%20Lanes-q80.jpg"
                title="Bicycle Lanes"
                description="Bicycle lanes from OpenStreetMap. OpenStreetMap contributors."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bathymetry-q80.jpg"
                title="Bathymetry"
                description="Coloring of the ocean depth in 1000 meter intervals."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bicycle%20Lanes-q80.jpg"
                title="Bicycle Lanes"
                description="Bicycle lanes from OpenStreetMap. OpenStreetMap contributors."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bathymetry-q80.jpg"
                title="Bathymetry"
                description="Coloring of the ocean depth in 1000 meter intervals."
              />
              <LayerItem
                thumbnail="https://library-thumbnails.felt.com/Bicycle%20Lanes-q80.jpg"
                title="Bicycle Lanes"
                description="Bicycle lanes from OpenStreetMap. OpenStreetMap contributors."
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LibModal;
