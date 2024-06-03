import CismetFooterAcks from 'react-cismap/topicmaps/wuppertal/CismetFooterAcknowledgements';

const Menu99Footer = () => {
  return (
    <div>
      <span style={{ fontSize: '11px' }}>
        <b>Hintergrundkarten</b>: True Orthophoto 2022, Amtliche Basiskarte
        (ABK) © Stadt Wuppertal | Stadtplanwerk 2.0 (Beta) © RVR | WebAtlasDE ©
        BKG <a>(Details und Nutzungsbedingungen)</a>
        <br />
        <CismetFooterAcks />
      </span>
    </div>
  );
};

export default Menu99Footer;
