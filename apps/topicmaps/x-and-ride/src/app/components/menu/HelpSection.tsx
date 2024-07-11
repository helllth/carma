import Section from 'react-cismap/topicmaps/menu/Section';
import ConfigurableDocBlocks from 'react-cismap/topicmaps/ConfigurableDocBlocks';
import Datengrundlage from './help/Datengrundlage';
import Kartendarstellung from './help/Kartendarstellung';
import KartePositionieren from './help/KartePositionieren';
import Einstellungen from './help/Einstellungen';
import Anlagen from './help/Anlagen';
import Standort from './help/Standort';
import Filtern from './help/Filtern';

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
                  bsStyle: 'secondary',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <Datengrundlage />,
                  },
                },
                {
                  title: 'Kartendarstellung',
                  bsStyle: 'success',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <Kartendarstellung />,
                  },
                },
                {
                  title: 'Anlagen auswählen und abfragen',
                  bsStyle: 'success',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <Anlagen />,
                  },
                },
                {
                  title: 'In Karte positionieren',
                  bsStyle: 'warning',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <KartePositionieren />,
                  },
                },
                {
                  title: 'Mein Standort',
                  bsStyle: 'warning',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: (
                      <div>
                        <Standort />
                      </div>
                    ),
                  },
                },
                {
                  title: 'Filtern',
                  bsStyle: 'primary',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <Filtern />,
                  },
                },
                {
                  title: 'Einstellungen',
                  bsStyle: 'primary',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: <Einstellungen />,
                  },
                },
                {
                  title: 'Personalisierung',
                  bsStyle: 'primary',
                  contentBlockConf: {
                    type: 'REACTCOMP',
                    content: (
                      <p>
                        Ihre Einstellungen bleiben auch nach einem Neustart der
                        Anwendung erhalten. (Es sei denn, Sie löschen den
                        Browser-Verlauf einschließlich der gehosteten
                        App-Daten.)
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
