import { useContext, useState } from 'react';
import { Button, Form, Tabs, Tab } from 'react-bootstrap';

import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from 'react-cismap/contexts/FeatureCollectionContextProvider';
import { ResponsiveTopicMapContext } from 'react-cismap/contexts/ResponsiveTopicMapContextProvider';
import { TopicMapStylingContext } from 'react-cismap/contexts/TopicMapStylingContextProvider';

import 'url-search-params-polyfill';
import Icon from 'react-cismap/commons/Icon';
import {
  getAllEinrichtungen,
  getColorFromMainlocationTypeName,
  textConversion,
} from '../../../helper/styler';

const FilterUI = () => {
  const [filterMode, setFilderMode] = useState('einrichtungen');
  // @ts-ignore
  const { filterState, itemsDictionary } = useContext(FeatureCollectionContext);
  // @ts-ignore
  const { setFilterState } = useContext(FeatureCollectionDispatchContext);
  // @ts-ignore
  const { windowSize } = useContext(ResponsiveTopicMapContext);
  // @ts-ignore
  const { additionalStylingInfo } = useContext(TopicMapStylingContext);

  const width = windowSize?.width || 500;

  let widePieChartPlaceholder: any = null;
  let narrowPieChartPlaceholder: any = null;

  let pieChart = <></>;

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
            <td style={{ width: '330px', verticalAlign: 'top' }}>
              <Form>
                <table style={{ width: '100%', border: 0 }}>
                  <tbody style={{ width: '100%', verticalAlign: 'top' }}>
                    <tr>
                      <td>
                        <div style={{ width: '100%' }}>
                          <h4>Filtern nach</h4>
                          <Tabs
                            id="controlled-tabs"
                            activeKey={filterState.mode}
                            onSelect={(key) => {
                              if (key) {
                                setFilderMode(key);
                                const newFilterState = { ...filterState };
                                newFilterState.mode = key;
                                setFilterState(newFilterState);
                              }
                            }}
                          >
                            <Tab eventKey="einrichtungen" title="Einrichtungen">
                              <table style={{ width: '100%', margin: 8 }}>
                                <tbody>
                                  <tr>
                                    <td align="center">
                                      <a
                                        style={{
                                          margin: 4,
                                        }}
                                        onClick={() => {}}
                                      >
                                        alle
                                      </a>
                                    </td>
                                    <td align="center">
                                      <a
                                        style={{
                                          margin: 4,
                                        }}
                                        onClick={() => {}}
                                      >
                                        keine
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              {getAllEinrichtungen().map((einrichtung) => {
                                return (
                                  <div
                                    key={
                                      'filter.kulturstadtplan.kategorien.div.' +
                                      einrichtung
                                    }
                                  >
                                    <Form.Check
                                      readOnly={true}
                                      key={
                                        'filter.kulturstadtplan.kategorie.' +
                                        einrichtung
                                      }
                                      onClick={(e) => {
                                        const newFilterState = JSON.parse(
                                          JSON.stringify(filterState)
                                        );
                                        if (e.target.checked) {
                                          if (
                                            newFilterState[
                                              'einrichtung'
                                            ].indexOf(einrichtung) === -1
                                          ) {
                                            newFilterState['einrichtung'].push(
                                              einrichtung
                                            );
                                          } else {
                                            if (
                                              newFilterState[
                                                'einrichtung'
                                              ].indexOf(einrichtung) !== -1
                                            ) {
                                              let filterStateSet = new Set(
                                                newFilterState['einrichtung']
                                              );
                                              filterStateSet.delete(
                                                einrichtung
                                              );
                                              newFilterState['einrichtung'] =
                                                Array.from(filterStateSet);
                                            }
                                          }
                                        }

                                        console.log('xxx', newFilterState);
                                        setFilterState(newFilterState);
                                      }}
                                      checked={
                                        filterState['einrichtung']?.indexOf(
                                          einrichtung
                                        ) !== -1
                                      }
                                      inline
                                      label={
                                        <>
                                          {textConversion(einrichtung)}{' '}
                                          <Icon
                                            style={{
                                              color:
                                                getColorFromMainlocationTypeName(
                                                  einrichtung
                                                ),
                                              width: '30px',
                                              textAlign: 'center',
                                            }}
                                            name={'circle'}
                                          />
                                        </>
                                      }
                                    />
                                  </div>
                                );
                              })}
                            </Tab>
                            <Tab
                              eventKey="veranstaltungen"
                              title="Veranstaltungen"
                            >
                              <table style={{ width: '100%', margin: 8 }}>
                                <tbody>
                                  <tr>
                                    <td align="center">
                                      <a
                                        style={{
                                          margin: 4,
                                        }}
                                        onClick={() => {}}
                                      >
                                        alle
                                      </a>
                                    </td>
                                    <td align="center">
                                      <a
                                        style={{
                                          margin: 4,
                                        }}
                                        onClick={() => {}}
                                      >
                                        keine
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              {itemsDictionary?.veranstaltungsarten?.map(
                                (art) => {
                                  return (
                                    <div
                                      key={
                                        'div.filter.kulturstadtplan.veranstaltungsart.' +
                                        art
                                      }
                                    >
                                      <Form.Check
                                        readOnly={true}
                                        key={
                                          'filter.kulturstadtplan.veranstaltungsart.' +
                                          art
                                        }
                                        onClick={(e) => {}}
                                        checked={true}
                                        inline
                                        label={<>{textConversion(art)}</>}
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </Tab>
                          </Tabs>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form>
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
