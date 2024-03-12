import { getApplicationVersion } from "../version";
import { version as reactCismapVersion } from "react-cismap/meta";

export default function Footer() {
  return (
    <div style={{ fontSize: "11px" }}>
      <div>
        <b>
          {document.title} v{getApplicationVersion()}
        </b>
        :{" "}
        <a href="https://cismet.de/" target="_cismet">
          cismet GmbH
        </a>{" "}
        auf Basis von{" "}
        <a href="http://leafletjs.com/" target="_more">
          Leaflet
        </a>{" "}
        und{" "}
        <a href="https://cismet.de/#refs" target="_cismet">
          cids | react-cismap v{reactCismapVersion}
        </a>{" "}
        |{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cismet.de/datenschutzerklaerung.html"
        >
          Datenschutzerklärung (Privacy Policy)
        </a>
      </div>
    </div>
  );
}
