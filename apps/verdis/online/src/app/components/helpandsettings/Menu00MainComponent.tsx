import ModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import Section from 'react-cismap/topicmaps/menu/Section';
import ConfigurableDocBlocks from 'react-cismap/topicmaps/ConfigurableDocBlocks';
import Introduction from './Menu05Introduction';
import { getUiState, showSettings } from '../../../store/slices/ui';
import { useDispatch, useSelector } from 'react-redux';
import Menu10Datengrundlagen from './Menu10Datengrundlagen';
import Menu20MeinKassenzeichen from './Menu20MeinKassenzeichen';
import Menu40Anleitung from './Menu40Anleitung';
import Menu41Mailservice from './Menu41Mailservice';
import Menu42Aenderungen from './Menu42Aenderungen';
import Menu60Datenschutz from './Menu60Datenschutz';
import Menu50FAQ from './Menu50FAQ';
import Menu30Kartenhintergruende from './Menu30Kartenhintergruende';

const ModalHelpAndInfo = () => {
  const uiState = useSelector(getUiState);
  const dispatch = useDispatch();
  return (
    <ModalApplicationMenu
      menuIcon={'info'}
      menuTitle={'Kompaktanleitung und Hintergrundinformationen'}
      // menuFooter={<MenuFooter />}
      menuIntroduction={<Introduction />}
      visible={uiState.settingsVisible}
      setVisible={(value) => dispatch(showSettings({ visible: value }))}
      menuSections={[
        <Section
          key="datengrundlage"
          sectionKey="datengrundlage"
          sectionTitle="Grundlagen der Datenerhebung"
          sectionBsStyle="warning"
          sectionContent={<Menu10Datengrundlagen />}
        />,
        <Section
          key="meinKassenzeichen"
          sectionKey="meinKassenzeichen"
          sectionTitle="Mein Kassenzeichen"
          sectionBsStyle="warning"
          sectionContent={<Menu20MeinKassenzeichen />}
        />,
        <Section
          key="kartenhintergruende"
          sectionKey="kartenhintergruende"
          sectionTitle="Hintergrundkarten"
          sectionBsStyle="info"
          sectionContent={<Menu30Kartenhintergruende />}
        />,
        <Section
          key="anleitung"
          sectionKey="anleitung"
          sectionTitle="Kurzanleitung"
          sectionBsStyle="success"
          sectionContent={<Menu40Anleitung />}
        />,
        <Section
          key="mailservice"
          sectionKey="mailservice"
          sectionTitle="Mailservice"
          sectionBsStyle="info"
          sectionContent={<Menu41Mailservice />}
        />,
        <Section
          key="aenderungen"
          sectionKey="aenderungen"
          sectionTitle="Änderungen vornehmen und übermitteln"
          sectionBsStyle="success"
          sectionContent={<Menu42Aenderungen />}
        />,
        <Section
          key="faq"
          sectionKey="faq"
          sectionTitle="Häufig gestellte Fragen"
          sectionBsStyle="success"
          sectionContent={<Menu50FAQ />}
        />,
        <Section
          key="datenschutz"
          sectionKey="datenschutz"
          sectionTitle="Datenschutz"
          sectionBsStyle="danger"
          sectionContent={<Menu60Datenschutz />}
        />,
      ]}
    />
  );
};

export default ModalHelpAndInfo;
