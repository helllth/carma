const Kulturstadtplan = () => {
  return (
    <>
      <p>
        Unter "<strong>Mein Kulturstadtplan</strong>" finden sie im
        Anwendungsmenü zwei alternative Möglichkeiten vor, die Menge der
        angezeigten POI gemäß Ihren Vorlieben einzuschränken. Auf zwei
        angedeuteten Karteikarten wird zum einen das Filtern nach Kategorien von
        Einrichtungen angeboten, zum anderen das Filtern nach Kategorien von
        Veranstaltungen, die an den zugehörigen POI typischerweise angeboten
        werden. Der Titel der gerade nicht sichtbaren Karteikarte wird als{' '}
        <a>Hyperlink</a> dargestellt Zum Wechsel zwischen den beiden
        Karteikarten klicken Sie auf den jeweils verfügbaren Link.
      </p>
      <p>
        Auf den beiden Karteikarten wird Ihnen eine Liste von Einrichtungs- bzw.
        Veranstaltungskategorien angeboten. Die Auswahl erfolgt durch Anklicken
        des (leeren) Kontrollkästchens vor dem jeweiligen Listenelement, die
        Abwahl durch erneutes Anklicken dieses Kästchens. Die beiden
        Filterbereiche werden nicht logisch miteinander verknüpft. Für die
        Filterung wird immer nur die Auswahl auf der im Anwendungsmenü
        sichtbaren Karteikarte ausgewertet.
      </p>
      <p>
        Als Vorschau für die Wirkung ihrer Filtereinstellungen wird Ihnen auf
        beiden Karteikarten ein Donut-Diagramm angezeigt, das die Anzahl der
        herausgefilterten POI und ihre Verteilung auf die Einrichtungskategorien
        anzeigt. Bewegen Sie dazu den Mauszeiger auf eines der farbigen Segmente
        des Diagramms. (Bei einem Gerät mit Touchscreen tippen Sie auf eines der
        farbigen Segmente.)
      </p>
    </>
  );
};

export default Kulturstadtplan;
