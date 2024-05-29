import React, { useContext } from 'react';
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';
import { getApplicationVersion } from './version';
import { scroller } from 'react-scroll';
import Attribution from '@carma/custom-wupp-components/help/Attribution';
const Footer = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);

  return (
    <div style={{ fontSize: '11px' }}>
      <b>Hintergrundkarten</b>: Stadtkarte 2.0 © RVR | True Orthophoto 2022 ©
      Stadt Wuppertal{' '}
      <a
        className="pleaseRenderAsLink"
        onClick={() => {
          setAppMenuActiveMenuSection('help');
          scroller.scrollTo('Datengrundlage', { containerId: 'myMenu' });
        }}
      >
        (Details und Nutzungsbedingungen)
      </a>
      <br />
      <Attribution
        applicationTitle={document.title}
        applicationVersion={getApplicationVersion()}
      />
    </div>
  );
};
export default Footer;
