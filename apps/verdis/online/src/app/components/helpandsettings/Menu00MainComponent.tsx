import ModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import Introduction from './Menu05Introduction';
import { getUiState, showSettings } from '../../../store/slices/ui';
import { useDispatch, useSelector } from 'react-redux';

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
      menuSections={
        [
          //   <Section
          //     key="filter"
          //     sectionKey="filter"
          //     sectionTitle={getFilterHeader()}
          //     sectionBsStyle="primary"
          //     sectionContent={<FilterUI />}
          //   />,
        ]
      }
    />
  );
};

export default ModalHelpAndInfo;
