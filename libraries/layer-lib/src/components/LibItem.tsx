import { Spin } from 'antd';
import { useState } from 'react';

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
  highlight?: any;
  setAdditionalLayers: any;
}

const LibItem = ({
  title,
  description,
  tags,
  name,
  bbox,
  getMapUrl,
  highlight,
  setAdditionalLayers,
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

  const [isLoading, setIsLoading] = useState(true);

  const hightlightTextIndexes = undefined;

  return (
    <div className="flex flex-col rounded-lg w-full h-fit">
      <button
        onDoubleClick={(e) => {
          setAdditionalLayers({
            name,
            title,
            getMapUrl,
          });
        }}
        className="relative overflow-hidden isolate rounded-md flex justify-center items-center w-full aspect-[1.7777/1]"
      >
        {isLoading && (
          <div style={{ position: 'absolute', left: '50%' }}>
            <Spin />
          </div>
        )}

        <img
          src={fullBboxLayers.find((value) => value === name) ? bboxUrl : url}
          alt={title}
          className="object-cover h-full overflow-clip w-[calc(130%+7.2px)]"
          onLoad={(e) => {
            setIsLoading(false);
          }}
        />
      </button>
      <h3 className="text-lg">
        {hightlightTextIndexes ? (
          <>
            {title.substring(0, hightlightTextIndexes[0])}
            <span
              style={{
                backgroundColor: 'rgba(240, 215, 139, 0.8)',
                padding: '0 0.08em',
              }}
            >
              {title.substring(
                hightlightTextIndexes[0],
                hightlightTextIndexes[1] + 1
              )}
            </span>

            {title.substring(hightlightTextIndexes[1] + 1)}
          </>
        ) : (
          title
        )}
      </h3>
      <p className="text-md line-clamp-3" style={{ color: 'rgba(0,0,0,0.7)' }}>
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

export default LibItem;
