import { Cartesian3, Cartographic } from 'cesium';
import styles from '../UI/CompareCartesian3Table.module.css';
import { highlightLocalDegrees, highlightLocalMeters } from '../Formatters';

interface CompareCartesian3TableProps {
  posA?: Cartesian3;
  posB?: Cartesian3;
  showCartographic?: boolean;
  title?: string;
  posAName?: string;
  posBName?: string;
}

const CompareCartesian3Table = ({
  posA,
  posB,
  posAName = 'Pos A',
  posBName = 'Pos B',
  showCartographic = true,
  title = 'Compare Cartesian3',
}: CompareCartesian3TableProps) => {
  let posCartoA, posCartoB, delta, deltaCarto;

  if (posA && posB) {
    delta = Cartesian3.subtract(posA, posB, new Cartesian3());
  }

  if (showCartographic) {
    if (posA) {
      posCartoA = Cartographic.fromCartesian(posA);
    }
    if (posB) {
      posCartoB = Cartographic.fromCartesian(posB);
    }
    if (posCartoA && posCartoB) {
      deltaCarto = {
        latitude: posCartoA.latitude - posCartoB.latitude,
        longitude: posCartoA.longitude - posCartoB.longitude,
        height: posCartoA.height - posCartoB.height,
      };
    }
  }

  return (
    <table className={styles.table}>
      <tbody>
      <tr>
        <th colSpan={2}>{title}</th>
      </tr>
      <tr>
        <td></td>
        {posA && <th>{posAName}</th>}
        {posB && <th>{posBName}</th>}
        {delta && <th>Delta</th>}
      </tr>
      <tr>
        <th>x</th>
        {posA && <td>{highlightLocalMeters(posA.x)}</td>}
        {posB && <td>{highlightLocalMeters(posB.x)}</td>}
        {delta && (
          <td>{highlightLocalMeters(delta.x, { errorThreshold: 20 })}</td>
        )}
      </tr>
      <tr>
        <th>y</th>
        {posA && <td>{highlightLocalMeters(posA.y)}</td>}
        {posB && <td>{highlightLocalMeters(posB.y)}</td>}
        {delta && (
          <td>{highlightLocalMeters(delta.y, { errorThreshold: 20 })}</td>
        )}
      </tr>
      <tr>
        <th>z</th>
        {posA && <td>{highlightLocalMeters(posA.z)}</td>}
        {posB && <td>{highlightLocalMeters(posB.z)}</td>}
        {delta && (
          <td>{highlightLocalMeters(delta.z, { errorThreshold: 20 })}</td>
        )}
      </tr>
      {showCartographic && (
        <>
          <tr>
            <th>h</th>
            <td>{posCartoA && highlightLocalMeters(posCartoA.height)}</td>
            <td>{posCartoB && highlightLocalMeters(posCartoB.height)}</td>
            <td>{deltaCarto && highlightLocalMeters(deltaCarto.height)}</td>
          </tr>
          <tr>
            <th>lat</th>
            <td>{posCartoA && highlightLocalDegrees(posCartoA.latitude)}</td>
            <td>{posCartoB && highlightLocalDegrees(posCartoB.latitude)}</td>
            <td>{deltaCarto && highlightLocalDegrees(deltaCarto.latitude)}</td>
          </tr>
          <tr>
            <th>lon</th>
            <td>{posCartoA && highlightLocalDegrees(posCartoA.longitude)}</td>
            <td>{posCartoB && highlightLocalDegrees(posCartoB.longitude)}</td>
            <td>{deltaCarto && highlightLocalDegrees(deltaCarto.longitude)}</td>
          </tr>
        </>
      )}
      </tbody>
    </table>
  );
};

export default CompareCartesian3Table;
