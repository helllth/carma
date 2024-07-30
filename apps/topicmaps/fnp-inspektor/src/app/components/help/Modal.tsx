import ModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import { useContext } from "react";
import Footer from "./Footer";
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
} from "@carma-collab/wuppertal/fnp-inspektor";

const Modal = () => {
  const { setAppMenuActiveMenuSection } =
    useContext<UIDispatchContext>(UIDispatchContext);
  return (
    <ModalApplicationMenu
      menuIcon={"info"}
      menuTitle={"Kompaktanleitung FNP-Inspektor Wuppertal"}
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
      ]}
      menuFooter={<Footer />}
    />
  );
};

export default Modal;
