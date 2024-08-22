const APPVERSION = "%APPLICATION_VERSION%";
const APPHASH = "#%APPLICATION_HASH%";
import versionData from "./version.json";

export const getApplicationVersion = () => {
  let v = versionData.version;
  if (versionData.triggered === "live") {
    return "v" + v;
  } else if (versionData.triggered) {
    return versionData.triggered + " v" + v + "++ (#" + versionData.md5.substring(0, 4) + ")";
  } else {
    return "v" + v + "++ (dev-hot-reload)";
  }
};
