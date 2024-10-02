import React, { useContext } from "react";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import GenericModalMenuSection from "react-cismap/topicmaps/menu/Section";
import LicenseLBK from "react-cismap/topicmaps/wuppertal/LicenseLuftbildkarte";
import LicenseStadtplanTagNacht from "react-cismap/topicmaps/wuppertal/LicenseStadtplanTagNacht";

/* eslint-disable jsx-a11y/anchor-is-valid */

const Component = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);

  return (
    <GenericModalMenuSection
      sectionKey="datengrundlage"
      sectionTitle="Datengrundlagen"
      sectionBsStyle="warning"
      sectionContent={
        <div>
          <img
            alt="aislogo"
            src="/images/Signet_AIS_RZ.png"
            style={{ width: 300, margin: 20 }}
            align="right"
          />
          <p>
            Die Starkregengefahrenkarte im AIS Starkregenvorsorge Meschede
            stellt in zwei umschaltbaren Kartenansichten maximale Wassertiefen
            bzw. maximale Fließgeschwindigkeiten im gesamten Stadtgebiet dar,
            die im Verlauf von zwei simulierten Starkregenereignissen berechnet
            wurden. Dazu wurde ein Raster der Geländeoberfläche mit einer
            Auflösung von 1x1 m genutzt. Die maximalen Wassertiefen und
            maximalen Fließgeschwindigkeiten werden jeweils mit einem
            Farbverlauf visualisiert. Der Farbverlauf für die maximalen{" "}
            <strong>Wassertiefen</strong> nutzt die Eckwerte 20 cm (hellblau),
            40 cm (blau), 75 cm (dunkelblau) und {">"} 100 cm (violett).
            Wassertiefen unter 5 cm werden nicht mehr farbig ausgeprägt
            (transparente Darstellung). Zur Visualisierung der maximalen{" "}
            <strong>Fließgeschwindigkeiten</strong>, angegeben in Meter pro
            Sekunde (m/s), werden die Eckwerte 0,5 m/s (gelb), 2,0 m/s (orange),
            4,0 m/s (hellrot) und 6,0 m/s (dunkelrot) verwendet. Der untere
            Grenzwert für die farbige Anzeige einer Fließgeschwindigkeit liegt
            bei 0,2 m/s.
          </p>

          <p>
            Die Simulationsberechnungen wurden im Auftrag der Kreis- und
            Hochschulstadt Meschede durch das Ingenieurbüro Dr. Pecher AG
            (Gelsenkirchen/Erkrath) durchgeführt. Die Bemessungsgrenze des
            Kanalnetzes wird bei den hier simulierten Ereignissen überschritten.
            Der größe Anteil des Niederschlagwassers fließt oberirdisch ab,
            wobei im urbanen Raum sowohl die Leistungsfähigkeit des Kanalnetzes,
            als auch der Überstau des Kanalnetzes einen Einfluss auf die
            Überflutungssituation haben kann. Das Abflussverhalten des
            Kanalnetzes wurde durch eine kombinierte Betrachtung berücksichtigt.
            Je nach Flächennutzung liegen verschiedene Oberflächeneigenschaften
            vor. Diese werden im Modell über unterschiedliche Geländerauheiten
            und zeitlich variable Versickerungsansätze abgebildet. Relevante
            Retentionsräume sowie Gewässerverrohrungen und Durchlässe wurden
            aufgrund ihrer Bedeutung für die Ableitungs- und Speicherwirkung von
            Oberflächenwasser als Elemente in das Modell aufgenommen. Je nach
            Regen und Randbedingungen in der Realität können in Teilgebieten die
            Wassertiefen auf dem Gelände höher oder geringer ausfallen. Um diese
            Variationen zu verstehen und besser einschätzen zu können, sind die
            zwei unterschiedlichen Szenarien dargestellt.
          </p>

          <p>
            Große Seen und Gewässerflächen (z. B. Hennesee) und größere
            Fließgewässer (z. B. Ruhr) haben eine geringe Relevanz für die
            Betrachtung lokaler Starkregen. Daher werden keine Ergebnisse für
            diese Bereiche erzeugt. Im Bereich der Hochwassergefahrengewässer
            (u.a. Ruhr, Wenne, Henne) sind die Hochwassergefahrenkarten zu
            berücksichtigen.
          </p>
          <p>
            Die Simulationen basieren auf einem Digitalen Geländemodell (DGM1)
            des hydrologischen Einzugsgebiets der Kreis- und Hochschulstadt
            Meschede. Als Grundlage hierfür dienen flächenhafte Höhenmessungen,
            die das Land NRW turnusmäßig mit einem Laserscanner aus einem
            Flugzeug heraus durchführt (Aufnahme durch Laseraltimetrie in den
            Jahren 2016 und 2017). Das DGM1 wurde um die Gebäude aus dem
            Liegenschaftskataster der Kreis- und Hochschulstadt Meschede
            (04/2022) und wichtige verrohrte Gewässerabschnitte sowie
            Geländedurchlässe ergänzt, um eine hydrologisch korrekte
            Abflussberechnung zu gewährleisten. Sehr neue Gebäude, die nach dem
            Modellaufbau fertiggestellt wurden (z. B. Neubaugebiete) sind daher
            noch nicht im Datenbestand erfasst. Hier lassen sich aus dem
            angrenzenden Gelände dennoch wichtige Hinweise zur möglichen
            Überflutung ableiten (s. auch Schaltfläche: Fehler im Geländemodell
            melden).
          </p>

          <p>
            Darüber hinaus ist das Ergebnis der Simulation von der Dauer und
            Intensität des Regens abhängig, der für die Simulation angenommen
            wird. Wir bieten Ihnen hierzu zwei unterschiedliche{" "}
            <a
              className="renderAsLink"
              onClick={() => setAppMenuActiveMenuSection("szenarien")}
            >
              simulierte Szenarien
            </a>{" "}
            an, einen Starkregen (SRI 7) als "Modellregen" sowie einen extremen
            Starkregen (SRI 10) als "Modellregen".{" "}
          </p>

          <p>
            Zur Betrachtung der Ergebnisse stellen wir Ihnen drei verschiedene
            Hintergrundkarten bereit, die auf den folgenden Geodatendiensten und
            Geodaten basieren:
          </p>
          <ul>
            <li>
              <strong>Stadtplan (grau)</strong>: Kartendienst (vektorbasiert)
              der cismet GmbH. Datengrundlage: <strong>cismet light</strong>.
              Wöchentlich in einem automatischen Prozess aktualisierte
              Bereitstellung der OpenStreetMap als Vektorlayers mit der
              OpenMapTiles-Server-Technologie. Lizenzen der Ausgangsprodukte:{" "}
              <a
                target="_legal"
                href="https://github.com/openmaptiles/openmaptiles/blob/master/LICENSE.md"
              >
                Openmaptiles
              </a>{" "}
              und{" "}
              <a
                target="_legal"
                href="https://www.opendatacommons.org/licenses/odbl/1.0/"
              >
                ODbL
              </a>{" "}
              (OpenStreetMap contributors).
            </li>
            <li>
              <strong>Luftbildkarte</strong>: (1) Kartendienst (WMS) des Landes
              NRW. Datengrundlage:{" "}
              <strong>Digitale Orthophotos (DOP) des Landes NRW</strong>{" "}
              WMS-Dienst für farbige, digitale, georeferenzierte, lagegenaue,
              entzerrte Luftbilder des Landes NRW. (
              <a
                target="_legal"
                href="https://www.bezreg-koeln.nrw.de/brk_internet/geobasis/luftbildinformationen/aktuell/digitale_orthophotos/index.html"
              >
                weiter Informationen
              </a>
              ). (2) Kartendienste (WMS) des Regionalverbandes Ruhr (RVR).
              Datengrundlagen: <strong>Stadtkarte 2.0</strong> und{" "}
              <strong>Kartenschrift aus der Stadtkarte 2.0</strong>. (Details s.
              Hintergrundkarte Stadtplan).
            </li>
            <li>
              <strong>DTK (bunt)</strong>: DTK Sammeldienst des Landes NRW.
              Datengrundlage: <strong>DTK (bunt)</strong> Dieser Dienst enthält
              alle topographischen Kartenwerke des Landes Nordrhein-Westfalen
              sowie in den kleineren Maßstäben topographische Kartenwerke des
              Bundes. Angefangen von einer Übersichtskarte für NRW über die
              DTK500 bis zur DTK250 des Bundesamtes für Kartographie und
              Geodäsie und den topographischen Karten DTK100, DTK50, DTK25,
              DTK10 NRW von Geobasis NRW, bis hin zur ABK und ALKIS der Kommunen
              sind alle Standardkartenwerke in einem Layer vereint. Durch die
              voreingestellten Maßstabsbereiche wird gewährleistet, dass in
              jedem Maßstab die ideale Karte präsentiert wird.
              Nutzungsbedingungen: siehe{" "}
              <a
                target="_legal"
                href="http://www.bezreg-koeln.nrw.de/brk_internet/geobasis/lizenzbedingungen_geobasis_nrw.pdf"
              >
                Nutzungsbedingungen Geobasis NRW
              </a>
              , Für die DTK 250, DTK 500 gelten die Nutzungsbedingungen des BKG:
              ©{" "}
              <a target="_legal" href="www.govdata.de/dl-de/by-2-0">
                GeoBasis-DE / BKG(2020) dl-de/by-2-0
              </a>
            </li>
          </ul>
          <p>
            Das Auskunfts- und Informationssystem (AIS) Starkregenvorsorge ist
            im Rahmen des DBU-Projektes KLAS in Bremen entwickelt und seitdem
            ergänzt worden.
          </p>
        </div>
      }
    />
  );
};
export default Component;
