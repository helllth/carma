import React, { useContext, useMemo } from "react";
import Icon from "react-cismap/commons/Icon";
import CustomizationContextProvider from "react-cismap/contexts/CustomizationContextProvider";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import ConfigurableDocBlocks from "react-cismap/topicmaps/ConfigurableDocBlocks";
import GenericHelpTextForMyLocation from "react-cismap/topicmaps/docBlocks/GenericHelpTextForMyLocation";
import ModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import Section from "react-cismap/topicmaps/menu/Section";
import LicenseLuftbildkarte from "react-cismap/topicmaps/wuppertal/LicenseLuftbildkarte";
import LicenseStadtplanTagNacht from "react-cismap/topicmaps/wuppertal/LicenseStadtplanTagNacht";
import { Link } from "react-scroll";

import FilterUI from "./FilterUI";
import FilterRowUI from "./FilterRowUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faCopy,
  faMagnifyingGlass,
  faMap,
  faPrint,
  faShareFromSquare,
  faSquareMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
// import { Tooltip } from 'antd';
import { TopicMapDispatchContext } from "react-cismap/contexts/TopicMapContextProvider";
import {
  Button,
  ButtonGroup,
  Dropdown,
  Alert,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import {
  MenuTitle,
  MenuFooter,
  MenuIntroduction,
  SectionTitleGLB,
  SectionTitleKen,
  SectionTitleZg,
  SectionTitleMerkliste,
  TextInMerkliste,
  KompaktanleitungSection,
} from "@carma-collab/wuppertal/ehrenamtskarte";
import { GenericDigitalTwinReferenceTextComponent } from "@carma-collab/wuppertal/commons";

const Menu = ({ bookmarks, setBookmarks }) => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);
  const { filteredItems, shownFeatures, itemsDictionary, allFeatures } =
    useContext(FeatureCollectionContext);
  const { zoomToFeature } = useContext(TopicMapDispatchContext);

  const globalbereiche = useMemo(
    () => itemsDictionary?.globalbereiche || [],
    [itemsDictionary],
  );

  const kenntnisse = useMemo(
    () => itemsDictionary?.kenntnisse || [],
    [itemsDictionary],
  );

  const zielgruppen = useMemo(
    () => itemsDictionary?.zielgruppen || [],
    [itemsDictionary],
  );

  const getFilterHeader = () => {
    const count = filteredItems?.length || 0;

    let term;
    if (count === 1) {
      term = "Angebot";
    } else {
      term = "Angebote";
    }

    return `Filtern (${count} ${term} gefunden, davon ${
      shownFeatures?.length || "0"
    } in der Karte)`;
  };

  return (
    <CustomizationContextProvider customizations={{}}>
      <ModalApplicationMenu
        menuIcon={"bars"}
        menuTitle={<MenuTitle />}
        menuFooter={<MenuFooter />}
        menuIntroduction={
          <MenuIntroduction
            setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
          />
        }
        menuSections={[
          <Section
            key="filter"
            sectionKey="filter"
            sectionTitle={getFilterHeader()}
            sectionBsStyle="primary"
            sectionContent={<FilterUI />}
          />,
          globalbereiche.length > 0 && (
            <Section
              key="glb"
              sectionKey="glb"
              sectionTitle={<SectionTitleGLB />}
              sectionBsStyle="warning"
              sectionContent={
                <table border={0}>
                  <tbody>
                    <FilterRowUI items={globalbereiche} />
                  </tbody>
                </table>
              }
            />
          ),
          kenntnisse.length > 0 && (
            <Section
              key="ken"
              sectionKey="ken"
              sectionTitle={<SectionTitleKen />}
              sectionBsStyle="info"
              sectionContent={
                <table border={0}>
                  <tbody>
                    <FilterRowUI items={kenntnisse} />
                  </tbody>
                </table>
              }
            />
          ),
          zielgruppen.length > 0 && (
            <Section
              key="zg"
              sectionKey="zg"
              sectionTitle={<SectionTitleZg />}
              sectionBsStyle="success"
              sectionContent={
                <table border={0}>
                  <tbody>
                    <FilterRowUI items={zielgruppen} />
                  </tbody>
                </table>
              }
            />
          ),
          <Section
            key="merkliste"
            sectionKey="merkliste"
            sectionTitle={
              <SectionTitleMerkliste bookmarks={bookmarks.length} />
            }
            sectionBsStyle="primary"
            sectionContent={
              <>
                <table width="100%" border={0}>
                  <tbody>
                    <tr>
                      <td>
                        <ul>
                          {bookmarks.map((value) => {
                            const feature = allFeatures.find(
                              (obj) => obj.properties.id === value,
                            );
                            const text = feature.text;
                            const id = feature.properties.id;
                            return (
                              <li key={"cart.li." + id}>
                                <h5>
                                  Angebot Nr. {id}{" "}
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip style={{ zIndex: 30000000000 }}>
                                        In Karte anzeigen
                                      </Tooltip>
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faMagnifyingGlass}
                                      onClick={() => {
                                        zoomToFeature(feature);
                                      }}
                                      style={{
                                        height: 13,
                                        paddingLeft: "12px",
                                        paddingRight: "16px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip style={{ zIndex: 30000000000 }}>
                                        Aus Merkliste entfernen
                                      </Tooltip>
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faSquareMinus}
                                      onClick={() => {
                                        setBookmarks((prev) =>
                                          prev.filter(
                                            (id) =>
                                              id !== feature.properties.id,
                                          ),
                                        );
                                      }}
                                      style={{
                                        height: 14,
                                        color: "#C33D17",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </OverlayTrigger>
                                </h5>
                                <h6>{text}</h6>
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td style={{ textAlign: "right", verticalAlign: "top" }}>
                        <ButtonGroup bsStyle="default">
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip style={{ zIndex: 30000000000 }}>
                                Merkliste löschen
                              </Tooltip>
                            }
                          >
                            <Button
                              variant="light"
                              onClick={() => setBookmarks([])}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip style={{ zIndex: 30000000000 }}>
                                Merklistenfilter aktivieren
                              </Tooltip>
                            }
                          >
                            <Button variant="light">
                              <FontAwesomeIcon icon={faMap} />
                            </Button>
                          </OverlayTrigger>
                          <Dropdown>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip style={{ zIndex: 30000000000 }}>
                                  Merkliste teilen
                                </Tooltip>
                              }
                            >
                              <Dropdown.Toggle variant="light">
                                <FontAwesomeIcon icon={faShareFromSquare} />
                              </Dropdown.Toggle>
                            </OverlayTrigger>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                eventKey="1"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    window.location.href,
                                  );
                                }}
                              >
                                <FontAwesomeIcon icon={faCopy} /> Link kopieren
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="2">
                                <FontAwesomeIcon icon={faAt} /> Merkliste per
                                Mail senden
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="3" disabled={true}>
                                <FontAwesomeIcon icon={faPrint} /> Merkliste
                                drucken
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Alert variant="warning" style={{ marginTop: "4px" }}>
                  <TextInMerkliste />
                </Alert>
              </>
            }
          />,
          <KompaktanleitungSection />,
          <Section
            key="digiTal"
            sectionKey="digiTal"
            sectionTitle={"DigiTal Zwilling"}
            sectionBsStyle="warning"
            sectionContent={<GenericDigitalTwinReferenceTextComponent />}
          ></Section>,
        ]}
      />
    </CustomizationContextProvider>
  );
};
export default Menu;
const NW = (props) => {
  return <span style={{ whiteSpace: "nowrap" }}>{props.children}</span>;
};
