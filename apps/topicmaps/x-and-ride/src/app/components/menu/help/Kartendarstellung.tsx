import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSymbolSVG, prSVG, brSVG } from '../../../../helper/styler';
const Kartendarstellung = () => {
  const inlinePRVSVG = getSymbolSVG(24, '#FFFFFF', 'pr', 'prSVG', prSVG);
  const inlineBRVSVG = getSymbolSVG(24, '#FFFFFF', 'br', 'brSVG', brSVG);
  let urlPrefix = window.location.origin + window.location.pathname;

  return (
    <p>
      Zur Darstellung der Anlagen in der Karte verwenden wir zwei
      unterschiedliche Symbole für die P+R- {inlinePRVSVG} und die B+R-Anlagen{' '}
      {inlineBRVSVG}. Die Farben der Symbole werden in der Titelzeile der
      Info-Box unten rechts aufgegriffen. Zusätzlich wird dort der Typ der
      Anlage (Park + Ride bzw. Bike + Ride) wiederholt. Räumlich nah beieinander
      liegende Anlagen werden standardmäßig maßstabsabhängig zu größeren
      Kreis-Symbolen zusammengefasst, jeweils mit der Anzahl der repräsentierten
      Anlagen im Zentrum{' '}
      <img
        alt="Cluster"
        width="32"
        src={urlPrefix + 'images/prbr_cluster.png'}
      />
      . Vergrößern Sie ein paar Mal durch direktes Anklicken eines solchen
      Punktes oder mit <FontAwesomeIcon icon={faPlus} /> die Darstellung, so
      werden die zusammengefassten Anlagen Schritt für Schritt in die kleineren
      Symbole für die Einzel-Anlagen zerlegt.
    </p>
  );
};

export default Kartendarstellung;
