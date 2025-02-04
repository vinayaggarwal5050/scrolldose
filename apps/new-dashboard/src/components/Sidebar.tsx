import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ExpandLess, ExpandMore, Home as HomeIcon, Store as StoreIcon, VideoLibrary as VideoIcon, Settings as SettingsIcon } from "@mui/icons-material";
import Shop2Icon from '@mui/icons-material/Shop2';
import { useState } from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {

  const menuOptions: any = {
      "Orders": ["New Order", "All Orders", "Sale Analytics"],
      "Store": ["Add Product", "Add Categories", "All Products", "Categories", ],
      "Videos": ["Add Video", "All Videos", "Video Analytics"],
      "Settings": ["Store Settings", "Studio Settings", "Profile Settings", "Account Setting"]
    };

  const [menuState, setMenuState] = useState<{[key: string]: boolean}>({})

  const handleClick = (menuOption: string) => {
    setMenuState(prev => ({...prev, [menuOption]: !prev[menuOption]}))
  }


  return(
    <Box sx={{  minWidth: '200px', maxWidth: 200, border: '1px solid lightgray', backgroundColor: "#ffffff"}}>
      <Box sx={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Scroll Dose
        </Typography>
      </Box>
      <Divider />
      <Box sx={{minHeight: '85vh'}}>
        <List>
          {/* {Home} */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/cp">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{m: 1}} />

          {/* {Order} */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("Orders")}>
              <ListItemIcon><Shop2Icon /></ListItemIcon>
              <ListItemText primary="Orders" />
              {menuOptions["Orders"] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={menuState["Orders"]}>
            <List>
              {menuOptions["Orders"].map((text: any) => 
                <ListItemButton key={text} sx={{ pl: 6 }} component={Link} to={`/cp/orders/${text.toLowerCase().replace(/\s+/g, "-")}`} >
                  <ListItemText primary={text} />
                </ListItemButton>
              )}    
            </List>
          </Collapse>
          <Divider sx={{m: 1}} />


          {/* {Store} */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("Store")}>
              <ListItemIcon><StoreIcon /></ListItemIcon>
              <ListItemText primary="Store" />
              {menuOptions["Store"] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={menuState["Store"]}>
            <List>
              {menuOptions["Store"].map((text: any) => 
                <ListItemButton key={text} sx={{ pl: 6 }} component={Link} to={`/cp/store/${text.toLowerCase().replace(/\s+/g, "-")}`} >
                  <ListItemText primary={text} />
                </ListItemButton>
              )}    
            </List>
          </Collapse>
          <Divider sx={{m: 1}} />

          {/* {Videos} */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("Videos")}>
              <ListItemIcon><VideoIcon /></ListItemIcon>
              <ListItemText primary="Videos" />
              {menuOptions["Videos"] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={menuState["Videos"]}>
            <List>
              {menuOptions["Videos"].map((text: any) => 
                <ListItemButton key={text} sx={{ pl: 6 }} component={Link} to={`/cp/videos/${text.toLowerCase().replace(/\s+/g, "-")}`} >
                  <ListItemText primary={text} />
                </ListItemButton>
              )}    
            </List>
          </Collapse>
          <Divider sx={{m: 1}} />

          {/* {Settings} */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("Settings")}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
              {menuOptions["Settings"] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={menuState["Settings"]}>
            <List>
              {menuOptions["Settings"].map((text: any) => 
                <ListItemButton key={text} sx={{ pl: 6 }} component={Link} to={`/cp/settings/${text.toLowerCase().replace(/\s+/g, "-")}`} >
                  <ListItemText primary={text} />
                </ListItemButton>
              )}    
            </List>
          </Collapse>
          <Divider sx={{m: 1}} />


        </List>
      </Box>


    </Box>
  )

}

