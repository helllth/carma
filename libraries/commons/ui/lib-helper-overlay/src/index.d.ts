export type OverlayHelperHightlighterProps = {
  configs: OverlayHelperConfig[];
  closeOverlay: () => void;
  transparency?: number;
  color?: string;
};

export type OverlayTourAction = (arg: OverlayHelperConfig) => void;

export type OverlayTourContext = {
  configs: OverlayHelperConfig[];
  addConfig: OverlayTourAction;
  removeConfig: OverlayTourAction;
};

export type PositionOverlayHelper =
  | "center"
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "left-center"
  | "left-top"
  | "left-bottom"
  | "right-center"
  | "right-top"
  | "right-bottom"
  | "top-center"
  | "top-right"
  | "top-left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

export interface OverlayHelperConfig {
  el: HTMLElement;
  message: string;
  containerPos?: PositionOverlayHelper;
  contentPos?: PositionOverlayHelper;
  contentWidth?: string;
}

export type OptionsOverlayHelper = {
  containerPos?: PositionOverlayHelper;
  contentPos?: PositionOverlayHelper;
  contentWidth?: string;
};

type Position = { [key: string]: string | number };

export interface HighlightRect {
  rect: DOMRect;
  message: string;
  pos: Position;
  contentPos: any;
  contPos: Position;
  contentWidth?: string;
}

export type OverlayTourProviderProps = {
  children: JSX.Element;
  showOverlay: boolean;
  closeOverlay: () => void;
  transparency?: number;
  color?: string;
};
