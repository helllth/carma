import { Alert, AlertContainer } from 'react-bs-notifier';
import { Form, FormGroup, Row, Col, Button, Container } from 'react-bootstrap';
import Loadable from 'react-loading-overlay';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKassenzeichenbySTAC } from '../../store/slices/kassenzeichen';
import { getLoginInProgress, getLoginInfoText } from '../../store/slices/auth';
import { useNavigate } from 'react-router-dom';

const VerdisOnlineLanding = () => {
  const [stac, setStac] = useState('');
  const dispatch = useDispatch();
  const loginInProgress = useSelector(getLoginInProgress);
  const loginInfoText = useSelector(getLoginInfoText);
  const navigate = useNavigate();
  let landingStyle = {
    backgroundColor: 'red',
    height: 1279,
    width: '100%',
    background: "url('/images/" + 'background.jpg' + "')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  const panelStyle = {
    backgroundColor: 'rgba(255,255,255,1)',
    border: 0,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 10,
    paddingTop: 10,
  };

  const handleStacInput = (e) => {
    setStac(e.target.value);
    handleStacChange(e.target.value);
  };

  const handleStacChange = (rawStac) => {
    setStac(rawStac);
    if (rawStac) {
      console.log('xxx', rawStac);
      let stac = rawStac.trim().replace(/[- ]/g, '');
      if (stac.length === 12) {
        dispatch(
          // @ts-ignore
          getKassenzeichenbySTAC(stac, (success) => {
            if (success === true) {
              setTimeout(() => {
                const verificationCode = '';
                let verificationCodeSuffix = '';
                if (verificationCode) {
                  verificationCodeSuffix =
                    '?emailVerificationCode=' + verificationCode;
                }
                navigate('/meinkassenzeichen' + verificationCodeSuffix);
                // this.props.routingActions.push(
                //     "/meinkassenzeichen" + verificationCodeSuffix
                // );
              }, 100);
            } else {
              setTimeout(() => {
                // this.props.uiActions.setStacInput("");
                // this.props.routingActions.push("/");
                // this.setState({ loginAlertVisible: true });
              }, 1000);
            }
          })
        );
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '200px',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          width: '100%',
          height: '250px',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          width: '100%',

          backgroundColor: 'rgba(0,0,0,0)',
        }}
      >
        <div
          style={{
            fontSize: '9px',
            textAlign: 'right',
            color: 'rgba(256,256,256,0.5)',
            margin: 4,
          }}
        >
          {/* {getVersion()} */}
        </div>
      </div>
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <AlertContainer position="top-right">
          <div>
            {/* {this.state.connectionProblem && (
                                <Alert
                                    type="danger"
                                    headline="Verbindungsprobleme."
                                    onDismiss={() => {
                                        this.setState({ connectionAlertVisible: false });
                                    }}
                                >
                                    Im Moment können wir keine Verbindung zu unseren Diensten
                                    aufbauen.
                                </Alert>
                            )} */}
            {/* {this.state.loginAlertVisible && (
                                <Alert
                                    type="danger"
                                    timeout={10000}
                                    headline="Anmeldeinformationen fehlerhaft oder abgelaufen."
                                    onDismiss={() => {
                                        this.setState({ loginAlertVisible: false });
                                    }}
                                >
                                    Bitte überprüfen Sie den eingegeben Code und dessen
                                    Gültigkeitsdauer. Bei Problemen mit der Anmeldung, wenden Sie
                                    sich bitte an den untenstehende Kontakt.
                                </Alert>
                            )} */}
            {/* {this.props.uiState.confData &&
                                this.props.uiState.confData.messages &&
                                this.props.uiState.confData.messages.map((message, index) => {
                                    return (
                                        <div key={message.key}>
                                            {
                                                <Alert
                                                    key={"alert" + message.key}
                                                    type={message.type}
                                                    timeout={message.timeout}
                                                    headline={message.headline}
                                                >
                                                    {message.content}
                                                </Alert>
                                            }
                                        </div>
                                    );
                                })} */}
          </div>
        </AlertContainer>
      </div>

      <div style={landingStyle}>
        <Container>
          {/* <div style={{ marginRight: -15, marginLeft: -15 }}>
            <div
              style={{
                width: '100%',
                float: 'left',
                position: 'relative',
                minHeight: 1,
                paddingRight: 15,
                paddingLeft: 15,
              }}
            > */}
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <h1 style={{ color: 'white' }}>
                <img alt="" width={180} src="/images/wuppertal-white.svg" />
              </h1>
              {/* {getVersion() === "dev-hot-reload" &&
                                    process.env.NODE_ENV === "development" && (
                                        <span>
                                            <Button
                                                style={{ margin: 5 }}
                                                onClick={() => {
                                                    this.handleSTAC("STACSTACSTAC");
                                                }}
                                            >
                                                Rathaus
                                            </Button>
                                            <Button
                                                style={{ margin: 5 }}
                                                onClick={() => {
                                                    this.handleSTAC("SUNC-ZWSO-PEWR");
                                                }}
                                            >
                                                Test 1
                                            </Button>
                                            <Button
                                                style={{ margin: 5 }}
                                                onClick={() => {
                                                    this.handleSTAC("TKNM-GBOF-XHTN");
                                                }}
                                            >
                                                Test 2
                                            </Button>
                                        </span>
                                    )} */}
              <h2 style={{ color: 'white' }}>VerDIS - online</h2>
              <h3 style={{ color: 'white' }}>
                Versiegelungsdaten | Flächenentwässerung
              </h3>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={6} md={6}>
              <div
                style={{
                  position: 'fixed',
                  top: 1279 - 200,
                }}
              >
                <Loadable active={loginInProgress} spinner text={loginInfoText}>
                  <div
                    style={{
                      ...panelStyle,
                      marginBottom: 20,
                      borderRadius: 4,
                      boxShadow: '0 1px 2px rgba(0, 0, 0, .05)',
                    }}
                  >
                    <div style={{ padding: 15 }}>
                      <h3>Zugangscode:</h3>
                      <Form
                        // horizontal
                        className="LoginForm"
                        id="loginForm"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <FormGroup controlId="stacInput">
                          <MaskedFormControl
                            key={'MaskedFormControl.with'}
                            style={{
                              height: '50px',
                              border: '1px solid #9999992',
                              padding: '5px',
                              fontSize: '24px',
                              fontFamily: 'monospace',
                            }}
                            // ref={input => {
                            //     this.stacInput = input;
                            // }}
                            placeholderChar=" "
                            type="text"
                            name="stac"
                            mask="AAAA-AAAA-AAAA"
                            value={stac}
                            onChange={handleStacInput}
                            // disabled={this.state.connectionProblem}
                          />
                        </FormGroup>
                      </Form>
                    </div>
                  </div>
                </Loadable>
              </div>
            </Col>
            <Col xs={1} md={1} />

            <Col xs={5} md={5}>
              <div
                style={{
                  position: 'fixed',
                  top: 1279 - 200,
                }}
              >
                <h4 style={{ color: 'white' }}>Stadt Wuppertal</h4>
                <h4 style={{ color: 'white' }}>
                  Vermessung, Katasteramt und Geodaten
                </h4>
                <h4 style={{ color: 'white' }}>
                  102.23 Kommunalservice Liegenschaftskataster
                </h4>
                <h4 style={{ color: 'white' }}>
                  <a
                    style={{ color: 'white' }}
                    href="mailto:regengeld@stadt.wuppertal.de"
                  >
                    regengeld@stadt.wuppertal.de
                  </a>
                </h4>
              </div>
            </Col>
          </Row>
          {/* </div> */}
          {/* </div> */}
        </Container>
      </div>
    </div>
  );
};

export default VerdisOnlineLanding;
