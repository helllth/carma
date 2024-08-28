// import { stopwords } from "./stopwords.de-de";

export const host = "https://wupp-topicmaps-data.cismet.de";
export const DEFAULT_PROJ = "3857";
export const DEFAULT_SRC_PROJ = "25832";

export type ENDPOINT =
  | "adressen"
  | "aenderungsv"
  | "bezirke"
  | "bpklimastandorte"
  | "bplaene"
  | "ebikes"
  | "emob"
  | "geps"
  | "geps_reverse"
  | "kitas"
  | "prbr"
  | "no2"
  | "quartiere"
  | "pois";

const createUrl = (endpoint: ENDPOINT, crs: string = DEFAULT_PROJ) =>
  `${host}/data/${crs}/${endpoint}.json`;

export const gazDataPrefix = "GazDataForStories";

const createConfig = (endpoint: ENDPOINT, crs = DEFAULT_PROJ) => ({
  topic: endpoint,
  url: createUrl(endpoint, crs),
  crs,
});

// add default endpoints here
const DEFAULT_GAZ_SOURCES: ENDPOINT[] = [
  "adressen",
  "bezirke",
  "quartiere",
  "pois",
  "kitas",
];

export const sourcesConfig = DEFAULT_GAZ_SOURCES.map((endpoint) =>
  createConfig(endpoint),
);

export const titleMapConfig: Record<ENDPOINT, string> = {
  pois: "POIS",
  bpklimastandorte: "Klimastandorte",
  kitas: "Kitas",
  bezirke: "Bezirke",
  quartiere: "Quartiere",
  adressen: "Adressen",
  // todo to be confirmed
  aenderungsv: "Änderungsverfahren",
  bplaene: "Bebauungs-Pläne",
  emob: "Elektromobilität",
  ebikes: "E-Bikes",
  geps: "GEPS",
  geps_reverse: "GEPS",
  prbr: "PR BR",
  no2: "NO2",
};
