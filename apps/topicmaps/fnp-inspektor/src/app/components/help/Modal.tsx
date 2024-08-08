import ModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import { useContext } from "react";
import {
  MenuIntroduction,
  RechtsplanUndArbeitskarte,
  InKartePositionieren,
  MeinStandort,
  AenderungsverfahrenAnzeigenUndAbfragen,
  AenderungsverfahrenSuchenUndDurchmustern,
  FlaechenInDerArbeitskarteAuswaehlenUndAbfragen,
  DokumenteBetrachten,
  DokumenteHerunterladen,
  MenuTitle,
  Footer,
} from "@carma-collab/wuppertal/fnp-inspektor";
import { GenericDigitalTwinReferenceSection } from "@carma-collab/wuppertal/commons";
import { getApplicationVersion } from "../../../version";

const Modal = () => {
  const { setAppMenuActiveMenuSection } =
    useContext<typeof UIDispatchContext>(UIDispatchContext);
  return (
    <ModalApplicationMenu
      menuIcon={"info"}
      menuTitle={<MenuTitle />}
      menuIntroduction={<MenuIntroduction />}
      menuSections={[
        <RechtsplanUndArbeitskarte />,
        <InKartePositionieren
          setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
        />,
        <MeinStandort />,
        <AenderungsverfahrenAnzeigenUndAbfragen
          setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
        />,
        <AenderungsverfahrenSuchenUndDurchmustern
          setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
        />,
        <FlaechenInDerArbeitskarteAuswaehlenUndAbfragen
          setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
        />,
        <DokumenteBetrachten />,
        <DokumenteHerunterladen />,
        <GenericDigitalTwinReferenceSection />,
      ]}
      menuFooter={
        <Footer
          version={getApplicationVersion()}
          setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
        />
      }
    />
  );
};

export default Modal;
