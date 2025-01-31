import {  Box, IconButton, InputBase } from "@mui/material";
import { Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle } from "@mui/icons-material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';



export const Header = () => {

  return (

    <Box sx={{width: "82vw", height: "60px", border: '1px solid lightgray', display: 'flex', justifyContent: 'flex-end', alignItems: 'center',  backgroundColor: "#ffffff"}}>

        {/* Search Bar */}
        <div style={{ display: "flex", alignItems: "center", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>
          <SearchIcon />
          <InputBase placeholder="Search…" sx={{ ml: 1 }} />
        </div>

        {/* Notification Icon */}
        <IconButton color="inherit" sx={{mr: 1}}>
          <ChatBubbleOutlineIcon />
        </IconButton>

        {/* Notification Icon */}
        <IconButton color="inherit" sx={{mr: 1}}>
          {(false) ? <NotificationsIcon />: <NotificationsNoneIcon />}
        </IconButton>

        {/* Profile Dropdown */}
        <IconButton color="inherit" sx={{mr: 1}} onClick={() => {}}>
          <AccountCircle />
        </IconButton>



    </Box>
  )
}