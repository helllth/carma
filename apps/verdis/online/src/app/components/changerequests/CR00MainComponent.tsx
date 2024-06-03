import { useDispatch, useSelector } from 'react-redux';
import { getUiState, showChangeRequests } from '../../../store/slices/ui';
import ModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import Section from 'react-cismap/topicmaps/menu/Section';
import Introduction from './CR05Introduction';
import { getKassenzeichen } from '../../../store/slices/kassenzeichen';
import CRConversation from '../conversations/CRConversation';
import { useState } from 'react';
import ConversationInput from '../conversations/ConversationInput';
import CR20DocumentsPanel from './CR20DocumentsPanel';

const CR00MainComponent = ({ localErrorMessages = [] }) => {
  const uiState = useSelector(getUiState);
  const kassenzeichen = useSelector(getKassenzeichen);
  const dispatch = useDispatch();
  const [hideSystemMessages, setHideSystemMessages] = useState(false);

  const crMessages =
    (kassenzeichen.aenderungsanfrage || { nachrichten: [] }).nachrichten || [];
  const messages = [...(crMessages || []), ...(localErrorMessages || [])];

  const changerequests = kassenzeichen.aenderungsanfrage;
  const changerequestBezeichnungsArray =
    Object.keys((changerequests || { flaechen: [] }).flaechen || []) || [];

  const changerequestMessagesArray =
    (changerequests || { nachrichten: [] }).nachrichten || [];
  const sMsgs = changerequestMessagesArray;
  const documents: any = [];

  sMsgs.forEach((msg) => {
    //if a document exists, add it to the documents array
    if (msg.anhang !== undefined && msg.anhang.length > 0) {
      msg.anhang.forEach((anhang) => {
        documents.push(anhang);
      });
    }
  });

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
            <>
              <CRConversation
                messages={messages}
                hideSystemMessages={hideSystemMessages}
              />
              {/* <ConversationInput /> */}
            </>
          }
        />,
        <Section
          key="sectionKey1"
          sectionKey="sectionKey1"
          sectionTitle={
            'Ihre Änderungsvorschläge' +
            (changerequestBezeichnungsArray !== undefined &&
            changerequestBezeichnungsArray.length > 0
              ? ' (' + changerequestBezeichnungsArray.length + ')'
              : '')
          }
          sectionBsStyle="warning"
          sectionContent={<p>keine Änderungsvorschläge vorhanden</p>}
        />,
        <Section
          key="sectionKey1"
          sectionKey="sectionKey1"
          sectionTitle={
            'Ihre Dokumente' +
            (documents.length > 0 ? ' (' + documents.length + ')' : '')
          }
          sectionBsStyle="danger"
          sectionContent={<CR20DocumentsPanel documents={documents} />}
        />,
      ]}
    />
  );
};

export default CR00MainComponent;
