import { stopwords } from "./stopwords.de-de";
import { ENDPOINT } from "@carma-mapping/fuzzy-search";

export { stopwords };

export const host = "https://wupp-topicmaps-data.cismet.de";
export const DEFAULT_PROJ = "3857";

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
  ENDPOINT.ADRESSEN,
  ENDPOINT.BEZIRKE,
  ENDPOINT.QUARTIERE,
  ENDPOINT.KITAS,
];

export const sourcesConfig = DEFAULT_GAZ_SOURCES.map((endpoint) =>
  createConfig(endpoint),
);
