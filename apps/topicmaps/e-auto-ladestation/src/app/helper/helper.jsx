import React from 'react';
import IconComp from 'react-cismap/commons/Icon';
import { md5FetchJSON } from 'react-cismap/tools/fetching';

import { host } from './constants';

export const getConnectorImageUrl = (type) => {
  switch (type) {
    case 'Schuko':
      return '/images/emob/Schuko_plug.png';
    case 'Typ 2':
      return '/images/emob/Type_2_mennekes.png';
    case 'CHAdeMO':
      return '/images/emob/Chademo_type4.png';
    case 'CCS':
      return '/images/emob/Type1-ccs.png';
    case 'Tesla Supercharger':
      return '/images/emob/Type_2_mennekes.png';
    case 'Drehstrom':
      return '/images/emob/cce3.png';
    default:
      return undefined;
  }
};

export const getPOIColors = async (setPoiColors) => {
  md5FetchJSON('poi_colors', host + '/data/poi.farben.json').then((data) => {
    setPoiColors(data);
  });
};

export const fotoKraemerUrlManipulation = (input) => {
  if (input !== undefined || input === '') {
    const ret = input.replace(
      /https*:\/\/.*fotokraemer-wuppertal\.de/,
      'https://wunda-geoportal-fotos.cismet.de/'
    );
    // console.log('converted url from ', input);
    // console.log('converted url to ', ret);
    return ret;
  } else {
    return undefined;
  }
};

export const fotoKraemerCaptionFactory = (linkUrl) => (
  <a href={linkUrl} target="_fotos">
    <IconComp name="copyright" /> Peter Kr&auml;mer - Fotografie
  </a>
);
