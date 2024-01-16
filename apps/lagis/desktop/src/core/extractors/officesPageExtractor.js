import { nanoid } from "@reduxjs/toolkit";
import { getColorFromCode } from "../tools/helper";
import {
  getOfficesWithColorAndSquare,
  geHistoricalArraytOfficesWithColorAndSquare,
} from "../tools/helper";

export function noteExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      currentText: "",
    };
  } else {
    const lagisLandparcel = dataIn;
    const currentText = lagisLandparcel?.bemerkung || "";
    const bemerkungSperre =
      lagisLandparcel?.flurstueck_schluessel.bemerkung_sperre || null;

    return {
      currentText,
      ifBemerkungSperre: bemerkungSperre === "Stei" ? true : false,
    };
  }
}
export function streetfrontsExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const lagisLandparcel = dataIn;
    const streetfronts = lagisLandparcel?.strassenfrontArrayRelationShip || [];
    if (streetfronts.length !== 0) {
      return streetfronts.map((s) => ({
        id: s.id,
        street: s.strassenname,
        length: s.laenge,
      }));
    } else {
      return [];
    }
  }
}
export function additionalRollExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const lagisLandparcel = dataIn;
    const additionalRoll = lagisLandparcel?.zusatz_rolleArrayRelationShip || [];
    let additionalRoleColor = "";
    if (additionalRoll.length !== 0) {
      const rolleArr = additionalRoll.map((r) => {
        return {
          id: r.verwaltende_dienststelle.ressort.id,
          agency: `${r.verwaltende_dienststelle.ressort.abkuerzung}.${r.verwaltende_dienststelle.abkuerzung_abteilung}`,
          rolle: `${r.zusatz_rolle_art.name}`,
          color: getColorFromCode(
            r.verwaltende_dienststelle.farbeArrayRelationShip[0].rgb_farbwert
          ),
        };
      });

      return rolleArr;
    } else {
      return [];
    }
  }
}
export function officesPageExtractor(dataIn) {
  if (dataIn === undefined) {
    return { currentOffices: [], history: 0 };
  } else {
    const landparcel = dataIn;
    const officesData =
      landparcel?.verwaltungsbereiche_eintragArrayRelationShip || [];
    const lastOffice = officesData[officesData.length - 1];
    const history = officesData.slice(0, officesData.length - 1);
    const historyData = geHistoricalArraytOfficesWithColorAndSquare(
      history,
      dataIn
    );
    const nameGeomColorData = getOfficesWithColorAndSquare(lastOffice, dataIn);

    const agencyTableFields = nameGeomColorData.map((a) => ({
      id: nanoid(),
      agency: a.title,
      area: a.size ? a.size : "",
      color: a.color,
    }));

    return { currentOffices: agencyTableFields, history: historyData };
  }
}
