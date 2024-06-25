import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from '@uidotdev/usehooks';
import { Button, Input, Modal } from 'antd';
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import WMSCapabilities from 'wms-capabilities';
import { baseConfig as config, serviceConfig } from '../helper/config';
import {
  flattenLayer,
  getLayerStructure,
  mergeStructures,
} from '../helper/layerHelper';
import LayerTabs from './LayerTabs';
import LibItem from './LibItem';
import './input.css';
import './modal.css';
import { vectorProps, wmsProps } from '../helper/types';
const { Search } = Input;

// @ts-ignore
const parser = new WMSCapabilities();

export type Layer = {
  title: string;
  // url: string;
  id: string;
  opacity: number;
  description: string;
  visible: boolean;
  icon?: string;
  // type?: 'wmts' | 'wmts-nt' | 'tiles' | 'vector';
  // legend?: { Format: string; OnlineResource: string; size: [number, number] }[];
} & (
  | {
      layerType: 'wmts' | 'wmts-nt';
      props: {
        url: string;
        name: string;
        legend?: {
          format: string;
          OnlineResource: string;
          size: [number, number];
        }[];
      };
    }
  | vectorProps
);

export interface LibModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setAdditionalLayers: any;
  setThumbnail: any;
  thumbnails: any;
  activeLayers: Layer[];
}

const LibModal = ({
  open,
  setOpen,
  setAdditionalLayers,
  thumbnails,
  setThumbnail,
  activeLayers,
}: LibModalProps) => {
  const [layers, setLayers] = useState<any[]>([]);
  const [allLayers, setAllLayers] = useState<any[]>([]);
  const services = serviceConfig;
  const [inViewCategory, setInViewCategory] = useState('');
  const [allCategoriesInView, setAllCategoriesInView] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const search = (value) => {
    setIsSearching(true);
    if (value) {
      const results = fuse.search(value);
      // have to use allLayers.map to create a deep copy so the allLayers state wont change here
      const resultsWithCategories = allLayers.map((item) => {
        return {
          ...item,
        };
      });

      resultsWithCategories.map((category) => {
        const newLayers: any[] = [];

        results.forEach((result) => {
          if (category.Title === result.item.tags[0]) {
            newLayers.push({
              ...result.item,
              highlight: result.matches,
            });
          }
        });

        category.layers = newLayers;
      });

      setLayers(resultsWithCategories);
    } else {
      setLayers(allLayers);
    }
    setIsSearching(false);
  };

  const flattenedLayers = allLayers.flatMap((obj) => obj.layers);
  const fuse = new Fuse(flattenedLayers, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1 },
    ],
    shouldSort: false,
    includeMatches: true,
    useExtendedSearch: true,
    distance: 1000,
    threshold: 0.3,
  });

  const getDataFromJson = (data: any) => {
    const flattenedLayers: any[] = [];
    const rootLayer = data.Capability.Layer;
    const getUrl =
      data.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource;
    flattenedLayers.push(flattenLayer(rootLayer, [], getUrl));

    setLayers((prev) => {
      const newLayers = [...prev, flattenedLayers[0]];
      newLayers.sort((a, b) => b.layers.length - a.layers.length);

      return newLayers;
    });
    setAllLayers((prev) => {
      const newLayers = [...prev, flattenedLayers[0]];
      newLayers.sort((a, b) => b.layers.length - a.layers.length);

      return newLayers;
    });
  };

  const getNumberOfLayers = (layers) => {
    let numberOfLayers = 0;
    layers.forEach((category) => {
      numberOfLayers += category.layers.length;
    });
    return numberOfLayers;
  };

  useEffect(() => {
    let newLayers: any[] = [];
    for (let key in services) {
      if (services[key].url) {
        fetch(
          `${services[key].url}?service=WMS&request=GetCapabilities&version=1.1.1`
        )
          .then((response) => {
            return response.text();
          })
          .then((text) => {
            const result = parser.toJSON(text);
            if (result) {
              if (config) {
                const tmpLayer = getLayerStructure({
                  config,
                  wms: result,
                  serviceName: services[key].name,
                });
                const mergedLayer = mergeStructures(tmpLayer, newLayers);
                newLayers = mergedLayer;
                setLayers(newLayers);
                setAllLayers(newLayers);
              } else {
                getDataFromJson(result);
              }
            }
          });
      } else {
        if (services[key].type === 'topicmaps') {
          const tmpLayer = getLayerStructure({
            config,
            serviceName: services[key].name,
          });
          const mergedLayer = mergeStructures(tmpLayer, newLayers);
          newLayers = mergedLayer;
          setLayers(newLayers);
          setAllLayers(newLayers);
        } else {
          const tmpLayer = getLayerStructure({
            config,
            serviceName: services[key].name,
          });
          const mergedLayer = mergeStructures(tmpLayer, newLayers);
          newLayers = mergedLayer;
          setLayers(newLayers);
          setAllLayers(newLayers);
        }
      }
    }
  }, []);

  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
      <div
        className="w-full h-full flex flex-col bg-[#f2f2f2]"
        style={{
          maxHeight: 'calc(100vh - 200px)',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        {/* <div className='h-full w-full flex flex-col'></div> */}
        <div className="sticky top-0 px-6 pt-6">
          <div className="flex justify-between items-center">
            <h1 className="mb-0 text-2xl font-semibold">Ressourcen</h1>
            {/* <Button
              onClick={() => {
                createBaseConfig(layers);
              }}
            >
              Create Base Config
            </Button> */}
            <Search
              placeholder="Suchbegriff eingeben"
              className="w-[76%]"
              onChange={(e) => {
                setIsSearching(true);
                setSearchValue(e.target.value);
              }}
              loading={isSearching}
              onSearch={(value) => {
                search(value);
              }}
            />
            <Button type="text" onClick={() => setOpen(false)}>
              <FontAwesomeIcon icon={faX} />
            </Button>
          </div>
          {layers.length > 0 && (
            <>
              <LayerTabs
                layers={layers}
                activeId={inViewCategory}
                numberOfItems={getNumberOfLayers(layers)}
              />
              <hr className="h-px bg-gray-300 border-0 mt-0 mb-2" />
            </>
          )}
        </div>
        <div className="overflow-auto pt-0.5">
          <div className="px-6">
            {layers.map((category, i) => (
              <>
                {category.layers.length > 0 && (
                  <InView
                    rootMargin="20px 0px 20px 0px"
                    as="div"
                    onChange={(inView, entry) => {
                      if (inView) {
                        setInViewCategory(entry.target.id);

                        setAllCategoriesInView((prev) => {
                          return [...prev, entry.target.id];
                        });
                      } else {
                        const updatedCategoriesInView =
                          allCategoriesInView.filter(
                            (item) => item !== entry.target.id
                          );
                        setAllCategoriesInView(updatedCategoriesInView);
                        if (inViewCategory === entry.target.id && i > 0) {
                          for (let j = i - 1; j >= 0; j--) {
                            if (layers[j].layers.length > 0) {
                              setInViewCategory(layers[j].Title);
                            }
                          }
                        }
                      }
                    }}
                    id={category?.Title}
                    key={category?.Title}
                  >
                    <p className="mb-4 text-2xl font-semibold">
                      {category?.Title}
                    </p>
                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 gap-8 mb-4">
                      {category?.layers?.map((layer: any, i) => (
                        <LibItem
                          setAdditionalLayers={setAdditionalLayers}
                          layer={layer}
                          thumbnails={thumbnails}
                          setThumbnail={setThumbnail}
                          activeLayers={activeLayers}
                          key={`${category.Title}_layer_${i}`}
                        />
                      ))}
                    </div>
                  </InView>
                )}
              </>
            ))}
            {getNumberOfLayers(layers) === 0 && (
              <h1 className="text-2xl font-normal">
                Keine Ressourcen gefunden
              </h1>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LibModal;
