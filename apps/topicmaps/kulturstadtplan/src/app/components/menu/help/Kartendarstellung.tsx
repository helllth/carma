import Icon from 'react-cismap/commons/Icon';

const Kartendarstellung = () => {
  let urlPrefix = window.location.origin + window.location.pathname;
  return (
    <div>
      <p>
        Die POI der kulturellen Einrichtungen werden in der Karte durch
        Punktsymbole in Form von Piktogrammen mit farbigem Hintergrund
        dargestellt. Für einige klar definier- und unterscheidbare Kategorien
        (Clubs, Filmtheater, Museen und Galerien, Theater) verwenden wir feste
        Kombinationen von Piktogramm und Hintergrundfarbe. In der Kategorie
        "Sonstige Veranstaltungsorte" werden dagegen verschiedene Piktogramme
        mit der gleichen Hintergrundfarbe (Ocker) verwendet. Hierunter fallen
        zum einen Einrichtungen mit einem individuellen Profil, die
        unterschiedlichen Veranstaltungsarten Raum geben{' '}
        <img
          alt="Cluster"
          height="20"
          src={urlPrefix + 'images/kontakthof.png'}
        />
        . Zum anderen umfasst diese Kategorie alle POI, die nur in zweiter Linie
        Veranstaltungsorte sind. So ist z. B. die Bergische Musikschule{' '}
        <img
          alt="Cluster"
          height="20"
          src={urlPrefix + 'images/bergische_musikschule.png'}
        />{' '}
        in erster Linie als Bildungseinrichtung eingestuft, in der aber auch
        Konzerte, Lesungen und Theateraufführungen stattfinden.
      </p>
      <p>
        Räumlich nah beieinander liegende Veranstaltungsorte werden
        standardmäßig maßstabsabhängig zu größeren Punkten zusammengefasst, mit
        der Anzahl der repräsentierten POI im Zentrum{' '}
        <img
          alt="Cluster"
          height="30"
          src={urlPrefix + 'images/veranstaltungsorte_zusammen.png'}
        />
        . Vergrößern Sie ein paar Mal durch direktes Anklicken eines solchen
        Punktes oder mit <Icon name="plus" /> die Darstellung, so werden die
        zusammengefassten POI Schritt für Schritt in die kleineren Symbole für
        die konkreten Einzel-POI zerlegt. Ab einer bestimmten Maßstabsstufe
        (Zoomstufe 12) führt ein weiterer Klick dazu, dass eine
        Explosionsgraphik der zusammengefassten POI angezeigt wird.
      </p>
    </div>
  );
};

export default Kartendarstellung;
