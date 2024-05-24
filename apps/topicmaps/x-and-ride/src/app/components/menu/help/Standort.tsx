import Icon from 'react-cismap/commons/Icon';

const Standort = () => {
  return (
    <>
      <p>
        Im Bereich "<b>Filter</b>" können Sie im Anwendungsmenü{' '}
        <Icon name="bars" /> die in der Karte angezeigten P+R- und B+R-Anlagen
        so ausdünnen, dass nur die für Sie interessanten Anlagen übrig bleiben.
        Standardmäßig sind die Einstellungen hier so gesetzt, dass alle Anlagen
        angezeigt werden.
      </p>
      <p>
        Mit den Optionen unter "
        <b>
          <i>Umweltzonen</i>
        </b>
        " können Sie die Kartenanzeige auf Anlagen innerhalb oder außerhalb der
        beiden Wuppertaler Umweltzonen beschränken. Unter "
        <b>
          <i>Art der Anlage</i>
        </b>
        " können Sie die Anzeige auf P+R- oder B+R-Anlagen eingrenzen.
      </p>
      <p>
        Ihre Einstellungen werden direkt in der blauen Titelzeile des Bereichs "
        <b>Filter</b>" und in dem Donut-Diagramm, das Sie rechts neben oder
        unter den Filteroptionen finden, ausgewertet. Die Titelzeile zeigt die
        Gesamtanzahl der P+R- und B+R-Anlagen, die den von Ihnen gesetzten
        Filterbedingungen entsprechen. Das Donut-Diagramm zeigt zusätzlich die
        Verteilung auf die beiden Kategorien Park + Ride bzw. Bike + Ride.
        Bewegen Sie dazu den Mauszeiger auf eines der farbigen Segmente des
        Diagramms.
      </p>
    </>
  );
};

export default Standort;
