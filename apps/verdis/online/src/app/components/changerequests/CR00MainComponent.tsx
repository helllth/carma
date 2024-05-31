import { useDispatch, useSelector } from 'react-redux';
import { getUiState, showChangeRequests } from '../../../store/slices/ui';
import ModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import Section from 'react-cismap/topicmaps/menu/Section';
import Introduction from './CR05Introduction';

const CR00MainComponent = () => {
  const uiState = useSelector(getUiState);
  const dispatch = useDispatch();
  return (
    <ModalApplicationMenu
      menuIcon={'edit'}
      menuTitle={'Änderungswünsche und Kommentare'}
      // menuFooter={<MenuFooter />}
      menuIntroduction={<Introduction />}
      visible={uiState.changeRequestsMenuVisible}
      setVisible={(value) => dispatch(showChangeRequests({ visible: value }))}
      menuSections={[
        <Section
          key="sectionKey0"
          sectionKey="sectionKey0"
          sectionTitle="Ihre Kommunikation"
          sectionBsStyle="info"
          sectionContent={<></>}
        />,
      ]}
    />
  );
};

export default CR00MainComponent;
