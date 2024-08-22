const APPVERSION = "%APPLICATION_VERSION%";
const APPHASH = "#%APPLICATION_HASH%";
import versionData from "./version.json";

export const getApplicationVersion = () => {
  /*eslint-disable no-useless-concat*/
  if (APPVERSION === "%APPLICATION" + "_" + "VERSION%") {
    return versionData.version + " (dev-hot-reload)";
  } else {
    return APPVERSION;
  }
};
export const getApplicationHash = () => {
  if (APPHASH === "%APPLICATION" + "_" + "HASH%") {
    return "#dev-hot-reload";
  } else {
    return APPHASH;
  }
};
