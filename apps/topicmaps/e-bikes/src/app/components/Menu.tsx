import { useContext } from 'react';
import Icon from 'react-cismap/commons/Icon';
import CustomizationContextProvider from 'react-cismap/contexts/CustomizationContextProvider';
import { FeatureCollectionContext } from 'react-cismap/contexts/FeatureCollectionContextProvider';
import ConfigurableDocBlocks from 'react-cismap/topicmaps/ConfigurableDocBlocks';
import GenericHelpTextForMyLocation from 'react-cismap/topicmaps/docBlocks/GenericHelpTextForMyLocation';
import ModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import Section from 'react-cismap/topicmaps/menu/Section';
import LicenseLuftbildkarte from 'react-cismap/topicmaps/wuppertal/LicenseLuftbildkarte';
import LicenseStadtplanTagNacht from 'react-cismap/topicmaps/wuppertal/LicenseStadtplanTagNacht';
import DefaultSettingsPanel from 'react-cismap/topicmaps/menu/DefaultSettingsPanel';

// import FilterUI from './FilterUI';
// import MenuFooter from './MenuFooter';
import Introduction from './Menu/Introduction';
import HelpSection from './Menu/HelpSection';

const Menu = () => {
  const { filteredItems, shownFeatures, filterState, itemsDictionary } =
    useContext(FeatureCollectionContext);

  const getFilterHeader = () => {
    const count = filteredItems?.length || 0;

    let term;
    if (count === 1) {
      term = 'Angebot';
    } else {
      term = 'Angebote';
    }

    return `Filtern (${count} ${term} gefunden, davon ${
      shownFeatures?.length || '0'
    } in der Karte)`;
  };

  return (
    <CustomizationContextProvider customizations={{}}>
      <ModalApplicationMenu
        menuIcon={'bars'}
        menuTitle={'Filter, Merkliste und Kompaktanleitung'}
        // menuFooter={<MenuFooter />}
        menuIntroduction={<Introduction />}
        menuSections={[
          <Section
            key="filter"
            sectionKey="filter"
            sectionTitle={getFilterHeader()}
            sectionBsStyle="primary"
            sectionContent={<></>}
          />,
          <DefaultSettingsPanel key="settings" />,
          <HelpSection />,
        ]}
      />
    </CustomizationContextProvider>
  );
};

export default Menu;
