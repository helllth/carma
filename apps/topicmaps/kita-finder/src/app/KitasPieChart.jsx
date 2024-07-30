import ReactChartkick, { PieChart } from 'react-chartkick';
import { Chart } from 'chart.js';
import { constants as kitasConstants } from './helper/constants';
import { getColor, getColorForProperties } from './helper/styler';
import { useContext } from 'react';
import { FeatureCollectionContext } from 'react-cismap/contexts/FeatureCollectionContextProvider';

ReactChartkick.addAdapter(Chart);

const KitasPieChart = ({ visible = true, renderingOption }) => {
  const { filteredItems } = useContext<FeatureCollectionContext>(FeatureCollectionContext);

  if (visible && filteredItems) {
    let stats = {};
    let colormodel = {};
    let piechartData = [];
    let piechartColor = [];

    if (renderingOption === kitasConstants.FEATURE_RENDERING_BY_PROFIL) {
      stats['Kita mit Inklusionsschwerpunkt'] = 0;
      stats['Kita'] = 0;
      for (let kita of filteredItems) {
        if (kita.plaetze_fuer_behinderte === true) {
          stats['Kita mit Inklusionsschwerpunkt'] += 1;
          if (stats['Kita mit Inklusionsschwerpunkt'] === 1) {
            colormodel['Kita mit Inklusionsschwerpunkt'] = getColor(
              kita,
              renderingOption
            );
          }
        } else {
          stats['Kita'] += 1;
          if (stats['Kita'] === 1) {
            colormodel['Kita'] = getColor(kita, renderingOption);
          }
        }
      }
    } else {
      for (let kita of filteredItems) {
        const text =
          kitasConstants.TRAEGERTEXT[
            kitasConstants.TRAEGERTYP[kita.traegertyp]
          ];
        if (stats[text] === undefined) {
          stats[text] = 1;
          colormodel[text] = getColor(kita, renderingOption);
        } else {
          stats[text] += 1;
        }
      }
    }
    for (let key in stats) {
      piechartData.push([key, stats[key]]);
      piechartColor.push(colormodel[key]);
    }
    return (
      <PieChart
        data={piechartData}
        donut={true}
        title="Verteilung"
        legend={false}
        colors={piechartColor}
      />
    );
  } else {
    return null;
  }
};

export default KitasPieChart;
