import { Button } from 'react-bootstrap';
import CismetFooterAcks from 'react-cismap/topicmaps/wuppertal/CismetFooterAcknowledgements';

const Menu99Footer = () => {
  return (
    <div style={{ display: 'flex' }}>
      <span style={{ fontSize: '11px' }}>
        <b>Hintergrundkarten</b>: True Orthophoto 2022, Amtliche Basiskarte
        (ABK) © Stadt Wuppertal | Stadtplanwerk 2.0 (Beta) © RVR | WebAtlasDE ©
        BKG <a>(Details und Nutzungsbedingungen)</a>
        <br />
        <CismetFooterAcks />
      </span>
      <Button size="sm" variant="info">
        In eigenem Fenster öffnen
      </Button>
    </div>
  );
};

export default Menu99Footer;
