import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
// import { useState } from "react";


export default function MySideBar() {

  // const [menuState, setMenuState] = useState<{[key: string]: boolean}>({});




  return (
    <Box sx={{ p: 2, border: '1px solid lightgray', width: '100%', maxWidth: 200, height: '90vh'}}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* <InboxIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
      
    </Box>

  )
}
