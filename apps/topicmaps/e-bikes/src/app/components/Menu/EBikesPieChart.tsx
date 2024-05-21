import ReactChartkick, { PieChart } from 'react-chartkick';
import { Chart } from 'chart.js';
import { useContext } from 'react';
import { FeatureCollectionContext } from 'react-cismap/contexts/FeatureCollectionContextProvider';
import { getColorForProperties } from '../../../helper/styler';

ReactChartkick.addAdapter(Chart);

const EBikesPieChart = ({ visible = true }) => {
  // @ts-ignore
  const { filteredItems } = useContext(FeatureCollectionContext);

  const groupingFunction = (obj) => {
    let groupString = obj.typ;
    if (groupString === 'Ladestation') {
      if (obj.online === true) {
        groupString = groupString + ' (online)';
      } else {
        groupString = groupString + ' (offline)';
      }
    }
    return groupString;
  };

  if (visible && filteredItems) {
    let stats = {};
    let colormodel = {};
    let piechartData: any = [];
    let piechartColor: any = [];
    stats['P+R'] = 0;
    stats['B+R'] = 0;

    for (let obj of filteredItems) {
      let group = groupingFunction(obj);
      if (stats[group] === undefined) {
        stats[group] = 1;
        colormodel[group] = getColorForProperties(obj);
      } else {
        stats[group] += 1;
      }
    }

    for (let key in stats) {
      piechartData.push([key, stats[key]]);
      piechartColor.push(colormodel[key]);
    }
    console.log('xxx', piechartData);
    console.log('xxx', piechartColor);
    return (
      // <PieChart
      //   data={piechartData}
      //   donut={true}
      //   title="Verteilung"
      //   legend={false}
      //   colors={piechartColor}
      // />
      <></>
    );
  } else {
    return null;
  }
};

export default EBikesPieChart;
