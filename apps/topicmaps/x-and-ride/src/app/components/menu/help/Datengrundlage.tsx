import LicenseLuftbildkarte from 'react-cismap/topicmaps/wuppertal/LicenseLuftbildkarte';
import LicenseStadtplanTagNacht from 'react-cismap/topicmaps/wuppertal/LicenseStadtplanTagNacht';

const Datengrundlage = () => {
  return (
    <div>
      <p>
        Die <strong> Park+Ride-Karte Wuppertal</strong> bietet ihnen die
        folgenden Hintergrundkarten an, die auf verschiedenen Geodatendiensten
        und Geodaten basieren:
      </p>

      <ul>
        <LicenseStadtplanTagNacht />
        <LicenseLuftbildkarte />
      </ul>

      <p>
        Zusätzlich nutzt die P+R-Karte die Datensätze{' '}
        <a
          target="_legal"
          href="https://offenedaten-wuppertal.de/dataset/park-and-ride-anlagen-wuppertal"
        >
          Park and Ride Anlagen Wuppertal
        </a>
        ,{' '}
        <a
          target="_legal"
          href="https://offenedaten-wuppertal.de/dataset/bike-and-ride-anlagen-wuppertal"
        >
          Bike and Ride Anlagen Wuppertal
        </a>{' '}
        und{' '}
        <a
          target="_legal"
          href="https://offenedaten-wuppertal.de/dataset/umweltzonen-wuppertal"
        >
          Umweltzonen Wuppertal
        </a>{' '}
        aus dem Open-Data-Angebot der Stadt Wuppertal.
      </p>
    </div>
  );
};

export default Datengrundlage;
