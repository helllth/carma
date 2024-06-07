import Icon from 'react-cismap/commons/Icon';

const POI = () => {
  return (
    <>
      <p>
        Bewegen Sie den Mauszeiger im Kartenfenster auf einen konkreten
        Einzel-POI, um sich seine Bezeichnung anzeigen zu lassen. Ein Klick auf
        das zugehörige POI-Symbol setzt den Fokus auf diesen POI. Er wird dann
        blau hinterlegt und die zugehörigen Informationen (Bezeichnung,
        Info-Text und ggf. Adresse) werden in der Info-Box (unten rechts)
        angezeigt. (Auf einem Tablet-PC wird der Fokus durch das erste Antippen
        des Angebots gesetzt, das zweite Antippen blendet die Bezeichnung ein.)
        Außerdem werden Ihnen in der Info-Box weiterführende (Kommunikations-)
        Links zum POI angezeigt: <Icon name="external-link-square" /> Internet,{' '}
        <Icon name="envelope-square" /> E-Mail und <Icon name="phone" />{' '}
        Telefon. Bei POI, zu denen im Terminkalender von{' '}
        <a href="https://wuppertal-live.de">www.wuppertal-live.de</a>{' '}
        Veranstaltungen geführt werden, finden sie zusätzlich noch eine{' '}
        <Icon name="calendar" /> Verknüpfung zu wuppertal-live.de, wo sie für
        viele Veranstaltungen auch Online-Tickets erwerben können.
      </p>
      <p>
        Wenn Sie noch nicht aktiv einen bestimmten POI im aktuellen
        Kartenausschnitt selektiert haben, wird der Fokus automatisch auf den
        nördlichsten POI gesetzt. Mit den Funktionen <a>&lt;&lt;</a> vorheriger
        Treffer und <a>&gt;&gt;</a> nächster Treffer können Sie in nördlicher
        bzw. südlicher Richtung alle aktuell im Kartenfenster angezeigten POI
        durchmustern.
      </p>
      <p>
        Mit der Schaltfläche <Icon name="chevron-circle-down" /> im dunkelgrau
        abgesetzten rechten Rand der Info-Box lässt sich diese so verkleinern,
        dass nur noch die Kategorisierung und die Bezeichnung des POI sowie die
        Link-Symbole angezeigt werden - nützlich für Endgeräte mit kleinem
        Display. Mit der Schaltfläche <Icon name="chevron-circle-up" /> an
        derselben Stelle können Sie die Info-Box dann wieder vollständig
        einblenden.
      </p>
    </>
  );
};

export default POI;
