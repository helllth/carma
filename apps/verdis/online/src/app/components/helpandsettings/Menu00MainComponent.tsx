import ModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import Section from 'react-cismap/topicmaps/menu/Section';
import Introduction from './Menu05Introduction';
import { getUiState, showSettings } from '../../../store/slices/ui';
import { useDispatch, useSelector } from 'react-redux';
import Menu10Datengrundlagen from './Menu10Datengrundlagen';
import Menu20MeinKassenzeichen from './Menu20MeinKassenzeichen';

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
      ]}
    />
  );
};

export default ModalHelpAndInfo;
