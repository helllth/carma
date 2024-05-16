import { Chart } from 'chart.js';
import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import ReactChartkick, { PieChart } from 'react-chartkick';
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from 'react-cismap/contexts/FeatureCollectionContextProvider';
import { ResponsiveTopicMapContext } from 'react-cismap/contexts/ResponsiveTopicMapContextProvider';
import { TopicMapStylingContext } from 'react-cismap/contexts/TopicMapStylingContextProvider';
import { getColorFromLebenslagenCombination } from './helper/styler';
import { constants as kitasConstants } from './helper/constants';
import Icon from 'react-cismap/commons/Icon';

import 'url-search-params-polyfill';
import KitasTraegertypMapVisSymbol from './helper/KitasTraegertypMapVisSymbol';
import KitasProfileMapVisSymbol from './helper/KitasProfileMapVisSymbol';

ReactChartkick.addAdapter(Chart);

const FilterUI = () => {
  const { itemsDictionary, filteredItems, filterState } = useContext(
    FeatureCollectionContext
  );
  const { setFilterState } = useContext(FeatureCollectionDispatchContext);
  const { windowSize } = useContext(ResponsiveTopicMapContext);

  const { additionalStylingInfo } = useContext(TopicMapStylingContext);
  const poiColors = additionalStylingInfo?.poiColors;

  const width = windowSize?.width || 500;

  const traegertypMap = [
    { text: 'städtisch', c: kitasConstants.TRAEGERTYP_STAEDTISCH },
    { text: 'evangelisch', c: kitasConstants.TRAEGERTYP_EVANGELISCH },
    { text: 'katholisch', c: kitasConstants.TRAEGERTYP_KATHOLISCH },
    { text: 'Elterninitiative', c: kitasConstants.TRAEGERTYP_ELTERNINITIATIVE },
    { text: 'Betrieb', c: kitasConstants.TRAEGERTYP_BETRIEBSKITA },
    { text: 'andere freie Träger', c: kitasConstants.TRAEGERTYP_ANDERE },
  ];
  let widePieChartPlaceholder = null;
  let narrowPieChartPlaceholder = null;

  let stats = {};

  let piechartData = [];
  let piechartColor = [];

  for (let key in stats) {
    piechartData.push([key, stats[key]]);
    piechartColor.push(getColorFromLebenslagenCombination(key, poiColors));
  }

  let pieChart = (
    <PieChart
      data={piechartData}
      donut={true}
      title="Verteilung"
      legend={false}
      colors={piechartColor}
    />
  );

  if (width < 995) {
    narrowPieChartPlaceholder = (
      <div>
        <br /> {pieChart}
      </div>
    );
  } else {
    widePieChartPlaceholder = pieChart;
  }

  return (
    <div>
      <table border={0} width="100%">
        <tbody>
          <tr>
            <td valign="center" style={{ width: '330px' }}>
              <Form>
                <label
                  style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    marginBottom: '5px',
                    fontWeight: 700,
                  }}
                >
                  Trägertyp
                  {'  '}
                  <Icon
                    style={{
                      color: 'grey',
                      width: '30px',
                      textAlign: 'center',
                    }}
                    size="2x"
                    name={'home'}
                  />
                </label>
                {traegertypMap.map((item) => {
                  return (
                    <div key={'filter.kita.traeger.div.' + item.c}>
                      <Form.Check
                        readOnly={true}
                        key={'filter.kita.traeger.' + item.c}
                        onClick={(e) => {
                          // const newFilterState = { ...filter };
                          // newFilterState.nur_online = e.target.checked;
                          // setFilter(newFilterState);
                        }}
                        checked={true}
                        label={
                          <>
                            {item.text}{' '}
                            <KitasTraegertypMapVisSymbol
                              visible={true}
                              traegertyp={kitasConstants.TRAEGERTYP.indexOf(
                                item.c
                              )}
                            />
                          </>
                        }
                      />
                    </div>
                  );
                })}
              </Form>
              <br />
              <Form>
                <label
                  style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    marginBottom: '5px',
                    fontWeight: 700,
                  }}
                >
                  Profil
                  {'  '}
                  <Icon
                    style={{
                      color: 'grey',
                      width: '30px',
                      textAlign: 'center',
                    }}
                    size="2x"
                    name={'child'}
                  />
                </label>
                <br />
                <Form.Check
                  readOnly={true}
                  key={'filter.kita.inklusion.checkbox'}
                  onClick={(e) => {
                    // if (e.target.checked === false) {
                    //   removeFilterFor(
                    //     'profil',
                    //     kitasConstants.PROFIL_INKLUSION
                    //   );
                    // } else {
                    //   addFilterFor('profil', kitasConstants.PROFIL_INKLUSION);
                    // }
                  }}
                  checked={true}
                  inline
                  label="Schwerpunkt Inklusion"
                />

                {'  '}
                <KitasProfileMapVisSymbol inklusion={true} visible={true} />
                <br />
                <Form.Check
                  readOnly={true}
                  key={'filter.kita.normal.checkbox'}
                  onClick={(e) => {
                    // if (e.target.checked === false) {
                    //   removeFilterFor('profil', kitasConstants.PROFIL_NORMAL);
                    // } else {
                    //   addFilterFor('profil', kitasConstants.PROFIL_NORMAL);
                    // }
                  }}
                  checked={true}
                  inline
                  label="ohne Schwerpunkt Inklusion"
                />
                {'  '}
                <KitasProfileMapVisSymbol inklusion={false} visible={true} />
              </Form>
              <Form>
                <br />
                <label
                  style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    marginBottom: '5px',
                    fontWeight: 700,
                  }}
                >
                  Kindesalter{' '}
                  <Icon
                    style={{
                      color: 'grey',
                      width: '30px',
                      textAlign: 'center',
                    }}
                    size="2x"
                    name={'user'}
                  />
                </label>
                <br />
                <Form.Check
                  type="radio"
                  readOnly={true}
                  key={'filter.kita.alter.unter2'}
                  onClick={(e) => {
                    // if (e.target.checked === true) {
                    //   addFilterFor('alter', kitasConstants.ALTER_UNTER2);
                    //   removeFilterFor('alter', kitasConstants.ALTER_AB2);
                    //   removeFilterFor('alter', kitasConstants.ALTER_AB3);
                    // }
                  }}
                  checked={true}
                  inline
                  label="unter 2 Jahre"
                />

                <br />
                <Form.Check
                  type="radio"
                  readOnly={true}
                  key={'filter.kita.alter.ab2'}
                  onClick={(e) => {
                    // if (e.target.checked === true) {
                    //   addFilterFor('alter', kitasConstants.ALTER_AB2);
                    //   removeFilterFor('alter', kitasConstants.ALTER_UNTER2);
                    //   removeFilterFor('alter', kitasConstants.ALTER_AB3);
                    // }
                  }}
                  checked={false}
                  inline
                  label="2 bis 3 Jahre"
                />
                <br />
                <Form.Check
                  type="radio"
                  readOnly={true}
                  key={'filter.kita.alter.ab3'}
                  onClick={(e) => {
                    // if (e.target.checked === true) {
                    //   addFilterFor('alter', kitasConstants.ALTER_AB3);
                    //   removeFilterFor('alter', kitasConstants.ALTER_AB2);
                    //   removeFilterFor('alter', kitasConstants.ALTER_UNTER2);
                    // }
                  }}
                  checked={false}
                  inline
                  label="ab 3 Jahre"
                />
              </Form>
              <Form>
                <br />
                <label
                  style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    marginBottom: '5px',
                    fontWeight: 700,
                  }}
                >
                  Betreuungsumfang{' '}
                  <Icon
                    style={{
                      color: 'grey',
                      width: '40px',
                      textAlign: 'center',
                    }}
                    size="2x"
                    name={'calendar'}
                  />
                </label>
                <br />
                <Form.Check
                  key="filter.kita.umfang.35h"
                  readOnly={true}
                  onClick={(e) => {
                    // if (e.target.checked === false) {
                    //   removeFilterFor(
                    //     'umfang',
                    //     kitasConstants.STUNDEN_FILTER_35
                    //   );
                    // } else {
                    //   addFilterFor('umfang', kitasConstants.STUNDEN_FILTER_35);
                    // }
                  }}
                  checked={true}
                  name="mapBackground"
                  inline
                  label="35 Stunden pro Woche"
                />

                <br />
                <Form.Check
                  key="filter.kita.umfang.45h"
                  readOnly={true}
                  onClick={(e) => {
                    // if (e.target.checked === false) {
                    //   removeFilterFor(
                    //     'umfang',
                    //     kitasConstants.STUNDEN_FILTER_45
                    //   );
                    // } else {
                    //   addFilterFor('umfang', kitasConstants.STUNDEN_FILTER_45);
                    // }
                  }}
                  name="mapBackground"
                  checked={true}
                  inline
                  label="45 Stunden pro Woche"
                />
              </Form>
              <br />
              <br />
              <p>
                <Button bsSize="small" onClick={() => resetFilter()}>
                  Filter zurücksetzen (Alle Kitas anzeigen)
                </Button>
              </p>
            </td>
            {widePieChartPlaceholder}
          </tr>
        </tbody>
      </table>
      {narrowPieChartPlaceholder}
    </div>
  );
};
export default FilterUI;
