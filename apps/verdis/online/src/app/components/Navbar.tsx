import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudUploadAlt,
  faCloudDownloadAlt,
  faCloudRain,
  faFilePdf,
  faInfoCircle,
  faChartPie,
  faUser,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import {
  Navbar,
  Nav,
  NavItem,
  OverlayTrigger,
  Tooltip,
  Badge,
  Popover,
  Overlay,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getKassenzeichen,
  getNumberOfPendingChanges,
} from '../../store/slices/kassenzeichen';
import {
  CLOUDSTORAGESTATES,
  getUiState,
  showChangeRequests,
  showSettings,
  toggleInfoElements,
} from '../../store/slices/ui';
import { colorDraft } from '../../utils/kassenzeichenHelper';
import Waiting from './Waiting';
import { useRef } from 'react';

const VerdisOnlineAppNavbar = () => {
  const dispatch = useDispatch();
  const helpRef = useRef(null);
  const kassenzeichen = useSelector(getKassenzeichen);
  const uiState = useSelector(getUiState);
  console.log('xxx', kassenzeichen);

  const crCounter = getNumberOfPendingChanges(kassenzeichen);
  let kasszLabel = 'Kassenzeichen: ';
  let lblDownLoadFeb = 'Flächenerfassungsbogen herunterladen (PDF)';
  let lblInfo = uiState.infoElementsEnabled
    ? 'Flächeninfo ausblenden'
    : 'Flächeninfo einblenden';
  let lblChart = uiState.chartElementsEnabled
    ? 'Diagramm ausblenden'
    : 'Diagramm einblenden';
  let lblContact = uiState.contactElementEnabled
    ? 'Ansprechpartner ausblenden'
    : 'Ansprechpartner einblenden';
  let lblExit = 'VerDIS-online beenden';
  let menuIsHidden = false;

  let ttTriggerOn = ['hover', 'focus'];
  let ttTriggerOff = null;
  let kassenzeichennummer;
  if (kassenzeichen.kassenzeichennummer8) {
    kassenzeichennummer =
      ' (' + kasszLabel + kassenzeichen.kassenzeichennummer8 + ')';
  } else {
    kassenzeichennummer = '';
  }

  let pdfIconStyle;
  if (uiState.febBlob !== null) {
    pdfIconStyle = { color: 'white' };
  } else {
    pdfIconStyle = { color: 'grey' };
  }

  return (
    <div>
      <Navbar
        style={{
          marginBottom: 0,
          backgroundImage: 'linear-gradient(to bottom, #3c3c3c 0, #222 100%)',
          backgroundRepeat: 'repeat-x',
          borderRadius: 4,
          backgroundColor: '#222',
          borderColor: '#080808',
        }}
      >
        <Container>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip style={{ zIndex: 3000000000 }} id="prevtt">
                alle Teilflächen zum Kassenzeichen anzeigen
              </Tooltip>
            }
          >
            <>
              <Navbar.Brand
                style={{
                  color: '#9d9d9d',
                  textShadow: '0 -1px 0 rgba(0, 0, 0, .25)',
                }}
              >
                <a
                  id="verdis_online_brand"
                  style={{ cursor: 'pointer' }}
                  // onClick={this.fitBounds}
                >
                  VerDIS-online{kassenzeichennummer}
                </a>
              </Navbar.Brand>

              <Navbar.Toggle />
            </>
          </OverlayTrigger>
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <NavItem
                ref={helpRef}
                id="navitem_showSettings"
                onClick={() => dispatch(showSettings({ visible: true }))}
                //   eventKey={2.0}
                style={{
                  color: '#9d9d9d',
                  textShadow: '0 -1px 0 rgba(0, 0, 0, .25)',
                }}
              >
                Hilfe & Einstellungen
              </NavItem>

              <Overlay
                //   {...{
                //     container: this,
                //     target: this.helpRef,
                //     show:
                //       !this.props.uiState.waitingVisible &&
                //       this.props.uiState.hintVisible,
                //   }}
                placement="bottom"
                target={helpRef}
              >
                <Popover
                  id="popover-basic"
                  placement="right"
                  // positionLeft={200}
                  // positionTop={50}
                  // _title="Hilfe & Einstellungen"
                >
                  Benötigen Sie Unterstützung oder möchten nähere Information,
                  finden Sie diese hier unter "Hilfe & Einstellungen"
                </Popover>
              </Overlay>

              <NavItem
                id="navitem_showSettings"
                onClick={() => dispatch(showChangeRequests({ visible: true }))}
                //   eventKey={2.0}
                style={{
                  color: '#9d9d9d',
                  textShadow: '0 -1px 0 rgba(0, 0, 0, .25)',
                }}
              >
                Änderungswünsche{' '}
                {uiState.changeRequestsEditMode === true &&
                  crCounter.crDraftCounter > 0 && (
                    <Badge style={{ backgroundColor: colorDraft }}>
                      {crCounter.crDraftCounter}
                    </Badge>
                  )}
                {crCounter.crDraftCounter === 0 && crCounter.crCounter > 0 && (
                  <Badge>{crCounter.crCounter}</Badge>
                )}
              </NavItem>
              <OverlayTrigger
                trigger={menuIsHidden ? ttTriggerOff : ttTriggerOn}
                placement="bottom"
                overlay={
                  <Tooltip style={{ zIndex: 3000000000 }} id="prevtt">
                    {lblDownLoadFeb}
                  </Tooltip>
                }
              >
                <NavItem
                  id="navitem_downloadFEB"
                  // onClick={this.downloadFEB}
                  // eventKey={2.3}
                >
                  <FontAwesomeIcon icon={faFilePdf} style={pdfIconStyle} />
                  {menuIsHidden ? '   ' + lblDownLoadFeb : ''}
                </NavItem>
              </OverlayTrigger>
              <OverlayTrigger
                trigger={menuIsHidden ? ttTriggerOff : ttTriggerOn}
                placement="bottom"
                overlay={
                  <Tooltip style={{ zIndex: 3000000000 }} id="prevtt">
                    {lblInfo}
                  </Tooltip>
                }
              >
                <NavItem
                  id="navitem_infoElementsEnabled"
                  className={uiState.infoElementsEnabled ? 'active' : ''}
                  // eventKey={2.1}
                  // href="#"
                  onSelect={() => dispatch(toggleInfoElements({}))}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {menuIsHidden ? '   ' + lblInfo : ''}
                </NavItem>
              </OverlayTrigger>
              <OverlayTrigger
                trigger={menuIsHidden ? ttTriggerOff : ttTriggerOn}
                placement="bottom"
                overlay={
                  <Tooltip style={{ zIndex: 3000000000 }} id="prevtt">
                    {lblChart}
                  </Tooltip>
                }
              >
                <NavItem
                  id="navitem_chartElementsEnabled"
                  className={uiState.chartElementsEnabled ? 'active' : ''}
                  // eventKey={2.2}
                  // href="#"
                  // onSelect={this.toggleCharts}
                >
                  <FontAwesomeIcon icon={faChartPie} />
                  {menuIsHidden ? '   ' + lblChart : ''}
                </NavItem>
              </OverlayTrigger>
              <OverlayTrigger
                trigger={menuIsHidden ? ttTriggerOff : ttTriggerOn}
                placement="bottom"
                overlay={
                  <Tooltip style={{ zIndex: 3000000000 }} id="prevtt">
                    {lblContact}
                  </Tooltip>
                }
              >
                <NavItem
                  id="navitem_contact"
                  className={uiState.contactElementEnabled ? 'active' : ''}
                  // eventKey={2.6}
                  // href="#"
                  // onSelect={this.toggleContact}
                >
                  <FontAwesomeIcon icon={faUser} />
                  {menuIsHidden ? '   ' + lblContact : ''}
                </NavItem>
              </OverlayTrigger>
              <OverlayTrigger
                trigger={menuIsHidden ? ttTriggerOff : ttTriggerOn}
                placement="bottom"
                overlay={
                  <Tooltip style={{ zIndex: 3000000000 }} id="prevtt">
                    {lblExit}
                  </Tooltip>
                }
              >
                <NavItem
                  id="navitem_logout"
                  //   eventKey={3}
                  //   href="/#/"
                >
                  <FontAwesomeIcon icon={faPowerOff} />
                  {menuIsHidden ? '   ' + lblExit : ''}
                </NavItem>
              </OverlayTrigger>
              {uiState.cloudStorageStatus ===
                CLOUDSTORAGESTATES.CLOUD_STORAGE_UP && (
                <NavItem
                  id="navitem_cloud"
                  //   eventKey={4}
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                  {menuIsHidden ? '   ' + lblExit : ''}
                </NavItem>
              )}
              {uiState.cloudStorageStatus ===
                CLOUDSTORAGESTATES.CLOUD_STORAGE_DOWN && (
                <NavItem
                  id="navitem_cloud"
                  //   eventKey={4}
                >
                  <FontAwesomeIcon icon={faCloudDownloadAlt} />
                  {menuIsHidden ? '   ' + lblExit : ''}
                </NavItem>
              )}
              {uiState.cloudStorageStatus ===
                CLOUDSTORAGESTATES.CLOUD_STORAGE_ERROR && (
                <NavItem
                  id="navitem_cloud"
                  //    eventKey={4}
                >
                  <FontAwesomeIcon icon={faCloudRain} />
                  {menuIsHidden ? '   ' + lblExit : ''}
                </NavItem>
              )}
              {uiState.cloudStorageStatus === undefined && (
                <NavItem
                  style={{ width: 50 }}
                  id="navitem_cloud"
                  // eventKey={4}
                  // href="/#/"
                >
                  {menuIsHidden ? '   ' + lblExit : ''}
                </NavItem>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Waiting
        key={
          'Waiting.visible.' +
          uiState.waitingVisible +
          ' ...message.' +
          uiState.waitingMessage +
          ' ...type.' +
          uiState.waitingType
        }
      />
    </div>
  );
};

export default VerdisOnlineAppNavbar;
