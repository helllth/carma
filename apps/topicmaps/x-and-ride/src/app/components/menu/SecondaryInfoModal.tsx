import {
  faBicycle,
  faCar,
  faChargingStation,
  faPhoneFlip,
  faQuestion,
  faSquareArrowUpRight,
  faSquareEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Accordion, Card, Table } from 'react-bootstrap';

const SecondaryInfoModal = ({ feature, setOpen }) => {
  const close = () => {
    setOpen(false);
  };
  let urlPrefix = window.location.origin + window.location.pathname;

  const properties = feature.properties;
  const groupingFunction = (obj) => {
    if (obj.schluessel === 'P') {
      return 'P+R';
    } else {
      return 'B+R';
    }
  };
  let foto;
  if (properties.foto !== undefined) {
    foto = 'https://www.wuppertal.de/geoportal/prbr/fotos/' + properties.foto;
  }

  let plaetze_label = 'Plätze';
  if (properties.ueberdachung === true) {
    plaetze_label = 'überdachter Plätze';
  }

  return (
    <Modal
      style={{
        zIndex: 2900000000,
      }}
      height="100%"
      size="lg"
      show={true}
      onHide={close}
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>
          <FontAwesomeIcon
            icon={properties.schluessel === 'B' ? faBicycle : faCar}
          />
          {`Datenblatt: ${groupingFunction(properties)} ${properties.name}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="myMenu" key={'prbr.secondaryInfo'}>
        <div style={{ width: '100%', minHeight: 250 }}>
          {foto !== undefined && (
            <img
              alt="Bild"
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                float: 'right',
                paddingBottom: '5px',
              }}
              src={foto}
              width="250"
            />
          )}
          <div style={{ fontSize: '115%', padding: '10px', paddingTop: '0px' }}>
            <div>{properties.beschreibung}</div>
            <br />
            <div>
              Anzahl {plaetze_label}: {properties.plaetze}
            </div>
            <br />

            {properties.anbindung_schwebebahn === true && (
              <p>
                Die Anlage ist an die Schwebebahn angebunden und befindet sich{' '}
                {properties.inUZ === true ? 'innerhalb' : 'außerhalb'} einer
                Umweltzone.
              </p>
            )}
            {properties.anbindung_schwebebahn === false &&
              properties.inUZ === true && (
                <p>Die Anlage befindet sich in einer Umweltzone.</p>
              )}
            {properties.anbindung_schwebebahn === false &&
              properties.inUZ === false && (
                <p>Die Anlage befindet sich außerhalb einer Umweltzone.</p>
              )}
          </div>
        </div>
        {(properties.bahnlinien.length > 0 ||
          properties.buslinien.length > 0) && (
          <Accordion style={{ marginBottom: 6 }} defaultActiveKey={'0'}>
            <Card style={{ backgroundColor: '#bce8f1' }}>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  ÖPNV
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ backgroundColor: 'white' }}>
                  {properties.bahnlinien.length > 0 && (
                    <div style={{ marginBottom: 6, fontSize: 20 }}>
                      <b>Bahnlinien</b>
                    </div>
                  )}
                  {properties.bahnlinien.map((linie) => {
                    return <p style={{ marginBottom: 0 }}>{linie}</p>;
                  })}
                  {properties.buslinien.length > 0 && (
                    <div
                      style={{ marginBottom: 6, fontSize: 20, marginTop: 6 }}
                    >
                      <b>Buslinien</b>
                    </div>
                  )}
                  {properties.buslinien.map((linie) => {
                    return <p style={{ marginBottom: 0 }}>{linie}</p>;
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}
        <Accordion style={{ marginBottom: 6 }} defaultActiveKey={'2'}>
          <Card style={{ backgroundColor: '#d6e9c6' }}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Fahrplanauskunft
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body style={{ backgroundColor: 'white' }}>
                <a
                  style={{ textDecoration: 'none' }}
                  href={`http://efa.vrr.de/wswstd/XSLT_TRIP_REQUEST2?language=de&sessionID=0&odvMacro=true&commonMacro=true&lineRestriction=403&SpEncId=0&type_origin=any&type_destination=any&useRealtime=1&nameInfo_origin=invalid&nameInfo_destination=invalid&name_origin=${properties.haltestellenname}&name_destination=`}
                  target="_fahrplanauskunft"
                >
                  <table style={{ width: '100%' }}>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            textAlign: 'left',
                            verticalAlign: 'top',
                            paddingRight: 10,
                          }}
                        >
                          <h4>
                            Mit einem Klick die Fahrplanauskunft des VRR zu
                            dieser Haltestelle öffnen.
                          </h4>
                          <img
                            alt="Bild"
                            style={{ paddingBottom: '5px' }}
                            src={urlPrefix + '/images/logo-vrr.png'}
                            width="80"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </a>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <table
          style={{
            width: '100%',
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  textAlign: 'left',
                  verticalAlign: 'bottom',
                  paddingRight: '30px',
                }}
              >
                <div>
                  <span style={{ fontSize: '11px' }}>
                    <div>
                      <b>TopicMaps Wuppertal</b> (Version 1.22.3):{' '}
                      <a href="https://cismet.de/" target="_cismet">
                        cismet GmbH
                      </a>{' '}
                      auf Basis von{' '}
                      <a href="http://leafletjs.com/" target="_more">
                        Leaflet
                      </a>{' '}
                      und{' '}
                      <a href="https://cismet.de/#refs" target="_cismet">
                        cids | WuNDa
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
                  </span>
                </div>
              </td>
              <td>
                <Button
                  id="cmdCloseModalApplicationMenu"
                  type="submit"
                  onClick={close}
                >
                  Ok
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Footer>
    </Modal>
  );
};

export default SecondaryInfoModal;
