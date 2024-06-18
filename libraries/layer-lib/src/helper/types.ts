type Link = {
  type: 'link';
  url: string;
};

export type wmsProps = {
  layerType: 'wmts' | 'wmts-nt';
  props: XMLLayer;
};

export type vectorProps = {
  layerType: 'vector';
  props: {
    style: string;
  };
};

type tmpLayer = {
  type: 'layer';
} & (wmsProps | vectorProps);

type Feature = {
  type: 'feature';
};

export type Config = {
  Title: string;
  serviceName: string;
  layers: Item[];
};

export type Item = {
  title: string;
  description: string;
  tags: string[];
  thumbnail?: string;
  id: string;
} & (tmpLayer | Link | Feature);

export type XMLLayer = {
  Abstract: string;
  Attribution?: string;
  BoundingBox: {
    crs: string;
    extent: number[];
    res: number | undefined[];
  }[];
  Dimension?: any;
  EX_GeographicBoundingBox?: any;
  LatLonBoundingBox: number[];
  MaxScaleDenominator?: any;
  MinScaleDenominator?: any;
  Name: string;
  SRS: string[];
  ScaleHint: {
    max: number;
    min: number;
  };
  Style: {
    name: string;
    Title: string;
    LegendURL: {
      format: string;
      OnlineResource: string;
      size: [number, number];
    }[];
  }[];
  Title: string;
  cascaded: number;
  fixedHeight: number;
  fixedWidth: number;
  noSubsets: boolean;
  opaque: boolean;
  queryable: boolean;
  tags: string[];
  url: string;
};
