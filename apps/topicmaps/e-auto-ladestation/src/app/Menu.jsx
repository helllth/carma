import React, { useContext, useMemo } from 'react';
import Icon from 'react-cismap/commons/Icon';
import CustomizationContextProvider from 'react-cismap/contexts/CustomizationContextProvider';
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from 'react-cismap/contexts/FeatureCollectionContextProvider';
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';
import ConfigurableDocBlocks from 'react-cismap/topicmaps/ConfigurableDocBlocks';
import GenericHelpTextForMyLocation from 'react-cismap/topicmaps/docBlocks/GenericHelpTextForMyLocation';
import ModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import Section from 'react-cismap/topicmaps/menu/Section';
import LicenseLuftbildkarte from 'react-cismap/topicmaps/wuppertal/LicenseLuftbildkarte';
import LicenseStadtplanTagNacht from 'react-cismap/topicmaps/wuppertal/LicenseStadtplanTagNacht';
import DefaultSettingsPanel from 'react-cismap/topicmaps/menu/DefaultSettingsPanel';
import { Link } from 'react-scroll';

import FilterUI from './FilterUI';
import MenuFooter from './MenuFooter';
import { TopicMapDispatchContext } from 'react-cismap/contexts/TopicMapContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getSymbolSVG } from './helper/helper';

const Menu = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);
  const { filteredItems, shownFeatures, filterState, itemsDictionary } =
    useContext(FeatureCollectionContext);
  const { setFilterState } = useContext(FeatureCollectionDispatchContext);
  const { zoomToFeature } = useContext(TopicMapDispatchContext);

  const onlineSVG = getSymbolSVG(24, '#003B80', 'pr', 'onlineSVGinHELP');
  const offlineSVG = getSymbolSVG(24, '#888A87', 'pr', 'offlineSVGinHELP');

  const getFilterHeader = () => {
    const count = filteredItems?.length || 0;

    let term;
    if (count === 1) {
      term = 'Ladestation';
    } else {
      term = 'Ladestationen';
    }

    return `Filter (${count} ${term} gefunden, davon ${
      shownFeatures?.length || '0'
    } in der Karte)`;
  };

  const steckertypes = useMemo(
    () => itemsDictionary?.steckerverbindungen || [],
    [itemsDictionary]
  );

  return (
    <CustomizationContextProvider customizations={{}}>
      <ModalApplicationMenu
        menuIcon={'bars'}
        menuTitle={'Filter, Einstellungen und Kompaktanleitung'}
        menuFooter={<MenuFooter />}
        menuIntroduction={
          <span>
            Benutzen Sie die Auswahlmöglichkeiten unter{' '}
            <Link
              className="useAClassNameToRenderProperLink"
              to="filter"
              containerId="myMenu"
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection('filter')}
            >
              Filter
            </Link>{' '}
            um die in der Karte angezeigten Ladestationen für E-Autos auf die
            für Sie relevanten Stationen zu beschränken. Über{' '}
            <Link
              className="useAClassNameToRenderProperLink"
              to="settings"
              containerId="myMenu"
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection('settings')}
            >
              Einstellungen
            </Link>{' '}
            können Sie die Darstellung der Hintergrundkarte und der
            Ladestationen an Ihre Vorlieben anpassen. Wählen Sie{' '}
            <Link
              className="useAClassNameToRenderProperLink"
              to="help"
              containerId="myMenu"
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection('help')}
            >
              Kompaktanleitung
            </Link>{' '}
            für detailliertere Bedienungsinformationen.
          </span>
        }
        menuSections={[
          <Section
            key="filter"
            sectionKey="filter"
            sectionTitle={getFilterHeader()}
            sectionBsStyle="primary"
            sectionContent={
              <FilterUI
                filter={filterState}
                setFilter={setFilterState}
                steckertypes={steckertypes}
              />
            }
          />,
          <DefaultSettingsPanel key="settings" />,
          <Section
            key="help"
            sectionKey="help"
            sectionTitle="Kompaktanleitung"
            sectionBsStyle="default"
            sectionContent={
              <ConfigurableDocBlocks
                configs={[
                  {
                    type: 'FAQS',
                    configs: [
                      {
                        title: 'Datengrundlage',
                        bsStyle: 'default',
                        contentBlockConf: {
                          type: 'REACTCOMP',
                          content: (
                            <div>
                              <p>
                                Die{' '}
                                <strong>
                                  E-Auto-Ladestationskarte Wuppertal
                                </strong>{' '}
                                bietet ihnen die folgenden Hintergrundkarten an,
                                die auf verschiedenen Geodatendiensten und
                                Geodaten basieren:
                              </p>

                              <ul>
                                <LicenseStadtplanTagNacht />
                                <LicenseLuftbildkarte />
                              </ul>

                              <p>
                                Zusätzlich nutzt die E-Auto-Ladestationskarte
                                den Datensatz{' '}
                                <a
                                  target="_legal"
                                  href="https://offenedaten-wuppertal.de/dataset/ladestationen-e-autos-wuppertal"
                                >
                                  Ladestationen E-Autos Wuppertal
                                </a>{' '}
                                aus dem Open-Data-Angebot der Stadt Wuppertal.
                              </p>
                            </div>
                          ),
                        },
                      },
                      {
                        title: 'Kartendarstellung',
                        bsStyle: 'success',
                        contentBlockConf: {
                          type: 'REACTCOMP',
                          content: (
                            <p>
                              Zur Darstellung der Ladestationen in der Karte
                              verwenden wir zwei unterschiedliche Symbole für
                              die Ladestationen, die derzeit in Betrieb
                              ("online") {onlineSVG} sind, und diejenigen, die
                              wegen länger dauernder Maßnahmen nicht in Betrieb
                              ("offline") {offlineSVG} sind. Die Farben der
                              Symbole werden in der Titelzeile der Info-Box
                              unten rechts aufgegriffen. Zusätzlich wird dort
                              der Betriebszustand der Ladestation - Ladestation
                              für E-Autos (online) bzw. Ladestation für E-Autos
                              (offline) - wiederholt. Räumlich nah beieinander
                              liegende Anlagen werden standardmäßig
                              maßstabsabhängig zu größeren Kreis-Symbolen
                              zusammengefasst, jeweils mit der Anzahl der
                              repräsentierten Anlagen im Zentrum{' '}
                              <img
                                alt="Cluster"
                                width="32"
                                src="images/emob_cluster.png"
                              />
                              . Vergrößern Sie ein paar Mal durch direktes
                              Anklicken eines solchen Punktes oder mit{' '}
                              <FontAwesomeIcon icon={faPlus} /> die Darstellung,
                              so werden die zusammengefassten Anlagen Schritt
                              für Schritt in die kleineren Symbole für die
                              Einzel-Anlagen zerlegt.
                            </p>
                          ),
                        },
                      },
                      {
                        title: 'Ladestationen abfragen',
                        bsStyle: 'success',
                        contentBlockConf: {
                          type: 'REACTCOMP',
                          content: (
                            <div>
                              {' '}
                              <p>
                                Bewegen Sie den Mauszeiger im Kartenfenster auf
                                eines der Symbole für die Ladestationen (online
                                oder offline), um sich den Namen der Station
                                anzeigen zu lassen. Ein Klick auf das Symbol
                                setzt den Fokus auf diese Ladestation. Sie wird
                                dann blau hinterlegt und die zugehörigen
                                Informationen (Name, ggf. Lagebeschreibung,
                                Adresse) werden in der Info-Box angezeigt. (Auf
                                einem Tablet-PC wird der Fokus durch das erste
                                Antippen des Symbols gesetzt, das zweite
                                Antippen blendet den Namen ein.) Durch Anklicken
                                des Symbols <Icon name="info" /> rechts neben
                                dem Namen der Ladestation öffnen Sie das
                                Datenblatt mit den vollständigen Informationen
                                zu dieser Station einschließlich einer
                                Verknüpfung zur Ladekosten-Information des
                                Betreibers. Mit dem Lupensymbol{' '}
                                <Icon name="search" /> links daneben wird die
                                Karte auf die Ladestation, die gerade den Fokus
                                hat, zentriert und gleichzeitig ein großer
                                Betrachtungsmaßstab (Zoomstufe 14) eingestellt.
                                Mit den Symbolen <Icon name="phone" /> und{' '}
                                <Icon name="external-link-square" /> rechts
                                daneben können Sie den Betreiber via Smartphone
                                direkt anrufen oder zu seiner Website wechseln.
                              </p>
                              <p>
                                Wenn Sie noch keine Ladestation im aktuellen
                                Kartenausschnitt selektiert haben, wird der
                                Fokus automatisch auf die nördlichste Station
                                gesetzt. Mit den Funktionen{' '}
                                <a className="useAClassNameToRenderProperLink">
                                  &lt;&lt;
                                </a>{' '}
                                vorheriger Treffer und{' '}
                                <a className="useAClassNameToRenderProperLink">
                                  &gt;&gt;
                                </a>{' '}
                                nächster Treffer können Sie ausgehend von der
                                Ladestation, auf der gerade der Fokus liegt, in
                                nördlicher bzw. südlicher Richtung alle aktuell
                                im Kartenfenster angezeigten Stationen
                                durchmustern.
                              </p>
                              <p>
                                Mit der Schaltfläche{' '}
                                <Icon name="chevron-circle-down" /> im
                                dunkelgrau abgesetzten rechten Rand der Info-Box
                                lässt sich diese so verkleinern, dass nur noch
                                der Betriebszustand der Ladestation (Ladestation
                                online oder offline), ihr Name und die Symbole{' '}
                                <Icon name="search-location" />,{' '}
                                <Icon name="info" />, <Icon name="phone" /> und{' '}
                                <Icon name="external-link-square" /> angezeigt
                                werden - nützlich für Endgeräte mit kleinem
                                Display. Mit der Schaltfläche{' '}
                                <Icon name="chevron-circle-up" /> an derselben
                                Stelle können Sie die Info-Box wieder
                                vollständig einblenden.
                              </p>
                              <p>
                                Ein kleines Foto über der Info-Box vermittelt
                                Ihnen bei den meisten Ladestationen einen
                                Eindruck vom Aussehen der Station vor Ort.
                                Klicken Sie auf dieses Vorschaubild, um einen
                                Bildbetrachter ("Leuchtkasten") mit dem Foto zu
                                öffnen.
                              </p>
                            </div>
                          ),
                        },
                      },
                      {
                        title: 'In Karte positionieren',
                        bsStyle: 'warning',
                        contentBlockConf: {
                          type: 'REACTCOMP',
                          content: (
                            <div>
                              {' '}
                              <p>
                                Um direkt zu einer Ladestation zu gelangen,
                                geben Sie den Anfang des Namens dieser
                                Ladestation im Eingabefeld links unten ein
                                (mindestens 2 Zeichen). In der inkrementellen
                                Auswahlliste werden Ihnen passende Treffer
                                angeboten. (Wenn Sie weitere Zeichen eingeben,
                                wird der Inhalt der Auswahlliste angepasst.) Sie
                                können auch andere Suchbegriffe eingeben,
                                nämlich Stadtteil (Stadtbezirk oder Quartier),
                                Adresse, Straßenname oder POI. Durch das in der
                                Auswahlliste vorangestellte Symbol erkennen Sie,
                                ob es sich bei einem Treffer um eine{' '}
                                <Icon name="charging-station" /> Ladestation,
                                einen <Icon name="circle" /> Stadtbezirk, ein{' '}
                                <Icon name="pie-chart" /> Quartier, eine{' '}
                                <Icon name="home" /> Adresse, eine{' '}
                                <Icon name="road" /> Straße ohne zugeordnete
                                Hausnummern, einen <Icon name="tag" /> POI, die{' '}
                                <Icon name="tags" /> alternative Bezeichnung
                                eines POI, eine <Icon name="child" />{' '}
                                Kindertageseinrichtung oder eine{' '}
                                <Icon name="graduation-cap" /> Schule handelt.
                              </p>
                              <p>
                                Nach der Auswahl eines Treffers aus der Liste
                                wird die Karte auf die zugehörige Position
                                zentriert. Bei Suchbegriffen mit Punktgeometrie
                                (Ladestation, Adresse, Straße, POI) wird
                                außerdem ein großer Maßstab (Zoomstufe 14)
                                eingestellt und ein Marker{' '}
                                <Icon name="map-marker" /> auf der Zielposition
                                platziert. Bei Suchbegriffen mit
                                Flächengeometrie (Stadtbezirk, Quartier) wird
                                der Maßstab so eingestellt, dass die Fläche
                                vollständig dargestellt werden kann. Zusätzlich
                                wird der Bereich außerhalb dieser Fläche
                                abgedunkelt (Spotlight-Effekt).
                              </p>
                              <p>
                                Durch Anklicken des Werkzeugs{' '}
                                <Icon name="times" /> links neben dem
                                Eingabefeld können Sie die Suche zurücksetzen
                                (Entfernung von Marker bzw. Abdunklung, Löschen
                                des Textes im Eingabefeld).
                              </p>
                              <p>
                                Wenn Sie die Karte wie oben beschrieben auf eine
                                Ladestation positionieren, erhält diese sofort
                                den Fokus, sodass die zugehörigen Informationen
                                direkt in der Info-Box angezeigt werden.
                                Voraussetzung dafür ist, dass die aktuellen{' '}
                                <Link
                                  to="MeinThemenstadtplan"
                                  className="useAClassNameToRenderProperLink"
                                  containerId="myMenu"
                                >
                                  Filtereinstellungen
                                </Link>{' '}
                                die Darstellung der Ladestation in der Karte
                                erlauben.
                              </p>
                            </div>
                          ),
                        },
                      },
                      {
                        title: 'Mein Standort',
                        bsStyle: 'warning',
                        contentBlockConf: {
                          type: 'REACTCOMP',
                          content: (
                            <div>
                              <GenericHelpTextForMyLocation />
                            </div>
                          ),
                        },
                      },
                      {
                        title: 'Filtern',
                        bsStyle: 'info',
                        contentBlockConf: {
                          type: 'REACTCOMP',
                          content: (
                            <div>
                              {' '}
                              <p>
                                Im Bereich "<b>Filter</b>" können Sie im
                                Anwendungsmenü <Icon name="bars" /> die in der
                                Karte angezeigten Ladestationen so ausdünnen,
                                dass nur die für Sie interessanten Stationen
                                übrig bleiben. Standardmäßig sind die
                                Einstellungen hier so gesetzt, dass alle
                                Ladestationen angezeigt werden.
                              </p>
                              <p>
                                Mit den Optionsgruppen "
                                <b>
                                  <i>Verfügbarkeit</i>
                                </b>
                                ", "
                                <b>
                                  <i>Öffnungszeiten</i>
                                </b>
                                ", "
                                <b>
                                  <i>Ökostrom</i>
                                </b>
                                " und "
                                <b>
                                  <i>Schnelllader</i>
                                </b>
                                " können Sie die Kartenanzeige auf Ladestationen
                                beschränken, die aktuell verfügbar (online)
                                sind, die durchgehend (jeweils 24 Stunden an 7
                                Tagen die Woche) erreichbar sind, die ökologisch
                                erzeugten Strom bereitstellen oder bei denen es
                                sich um Schnell-Ladestationen handelt. Mit der
                                in jeder dieser Gruppen verfügbaren Option "
                                <i>alle Ladestationen</i>" wird das jeweilige
                                Filterkriterium nicht ausgewertet. In der
                                Optionsgruppe "
                                <b>
                                  <i>Steckertypen</i>
                                </b>
                                " können Sie die für ihre Ladekabel passenden
                                Steckertypen auswählen. Damit grenzen Sie die
                                Kartenanzeige auf diejenigen Stationen ein, die
                                mindestens eine entsprechende
                                Anschlussmöglichkeit besitzen. Alle
                                Filterkriterien werden mit einem logischen "und"
                                kombiniert: Wenn Sie z. B. unter "
                                <b>
                                  <i>Öffnungszeiten</i>
                                </b>
                                " den Wert "<i>24/7</i>" wählen und unter "
                                <b>
                                  <i>Ökostrom</i>
                                </b>
                                " den Wert "<i>nur Ökostrom-Ladestationen</i>",
                                werden alle Stationen angezeigt, die durchgehend
                                erreichbar sind <b>und</b> ökologisch erzeugten
                                Strom bereitstellen.
                              </p>
                              <p>
                                Ihre Einstellungen werden direkt in der blauen
                                Titelzeile des Bereichs "<b>Filter</b>" und in
                                dem Donut-Diagramm, das Sie rechts neben oder
                                unter den Filteroptionen finden, ausgewertet.
                                Die Titelzeile zeigt die Gesamtanzahl der
                                Ladestationen, die den von Ihnen gesetzten
                                Filterbedingungen entsprechen. Das
                                Donut-Diagramm zeigt zusätzlich die Verteilung
                                auf die beiden Kategorien verfügbare
                                Ladestationen (online) und nicht verfügbare
                                Ladestationen (offline). Bewegen Sie dazu den
                                Mauszeiger auf eines der farbigen Segmente des
                                Diagramms.
                              </p>
                            </div>
                          ),
                        },
                      },
                      {
                        title: 'Einstellungen',
                        bsStyle: 'info',
                        contentBlockConf: {
                          type: 'REACTCOMP',
                          content: (
                            <div>
                              <p>
                                Unter "<strong>Einstellungen</strong>" können
                                Sie im Anwendungsmenü <Icon name="bars" />{' '}
                                festlegen, wie die Ladestationen und die
                                Hintergrundkarte angezeigt werden sollen.
                              </p>
                              <p>
                                Zu den Ladestationen können Sie unter "
                                <b>
                                  <i>Ladestation-Einstellungen</i>
                                </b>
                                " auswählen, ob Ihre unter "<b>Filter</b>"
                                festgelegten Filterbedingungen in einer
                                Titelzeile ausgeprägt werden oder nicht. Weiter
                                können Sie dort festlegen, ob räumlich nah
                                beieinander liegende Ladestationen
                                maßstabsabhängig zu einem Punktsymbol
                                zusammengefasst werden oder nicht. Unter "
                                <b>
                                  <i>Symbolgröße</i>
                                </b>
                                " können Sie in Abhängigkeit von Ihrer
                                Bildschirmauflösung und Ihrem Sehvermögen
                                auswählen, ob die Ladestationen mit kleinen (35
                                Pixel), mittleren (45 Pixel) oder großen (55
                                Pixel) Symbolen angezeigt werden.
                              </p>
                              <p>
                                Unter "
                                <strong>
                                  <em>Hintergrundkarte</em>
                                </strong>
                                " können Sie auswählen, ob Sie die standardmäßig
                                aktivierte farbige Hintergrundkarte verwenden
                                möchten ("<em>Stadtplan (Tag)</em>") oder lieber
                                eine invertierte Graustufenkarte ("
                                <em>Stadtplan (Nacht)</em>"), zu der uns die von
                                vielen PKW-Navis bei Dunkelheit eingesetzte
                                Darstellungsweise inspiriert hat.{' '}
                                <strong>Hinweis</strong>: Der Stadtplan (Nacht)
                                wird Ihnen nur angeboten, wenn Ihr Browser
                                CSS3-Filtereffekte unterstützt, also z. B. nicht
                                beim Microsoft Internet Explorer. Die
                                Nacht-Karte erzeugt einen deutlicheren Kontrast
                                mit den farbigen Symbolen der Ladestationen, die
                                unterschiedlichen Flächennutzungen in der
                                Hintergrundkarte lassen sich aber nicht mehr so
                                gut unterscheiden wie in der Tag-Karte. Als
                                dritte Möglichkeit steht eine{' '}
                                <i>Luftbildkarte</i> zur Verfügung, die die
                                Anschaulichkeit des Luftbildes mit der
                                Eindeutigkeit des Stadtplans (Kartenschrift,
                                durchscheinende Linien) verbindet.
                              </p>

                              <p>
                                In der{' '}
                                <b>
                                  <i>Vorschau</i>
                                </b>{' '}
                                sehen Sie direkt die Wirkung ihrer Einstellungen
                                in einem fest eingestellten Kartenausschnitt.
                              </p>
                            </div>
                          ),
                        },
                      },
                      {
                        title: 'Personalisierung',
                        bsStyle: 'info',
                        contentBlockConf: {
                          type: 'REACTCOMP',
                          content: (
                            <p>
                              Ihre Einstellungen bleiben auch nach einem
                              Neustart der Anwendung erhalten. (Es sei denn, Sie
                              löschen den Browser-Verlauf einschließlich der
                              gehosteten App-Daten.)
                            </p>
                          ),
                        },
                      },
                    ],
                  },
                ]}
              />
            }
          />,
        ]}
      />
    </CustomizationContextProvider>
  );
};
export default Menu;
const NW = (props) => {
  return <span style={{ whiteSpace: 'nowrap' }}>{props.children}</span>;
};
