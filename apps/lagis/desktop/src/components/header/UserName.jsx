import { Drawer, Tooltip, Avatar, Switch } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSyncLandparcel, setSyncLandparcel } from "../../store/slices/ui";
import Settings from "../commons/Settings";
const UserName = ({ name = "User" }) => {
  const dispatch = useDispatch();
  const syncLandparcel = useSelector(getSyncLandparcel);
  const firstLetter = name.charAt(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="hidden md:block">
      <Tooltip title="Einstellungen" placement="bottom">
        <Avatar
          size="small"
          style={{
            background: "#4ABC96",
          }}
          className="cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="uppercase" style={{ fontSize: "12px" }}>
            {firstLetter}
          </span>
        </Avatar>
      </Tooltip>
      <Drawer
        title="Einstellungen"
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="small"
      >
        <Settings />
      </Drawer>
    </div>
  );
};

export default UserName;
