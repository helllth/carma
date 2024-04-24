import { Layer, WMSCapabilitiesJSON } from 'wms-capabilities';

export const flattenLayer = (
  layer: any,
  parentTitles: any = [],
  url: string
) => {
  const layerTitle = layer.Title;
  const layerTags = [...parentTitles, layerTitle];

  const flattenedLayer: any = {
    Title: layerTitle,
    Name: layer.Name ? layer.Name : '',
    Abstract: layer.Abstract,
    tags: layerTags,
    srs: layer.SRS,
    BoundingBox: layer.BoundingBox,
    LatLonBoundingBox: layer.LatLonBoundingBox,
    style: layer.Style,
    noSubsets: layer.noSubsets,
    opaque: layer.opaque,
    queryable: layer.queryable,
    url,
  };

  if (layer.Layer) {
    const childLayers: any[] = [];
    layer.Layer.forEach((subLayer: any) => {
      const flattennedSubLayer = flattenLayer(subLayer, layerTags, url);
      if (flattennedSubLayer?.layers) {
        childLayers.push(...flattennedSubLayer.layers);
        delete flattennedSubLayer.layers;
      }
      if (flattennedSubLayer.Name !== '') {
        childLayers.push(flattennedSubLayer);
      }
    });
    flattenedLayer.layers = childLayers;
  }

  return flattenedLayer;
};

export const createBaseConfig = (layers) => {
  const result = {};
  layers.forEach((item) => {
    result[item.Title] = {
      layers: item.layers.map((layer) => ({ name: layer.Name })),
    };
  });
  console.log(result);

  return null;
};

export const getLayerStructure = (config, wms: WMSCapabilitiesJSON) => {
  const structure: any[] = [];
  for (let category in config) {
    const categoryConfig = config[category];
    const layers: any[] = [];
    let categoryObject = {
      Title: categoryConfig.title || category,
      layers,
    };
    for (let layerIndex in categoryConfig.layers) {
      const layer = categoryConfig.layers[layerIndex];
      let foundLayer = findLayerAndAddTags(
        wms.Capability.Layer,
        layer.name,
        []
      );
      if (foundLayer) {
        foundLayer['url'] =
          wms.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource;
        let tags = foundLayer.tags;
        tags[0] = categoryObject.Title;
        foundLayer = { ...foundLayer, ...layer, ...tags };
        layers.push(foundLayer);
      }
    }
    categoryObject.layers = layers;
    structure.push(categoryObject);
  }
  return structure;
};

export const mergeStructures = (structure1, structure2) => {
  let mergedObj = {};

  structure1.forEach((obj) => {
    if (!mergedObj[obj.Title]) {
      mergedObj[obj.Title] = { Title: obj.Title, layers: [] };
    }
    mergedObj[obj.Title].layers.push(...obj.layers);
  });

  structure2.forEach((obj) => {
    if (!mergedObj[obj.Title]) {
      mergedObj[obj.Title] = { Title: obj.Title, layers: [] };
    }
    mergedObj[obj.Title].layers.push(...obj.layers);
  });

  let mergedArray = Object.values(mergedObj);
  return mergedArray;
};

export const findLayerAndAddTags = (layer, name, tagsToAdd) => {
  if (layer.Name === name) {
    if (!layer.Tags) {
      layer.tags = [];
    }
    layer.tags.push(...tagsToAdd);
    return layer;
  }
  if (layer.Layer) {
    for (const subLayer of layer.Layer) {
      const foundLayer = findLayerAndAddTags(subLayer, name, [
        ...tagsToAdd,
        layer.Title,
      ]);
      if (foundLayer) {
        return foundLayer;
      }
    }
  }
  return null;
};
