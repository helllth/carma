import LicenseLuftbildkarte from 'react-cismap/topicmaps/wuppertal/LicenseLuftbildkarte';
import LicenseStadtplanTagNacht from 'react-cismap/topicmaps/wuppertal/LicenseStadtplanTagNacht';

const Datengrundlage = () => {
  return (
    <div>
      <p>
        Der <strong>Kulturstadtplan Wuppertal</strong> bietet ihnen die
        folgenden Hintergrundkarten an, die auf verschiedenen Geodatendiensten
        und Geodaten basieren:
      </p>

      <ul>
        <LicenseStadtplanTagNacht />
        <LicenseLuftbildkarte />
      </ul>

      <p>
        Zusätzlich nutzt der Kulturstadtplan für die Themendarstellung den
        Datensatz{' '}
        <a
          target="_legal"
          href="https://offenedaten-wuppertal.de/dataset/veranstaltungsorte-wuppertal"
        >
          Veranstaltungsorte Wuppertal
        </a>{' '}
        aus dem Open-Data-Angebot der Stadt Wuppertal.
      </p>
    </div>
  );
};

export default Datengrundlage;
