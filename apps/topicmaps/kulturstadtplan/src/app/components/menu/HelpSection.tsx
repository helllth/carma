import Section from 'react-cismap/topicmaps/menu/Section';
import ConfigurableDocBlocks from 'react-cismap/topicmaps/ConfigurableDocBlocks';
import GenericHelpTextForMyLocation from 'react-cismap/topicmaps/docBlocks/GenericHelpTextForMyLocation';
import Datengrundlage from './help/Datengrundlage';
import Kartendarstellung from './help/Kartendarstellung';
import POI from './help/POI';
import KartePositionieren from './help/KartePositionieren';
import Kulturstadtplan from './help/Kulturstadtplan';
import Einstellungen from './help/Einstellungen';

const HelpSection = () => {
  return (
    <Section
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
                  bsStyle: 'warning',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <Datengrundlage />,
                  },
                },
                {
                  title: 'Kartendarstellung der POI',
                  bsStyle: 'warning',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <Kartendarstellung />,
                  },
                },
                {
                  title: 'POI auswählen und abfragen',
                  bsStyle: 'default',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <POI />,
                  },
                },
                {
                  title: 'In Karte positionieren',
                  bsStyle: 'default',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <KartePositionieren />,
                  },
                },
                {
                  title: 'Mein Standort',
                  bsStyle: 'default',
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
                  title: 'Mein Kulturstadtplan',
                  bsStyle: 'primary',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <Kulturstadtplan />,
                  },
                },
                {
                  title: 'Einstellungen',
                  bsStyle: 'success',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <Einstellungen />,
                  },
                },
                {
                  title: 'Personalisierung',
                  bsStyle: 'success',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: (
                      <p>
                        Ihre Filterauswahl und Einstellungen bleiben auch nach
                        einem Neustart der Anwendung erhalten. (Es sei denn, Sie
                        löschen den Browser-Verlauf einschließlich der
                        gehosteten App-Daten.) Damit können Sie unseren
                        Kulturstadtplan mit wenigen Klicks dauerhaft für sich
                        optimieren.
                      </p>
                    ),
                  },
                },
              ],
            },
          ]}
        />
      }
    />
  );
};

export default HelpSection;
