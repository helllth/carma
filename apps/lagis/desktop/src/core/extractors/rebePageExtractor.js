import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
const dateFormat = "DD.MM.YYYY";
export function rebePageExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const rebe = dataIn;
    if (rebe.length > 0) {
      const data = rebe.map((r) => {
        let formattedEintragung;
        if (r.datum_eintragung) {
          const dateEintragung = dayjs(r.datum_eintragung).toDate();
          formattedEintragung = dayjs(dateEintragung).format("DD.MM.YYYY");
        } else {
          formattedEintragung = null;
        }
        let formattedLoschung;
        if (r.datum_loeschung) {
          const dateLoschung = dayjs(r.datum_loeschung).toDate();
          formattedLoschung = dayjs(dateLoschung).format("DD.MM.YYYY");
        } else {
          formattedLoschung = null;
        }
        return {
          id: nanoid(),
          recht: r.ist_recht,
          art: r.rebe_art?.bezeichnung || "",
          artrecht: r.beschreibung,
          nummer: r.nummer,
          eintragung: formattedEintragung,
          loschung: formattedLoschung,
          bemerkung: r.bemerkung ? r.bemerkung : "",
        };
      });

      return data;
    }

    return [];
  }
}
