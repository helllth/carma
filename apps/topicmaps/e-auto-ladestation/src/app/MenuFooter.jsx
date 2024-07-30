import React, { useContext } from 'react';
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';
import CismetFooterAcks from 'react-cismap/topicmaps/wuppertal/CismetFooterAcknowledgements';

const Footer = () => {
  const { setAppMenuActiveMenuSection } = useContext<UIDispatchContext>(UIDispatchContext);

  return (
    <div style={{ fontSize: '11px' }}>
      <b>Hintergrundkarten</b>: Stadtkarte 2.0 © RVR | True Orthophoto 2022 ©
      Stadt Wuppertal{' '}
      <a
        className="useAClassNameToRenderProperLink"
        onClick={() => setAppMenuActiveMenuSection('help')}
      >
        (Details und Nutzungsbedingungen)
      </a>
      <br />
      <CismetFooterAcks />
    </div>
  );
};
export default Footer;
