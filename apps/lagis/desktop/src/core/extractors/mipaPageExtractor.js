import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
export function mipaPageExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const mipa = dataIn;
    if (mipa.length > 0) {
      let formattedVertragsbeginn;
      let formattedVertragsende;
      const data = mipa.map((m) => {
        if (m.vertragsbeginn) {
          const dateVertragsbeginn = dayjs(m.vertragsbeginn).toDate();
          formattedVertragsbeginn =
            dayjs(dateVertragsbeginn).format("DD.MM.YYYY");
        } else {
          formattedVertragsbeginn = null;
        }
        if (m.vertragsende) {
          const dateVertragsende = dayjs(m.vertragsende).toDate();
          formattedVertragsende = dayjs(dateVertragsende).format("DD.MM.YYYY");
        } else {
          formattedVertragsende = null;
        }
        return {
          id: nanoid(),
          lage: m.lage,
          aktenzeichen: m.aktenzeichen,
          flaeche: m.flaeche,
          nutzung: m.mipa_nutzung.mipa_kategorie.bezeichnung,
          vertragsbegin: formattedVertragsbeginn,
          vertragsende: formattedVertragsende,
          merkmale: m.ar_mipa_merkmaleArray ? m.ar_mipa_merkmaleArray : [],
          querverweise: "",
          note: m.bemerkung ? m.bemerkung : "",
        };
      });

      return data;
    }

    return [];
  }
}
