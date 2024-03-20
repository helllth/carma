import {
  faChargingStation,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Accordion, Card, Table } from 'react-bootstrap';
import { getConnectorImageUrl } from './helper/helper';

const SecondaryInfoModal = ({ feature, setOpen }) => {
  const close = () => {
    setOpen(false);
  };

  const ladestation = feature.properties;
  let foto;
  if (ladestation.foto !== undefined) {
    foto = ladestation.foto;
  }
  let steckerverbindungenTableArr = [];
  if (
    ladestation.steckerverbindungen &&
    ladestation.steckerverbindungen.length > 0
  ) {
    ladestation.steckerverbindungen.forEach((v, index) => {
      for (let i = 0; i < v.anzahl; ++i) {
        let imageUrl =
          'https://wunda-geoportal.cismet.de/' +
          getConnectorImageUrl(v.steckdosentypkey);
        let image;

        console.log(imageUrl);
        if (imageUrl) {
          image = (
            <img
              alt={v.steckdosentypkey}
              src={imageUrl}
              width="50"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = '/images/emob/dynamic/unknown.png';
              }}
            />
          );
        } else {
          image = <FontAwesomeIcon icon={faQuestion} />;
        }
        steckerverbindungenTableArr.push(
          <tr key={index + '.' + i}>
            <td
              style={{
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
            >
              {image}
            </td>
            <td style={{ verticalAlign: 'middle' }}>{v.steckdosentyp}</td>
            <td style={{ verticalAlign: 'middle' }}>
              {v.leistung}kW
              {v.strom && v.spannung ? ` (${v.strom}A, ${v.spannung}V)` : ``}
              {v.strom && !v.spannung ? ` (${v.strom}A)` : ``}
              {!v.strom && v.spannung ? ` (${v.spannung}V)` : ``}
            </td>
          </tr>
        );
      }
    });
  }

  console.log(ladestation);

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
          <FontAwesomeIcon icon={faChargingStation} />
          {`Datenblatt: Ladestation ${ladestation.name}`}
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
            <div>
              <b>Adresse:</b>
            </div>
            <div>
              {ladestation.strasse} {ladestation.hausnummer}
            </div>
            <br />
            <div>{ladestation.detailbeschreibung}</div>
            <div> {ladestation.zusatzinfo}</div>
            <br />
            <div>
              <b>Öffnungszeiten:</b> {ladestation.oeffnungszeiten}
            </div>
          </div>
        </div>
        <Accordion style={{ marginBottom: 6 }} defaultActiveKey={'0'}>
          <Card style={{ backgroundColor: '#bce8f1' }}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {ladestation.online === true
                  ? 'Lademöglichkeit verfügbar (online)'
                  : 'Lademöglichkeit momentan nicht verfügbar (offline)'}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ backgroundColor: 'white' }}>
                <div>
                  <b>Ladepunkte:</b> {ladestation.ladeplaetze}
                </div>
                <div>
                  <b>Steckerverbindungen:</b>
                  <Table
                    striped
                    bordered
                    condensed
                    hover
                    style={{ marginTop: 8 }}
                  >
                    <tbody>{steckerverbindungenTableArr}</tbody>
                  </Table>
                  <div style={{ textAlign: 'right' }}>
                    <a
                      href="https://github.com/cismet/wupp-topic-maps/blob/feature/039-winter-2019-dev-sprint/public/images/emob/"
                      target="_license"
                    >
                      Bildnachweis
                    </a>
                  </div>
                </div>
                <div>
                  <b>Strom:</b> {ladestation.stromart}
                </div>
                <div>
                  <b>Schnellladestation:</b>{' '}
                  {ladestation.schnellladestation === true ? 'Ja' : 'Nein'}
                </div>
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
                  <span style={{ fontSize: '11px' }}></span>
                </div>
              </td>
              <td>
                <Button
                  id="cmdCloseModalApplicationMenu"
                  bsStyle="primary"
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
