import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  CssBaseline,
} from "@mui/material";
import {
  Home as HomeIcon,
  Store as StoreIcon,
  VideoLibrary as VideoIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <div>
        hello
        <CssBaseline />
      </div>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home"/>
        </ListItemButton>

        {/* Store Section */}
        <ListItemButton onClick={() => toggleMenu("store")}>
          <ListItemIcon><StoreIcon /></ListItemIcon>
          <ListItemText primary="Store" />
          {openMenus["store"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus["store"]}>
          <List component="div" disablePadding>
            {["Orders", "Products", "Buyers", "Categories", "Inventory", "Commission"].map((text) => (
              <ListItemButton key={text} sx={{ pl: 4 }} component={Link} to={`/store/${text.toLowerCase()}`}>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* Videos Section */}
        <ListItemButton onClick={() => toggleMenu("videos")}>
          <ListItemIcon><VideoIcon /></ListItemIcon>
          <ListItemText primary="Videos" />
          {openMenus["videos"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus["videos"]}>
          <List component="div" disablePadding>
            {["All Videos", "Commission", "Analytics"].map((text) => (
              <ListItemButton key={text} sx={{ pl: 4 }} component={Link} to={`/videos/${text.toLowerCase()}`}>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* Settings Section */}
        <ListItemButton onClick={() => toggleMenu("settings")}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
          {openMenus["settings"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus["settings"]}>
          <List component="div" disablePadding>
            {["Account", "Profile"].map((text) => (
              <ListItemButton key={text} sx={{ pl: 4 }} component={Link} to={`/settings/${text.toLowerCase()}`}>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
