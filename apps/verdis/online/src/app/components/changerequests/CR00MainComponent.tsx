import { useDispatch, useSelector } from 'react-redux';
import { getUiState, showChangeRequests } from '../../../store/slices/ui';
import ModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import Section from 'react-cismap/topicmaps/menu/Section';
import Introduction from './CR05Introduction';
import { getKassenzeichen } from '../../../store/slices/kassenzeichen';
import CRConversation from '../conversations/CRConversation';
import { useState } from 'react';

const CR00MainComponent = ({ localErrorMessages = [] }) => {
  const uiState = useSelector(getUiState);
  const kassenzeichen = useSelector(getKassenzeichen);
  const dispatch = useDispatch();
  const [hideSystemMessages, setHideSystemMessages] = useState(false);

  const crMessages =
    (kassenzeichen.aenderungsanfrage || { nachrichten: [] }).nachrichten || [];
  const messages = [...(crMessages || []), ...(localErrorMessages || [])];
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
          sectionContent={
            <CRConversation
              messages={messages}
              hideSystemMessages={hideSystemMessages}
            />
          }
        />,
      ]}
    />
  );
};

export default CR00MainComponent;
