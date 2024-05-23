type Translation = {
  x: number;
  y: number;
  z: number;
};

export type TilesetConfig = {
  url: string;
  translation: Translation;
};

export type ColorRgbaArray = [number, number, number, number];
