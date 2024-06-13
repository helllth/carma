import { md5FetchJSON, md5FetchText } from 'react-cismap/tools/fetching';
import { getGazDataForTopicIds } from 'react-cismap/tools/gazetteerHelper';

import { host } from './constants';

export const getGazData = async (setGazData) => {
  const prefix = 'GazData';
  const sources = {};

  sources.kitas = await md5FetchText(prefix, host + '/data/kitas.json');

  const gazData = getGazDataForTopicIds(sources, ['kitas']);

  setGazData(gazData);
};

export const getPOIColors = async (setPoiColors) => {
  md5FetchJSON('poi_colors', host + '/data/poi.farben.json').then((data) => {
    setPoiColors(data);
  });
};
