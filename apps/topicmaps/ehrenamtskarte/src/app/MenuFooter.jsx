import React, { useContext } from 'react';
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';
import { getApplicationVersion } from './version';
import { version as reactCismapVersion } from 'react-cismap//meta';
import { Link, scroller } from 'react-scroll';

const Footer = () => {
  const { setAppMenuActiveMenuSection } = useContext<UIDispatchContext>(UIDispatchContext);

  return (
    <div style={{ fontSize: '11px' }}>
      <b>Hintergrundkarten</b>: Stadtkarte 2.0 © Regionalverband Ruhr (RVR) und
      Kooperationspartner{' '}
      <a href="https://www.govdata.de/dl-de/by-2-0">
        Datenlizenz Deutschland - Namensnennung - Version 2.0
      </a>
      , Lizenzen der Ausgangsprodukte:{' '}
      <a href="https://www.govdata.de/dl-de/zero-2-0">
        Datenlizenz Deutschland - Zero - Version 2.0
      </a>{' '}
      (Amtliche Geobasisdaten) und{' '}
      <a href="https://opendatacommons.org/licenses/odbl/1-0/">ODbL</a>{' '}
      (OpenStreetMap contributors). | True Orthophoto 2022 © Stadt Wuppertal (
      <a href="https://www.wuppertal.de/geoportal/Nutzungsbedingungen/NB-GDIKOM-C_Geodaten.pdf">
        NB-GDIKOM C
      </a>
      )
      <br />
      <div>
        <b>{document.title} (Version 1.22.3)</b>:{' '}
        <a href="https://cismet.de/" target="_cismet">
          cismet GmbH
        </a>{' '}
        auf Basis von{' '}
        <a href="http://leafletjs.com/" target="_more">
          Leaflet
        </a>{' '}
        und{' '}
        <a href="https://github.com/cismet/carma" target="_carma">
          carma
        </a>{' '}
        |{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cismet.de/datenschutzerklaerung.html"
        >
          Datenschutzerklärung (Privacy Policy)
        </a>
      </div>
    </div>
  );
};
export default Footer;
