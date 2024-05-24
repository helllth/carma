import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from 'react-cismap/contexts/FeatureCollectionContextProvider';
import { ResponsiveTopicMapContext } from 'react-cismap/contexts/ResponsiveTopicMapContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faParking } from '@fortawesome/free-solid-svg-icons';

const FilterUI = () => {
  // @ts-ignore
  const { filterState, itemsDictionary } = useContext(FeatureCollectionContext);
  // @ts-ignore
  const { setFilterState } = useContext(FeatureCollectionDispatchContext);
  // @ts-ignore
  const { windowSize } = useContext(ResponsiveTopicMapContext);

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
            <td style={{ width: '330px', verticalAlign: 'center' }}>
              <Form>
                <label
                  style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    marginBottom: '5px',
                    fontWeight: 700,
                  }}
                >
                  Umweltzonen
                  {'  '}
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    size="2x"
                    style={{
                      color: 'grey',
                      width: '30px',
                      textAlign: 'center',
                    }}
                  />{' '}
                </label>
                <br />
                <Form.Check
                  readOnly={true}
                  key={'filter.prbr.envzone.within'}
                  onClick={(e) => {}}
                  checked={true}
                  inline
                  label="innerhalb"
                />

                <br />
                <Form.Check
                  readOnly={true}
                  key={'filter.prbr.envzone.outside'}
                  onClick={(e) => {}}
                  checked={true}
                  inline
                  label="außerhalb"
                />
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
                  Art der Anlage
                  {'  '}
                  <FontAwesomeIcon
                    icon={faParking}
                    size="2x"
                    style={{
                      color: 'grey',
                      width: '30px',
                      textAlign: 'center',
                    }}
                  />{' '}
                </label>
                <br />
                <Form.Check
                  readOnly={true}
                  key={'filter.prbr.pandr'}
                  onClick={(e) => {}}
                  checked={true}
                  inline
                  label="Park+Ride (P+R)"
                />

                <br />
                <Form.Check
                  readOnly={true}
                  key={'filter.prbr.bandr'}
                  onClick={(e) => {}}
                  checked={true}
                  inline
                  label="Bike+Ride (B+R)"
                />
              </Form>
              <br />
              <br />
              <p>
                <Button onClick={() => {}}>
                  Filter zurücksetzen (alle Anlagen anzeigen)
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
