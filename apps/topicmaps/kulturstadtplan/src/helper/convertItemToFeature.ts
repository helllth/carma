import { addSVGToProps } from 'react-cismap/tools/svgHelper';
import Color from 'color';
import { getColorForProperties, getHeaderTextForProperties } from './styler';

const getSignature = (properties) => {
  if (properties.signatur) {
    return properties.signatur;
  } else if (properties.mainlocationtype.signatur) {
    return properties.mainlocationtype.signatur;
  }
  return 'Platz.svg';
};

const convertItemToFeature = async (itemIn) => {
  let clonedItem = JSON.parse(JSON.stringify(itemIn));

  let item = await addSVGToProps(clonedItem, (i) => getSignature(i));
  console.log('xxx', item);
  const headerColor = Color(getColorForProperties(item));

  const header = getHeaderTextForProperties(item);

  const info = {
    header: header,
    title: item.standort,
    additionalInfo: item.zusatzinfo,
    subtitle: item.strasse + ' ' + item.hausnummer,
  };

  if (item?.betreiber) {
    if (item.betreiber.email) {
      item.email = item.betreiber.email;
    }

    if (item.betreiber.telefon) {
      item.tel = item.betreiber.telefon;
    }

    if (item.betreiber.homepage) {
      item.url = item.betreiber.homepage;
    }
  }

  if (item.telefon) {
    item.tel = item.telefon;
  }

  if (item.homepage) {
    item.url = item.homepage;
  }

  item.color = headerColor;
  item.info = info;
  const id = item.id;
  const type = 'Feature';
  const selected = false;
  const geometry = item.geojson;
  const text = item.typ === 'Ladestation' ? item.standort : item.standort;

  return {
    id,
    text,
    type,
    selected,
    geometry,
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:EPSG::25832',
      },
    },
    properties: item,
  };
};

export default convertItemToFeature;
