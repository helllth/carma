import {
  DollarOutlined,
  FolderOpenOutlined,
  FileSearchOutlined,
  DashboardOutlined,
  SettingOutlined,
  PieChartOutlined,
  HistoryOutlined,
  TransactionOutlined,
  FilePdfOutlined,
  MenuOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Menu } from "antd";
import "./menu.css";
import Logo from "../ui/logo/Logo";
import { useEffect } from "react";
import { buildUrlParams } from "../../core/tools/helper";
import { useSelector } from "react-redux";
import {
  getMipa,
  getOffices,
  getRebe,
  getCountOfUsage,
  getContract,
  getTransaction,
  getDms,
  getAdditionalRollen,
  getStreetFronts,
  getHistory,
} from "../../store/slices/lagis";
import { useLocation, NavLink } from "react-router-dom";
import { defaultLinksColor } from "../../core/tools/helper";
import SearchLandparcelByFileNumber from "../searcher/SearchLandparcelByFileNumber";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const SidebarMenu = ({ parametersForLink }) => {
  const mipa = useSelector(getMipa);
  const offices = useSelector(getOffices);
  const rebe = useSelector(getRebe);
  const usage = useSelector(getCountOfUsage);
  const contracts = useSelector(getContract);
  const transaction = useSelector(getTransaction);
  const dms = useSelector(getDms);
  const additionalRoll = useSelector(getAdditionalRollen);
  const streetFronts = useSelector(getStreetFronts);
  const history = useSelector(getHistory);
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("/");
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const storyWidth = 256;
  const isStory = false;
  const storyStyle = {
    width: isStory ? storyWidth : "100%",
    height: isStory ? "600px" : "100%",
  };
  const items = [
    getItem(
      <NavLink to={`/?${buildUrlParams(parametersForLink)}`}>
        Übersicht
      </NavLink>,
      "/",
      <DashboardOutlined />
    ),
    getItem(
      offices.length > 0 ||
        additionalRoll.length > 0 ||
        streetFronts.length > 0 ? (
        <NavLink
          to={`/verwaltungsbereiche?${buildUrlParams(parametersForLink)}`}
        >
          Verwaltungsbereiche
        </NavLink>
      ) : (
        <span style={{ color: defaultLinksColor }}>Verwaltungsbereiche</span>
      ),
      "/verwaltungsbereiche",
      <FolderOpenOutlined
        style={{
          color:
            offices.length > 0 ||
            additionalRoll.length > 0 ||
            streetFronts.length > 0
              ? null
              : defaultLinksColor,
        }}
      />
    ),
    getItem(
      mipa && mipa.length > 0 ? (
        <NavLink to={`/miet?${buildUrlParams(parametersForLink)}`}>
          Miet- und Pachtverträge
        </NavLink>
      ) : (
        <span style={{ color: defaultLinksColor }}>
          Miet- und Pachtverträge
        </span>
      ),
      "/miet",
      <DollarOutlined
        style={{
          color: mipa && mipa.length > 0 ? null : defaultLinksColor,
        }}
      />
    ),
    getItem(
      rebe && rebe.length > 0 ? (
        <NavLink to={`/rechte?${buildUrlParams(parametersForLink)}`}>
          Rechte und Belastungen
        </NavLink>
      ) : (
        <span style={{ color: defaultLinksColor }}>Rechte und Belastungen</span>
      ),
      "/rechte",
      <SettingOutlined
        style={{
          color: rebe && rebe.length > 0 ? null : defaultLinksColor,
        }}
      />
    ),
    getItem(
      usage && usage > 0 ? (
        <NavLink to={`/nutzung?${buildUrlParams(parametersForLink)}`}>
          Nutzung
        </NavLink>
      ) : (
        <span style={{ color: defaultLinksColor }}>Nutzung</span>
      ),
      "/nutzung",
      <PieChartOutlined
        style={{
          color: usage && usage > 0 ? null : defaultLinksColor,
        }}
      />
    ),
    getItem(
      contracts && contracts.length > 0 ? (
        <NavLink to={`/vorgange?${buildUrlParams(parametersForLink)}`}>
          Vorgänge
        </NavLink>
      ) : (
        <span style={{ color: defaultLinksColor }}>Vorgänge </span>
      ),
      "/vorgange",
      <AuditOutlined
        style={{
          color: contracts && contracts.length > 0 ? null : defaultLinksColor,
        }}
      />
    ),
    getItem(
      history !== undefined ? (
        <NavLink to={`/historie?${buildUrlParams(parametersForLink)}`}>
          Historie
        </NavLink>
      ) : (
        <span style={{ color: defaultLinksColor }}>Historie</span>
      ),
      "/historie",
      <HistoryOutlined
        style={{
          color: history === undefined && defaultLinksColor,
        }}
      />
    ),
    getItem(
      transaction && transaction.length > 0 ? (
        <NavLink to={`/kassenzeichen?${buildUrlParams(parametersForLink)}`}>
          Kassenzeichen
        </NavLink>
      ) : (
        <span style={{ color: defaultLinksColor }}>Kassenzeichen</span>
      ),
      "/kassenzeichen",
      <TransactionOutlined
        style={{
          color:
            transaction && transaction.length > 0 ? null : defaultLinksColor,
        }}
      />
    ),
    getItem(
      dms && dms.length > 0 ? (
        <NavLink to={`/dms?${buildUrlParams(parametersForLink)}`}>DMS</NavLink>
      ) : (
        <span style={{ color: defaultLinksColor }}>DMS</span>
      ),
      "/dms",
      <FilePdfOutlined
        style={{
          color: dms && dms.length > 0 ? null : defaultLinksColor,
        }}
      />
    ),
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="bg-white flex flex-col gap-4 overflow-clip"
      style={{
        ...storyStyle,
      }}
    >
      <div
        className="flex flex-wrap items-start gap-2 h-[calc(6%-36px)]"
        style={{
          justifyContent: !collapsed ? "start" : "center",
          marginLeft: !collapsed ? "20px" : "0px",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      >
        <span onClick={toggleCollapsed} className="cursor-pointer">
          <MenuOutlined style={{ textAlign: "left" }} />
        </span>
        <Logo showText={collapsed} />
      </div>

      <div className="side-menu lg:ml-[-5px] overflow-y-auto overflow-x-hidden">
        <Menu
          style={{ border: 0, width: !collapsed ? "230px" : "81px" }}
          defaultSelectedKeys={activeKey}
          selectedKeys={[activeKey]}
          items={items}
          mode="inline"
          inlineCollapsed={collapsed}
        />
      </div>
      <SearchLandparcelByFileNumber
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
    </div>
  );
};
export default SidebarMenu;
