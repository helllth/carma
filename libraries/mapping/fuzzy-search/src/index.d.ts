import L from "leaflet";
import type { RefObject } from "react";
import { Viewer } from "cesium";

export type ModelAsset = {
  uri: string;
  scale: number;
  isCameraFacing?: boolean;
  rotation?: boolean | number;
  fixedScale?: boolean;
  anchorOffset?: { x?: number; y?: number; z?: number };
  hasAnimation?: boolean;
};

type mapRefType = RefObject<{
  current: { leafletMap: { leafletElement: L.Map } };
}>;

export type SearchGazetteerProps = {
  gazData?: any;
  setGazetteerHit: (hit: any) => void;
  gazetteerHit: any;
  // mapRef?: RefObject<{
  //   leafletMap?: {
  //     leafletElement: L.Map;
  //   };
  // }>;
  // mapRef?: mapRefType | L.Map;
  mapRef?: L.Map.leafletMap.leafletElement;
  cesiumRef?: Viewer;
  //overlayFeature: any;
  setOverlayFeature: (feature: any) => void;
  //crs?: string;
  referenceSystem: any;
  referenceSystemDefinition: any;
  pixelwidth?: number;
  ifShowCategories?: boolean;
  marker3dStyle?: ModelAsset;
};

export type MapConsumer = L.Map | Viewer;
interface MoreData {
  zl: number;
  pid: number;
}
export interface SearchResultItem {
  sorter: number;
  string: string;
  glyph: string;
  x: number;
  y: number;
  more: MoreData;
  type: string;
  xSearchData: string;
}
export interface SearchResult<T> {
  item: T;
  refIndex: number;
  score?: number;
}
export interface Option {
  key: number;
  label: JSX.Element;
  value: string;
  sData: SearchResultItem;
  options?: Option[];
}
export interface GruppedOptions {
  label?: JSX.Element;
  options?: Option[];
}
