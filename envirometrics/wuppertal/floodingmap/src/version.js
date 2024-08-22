const APPVERSION = "%APPLICATION_VERSION%";
const APPHASH = "#%APPLICATION_HASH%";
import versionData from "./version.json";

export const getApplicationVersion = () => {
  let v = versionData.version;
  if (versionData.triggered === "live") {
    return v;
  } else if (versionData.triggered === "dev") {
    return "dev " + v + " (" + versionData.md5.substring(0, 4) + ")";
  } else {
    return v + " (dev-hot-reload)";
  }
};
export const getApplicationHash = () => {
  if (APPHASH === "%APPLICATION" + "_" + "HASH%") {
    return "#dev-hot-reload";
  } else {
    return APPHASH;
  }
};
