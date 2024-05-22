import Icon from 'react-cismap/commons/Icon';

const Einstellungen = () => {
  return (
    <>
      <p>
        Unter "<strong>Einstellungen</strong>
        " können Sie im Anwendungsmenü <Icon name="bars" /> festlegen, wie die
        POI und die Hintergrundkarte angezeigt werden sollen. Zu den POI können
        Sie auswählen, ob Ihre unter "<strong>Mein Kulturstadtplan</strong>"
        festgelegte Filterung in einer Titelzeile ausgeprägt wird oder nicht.
        Weiter können Sie festlegen, ob räumlich nah beieinander liegende POI
        maßstabsabhängig zu einem Punktsymbol zusammengefasst werden oder nicht.
        Unter "
        <em>
          <strong>Symbolgröße</strong>
        </em>
        " können Sie in Abhängigkeit von Ihrer Bildschirmauflösung und Ihrem
        Sehvermögen auswählen, ob die POI mit kleinen (25 Pixel), mittleren (35
        Pixel) oder großen (45 Pixel) Symbolen angezeigt werden.
      </p>
      <p>
        Unter "
        <em>
          <strong>Hintergrundkarte</strong>
        </em>
        " können Sie auswählen, ob Sie die standardmäßig aktivierte farbige
        Hintergrundkarte verwenden möchten ("<em>Stadtplan (Tag)</em>") oder
        lieber eine invertierte Graustufenkarte ("<em>Stadtplan (Nacht)</em>"),
        zu der uns die von vielen PKW-Navis bei Dunkelheit eingesetzte
        Darstellungsweise inspiriert hat. <strong>Hinweis:</strong> Der
        Stadtplan (Nacht) wird Ihnen nur angeboten, wenn Ihr Browser
        CSS3-Filtereffekte unterstützt, also z. B. nicht beim Microsoft Internet
        Explorer. Die Nacht-Karte erzeugt einen deutlicheren Kontrast mit den
        farbigen POI-Symbolen, die unterschiedlichen Flächennutzungen in der
        Hintergrundkarte lassen sich aber nicht mehr so gut unterscheiden wie in
        der Tag-Karte. Als dritte Möglichkeit steht eine Luftbildkarte zur
        Verfügung, die die Anschaulichkeit des Luftbildes mit der Eindeutigkeit
        des Stadtplans (Kartenschrift, durchscheinende Linien) verbindet.{' '}
      </p>
      <p>
        Im Vorschaubild sehen Sie direkt die prinzipielle Wirkung ihrer
        Einstellungen.
      </p>
    </>
  );
};

export default Einstellungen;
