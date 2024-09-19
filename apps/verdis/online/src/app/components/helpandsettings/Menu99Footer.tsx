import { Button } from "react-bootstrap";
import { KompaktanleitungFooter } from "@carma-collab/wuppertal/verdis-online";
import { getApplicationVersion } from "@carma-commons/utils";
import versionData from "../../../version.json";

const Menu99Footer = () => {
  const version = getApplicationVersion(versionData);
  return (
    <div style={{ display: "flex" }}>
      <KompaktanleitungFooter version={version} />
      <Button size="sm" variant="info">
        In eigenem Fenster öffnen
      </Button>
    </div>
  );
};

export default Menu99Footer;
