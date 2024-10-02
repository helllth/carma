import React from "react";
import GenericModalMenuSection from "react-cismap/topicmaps/menu/Section";

const Component = ({ uiState, uiStateActions }) => {
  return (
    <GenericModalMenuSection
      uiState={uiState}
      uiStateActions={uiStateActions}
      sectionKey="szenarien"
      sectionTitle="Simulierte Szenarien"
      sectionBsStyle="info"
      sectionContent={
        <div>
          <p>
            Die berechneten Simulationen wurden mit "künstlichen" Modellregen
            durchgeführt. Bei einem Modellregen handelt es sich um eine
            flächenhafte Beregnung des gesamten Stadtgebietes. Die verwendeten{" "}
            <strong>Modellregen</strong> werden durch die Dauer (in Stunden,
            abgekürzt "h"), die in dieser Zeit fallende Regenmenge (in Liter pro
            Quadratmeter, abgekürzt "l/m²") und den zeitlichen Verlauf der
            Regenintensität definiert. Für die zeitliche Entwicklung der
            Intensität wurden zwei unterschiedliche Verläufe genutzt. Für den
            Starkregen SRI 7 wurde ein sogenannter{" "}
            <strong>Eulerregen Typ II</strong> genutzt. Dabei werden in 5
            Minuten-Abschnitten unterschiedliche Intensitäten angenommen, die
            bis zur maximalen Intensität schnell ansteigen, dann stark abfallen
            und danach allmählich abklingen. Für den Starkregen SRI 10 wurde ein
            sogenannter <strong>Blockregen</strong> genutzt. Der
            Intensitätsverlauf ist beim Blockregen über die gesamte Dauer des
            Ereignisses konstant.
          </p>

          <p>
            Zur Einteilung der Starkregen dient der ortsbezogene{" "}
            <strong>Starkregenindex (SRI)</strong> nach Schmitt, der
            Niederschläge in eine Skala von 1 bis 12 einteilt, vergleichbar mit
            der Klassifizierung von Erdbeben nach Mercalli. Der Starkregenindex
            wird durch eine statistische Auswertung von sehr langen vorliegenden
            Regenmessungen an die örtlichen Gegebenheiten angepasst.Starkregen
            mit SRI 6 bis 7 (<strong>außergewöhnliche Starkregen</strong>) haben
            statistische Wiederkehrzeiten von 50 bis 100 Jahren. Für noch
            stärkere <strong>extreme Starkregen</strong> lässt sich aus der
            Statistik kein verlässliches Wiederkehrintervall mehr ableiten
            (seltener als einmal in 100 Jahren). Der Niederschlag, der in
            Münster 2014 mit insgesamt 292 mm gemessen wurde und starke Schäden
            verursachte, gehört z. B. zu der Stufe SRI 12.
          </p>

          <p>
            Mit diesen Erläuterungen lassen sich die zwei simulierten Szenarien
            wie folgt zusammenfassen:
          </p>

          <ul>
            <li>
              <strong>Stärke 7</strong>: außergewöhnliches Starkregenereignis,
              Dauer 60 min, Niederschlagssumme 57,00 l/m², Eulerregen Typ II,
              SRI 7, 100-jährliche Wiederkehrzeit nach KOSTRA-2010
            </li>

            <li>
              <strong>Stärke 10</strong>: extremes Starkregenereignis, Dauer 60
              min, Niederschlagssumme 90 l/m², Blockregen, SRI 10,
              Wiederkehrzeit deutlich größer als 100 Jahre
            </li>
          </ul>
        </div>
      }
    />
  );
};
export default Component;
