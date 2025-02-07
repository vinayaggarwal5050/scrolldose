import { useState } from "react";
import { Box, IconButton, InputBase, Menu, MenuItem, Typography } from "@mui/material";
import { Search as SearchIcon, AccountCircle } from "@mui/icons-material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useCPData } from "../global-states/CPProvider";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { cpData, setCpData } = useCPData();

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "82vw",
        height: "60px",
        border: '1px solid lightgray',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        paddingRight: "16px"
      }}
    >
      {/* Search Bar */}
      <div style={{ display: "flex", alignItems: "center", background: "#fff", padding: "4px 8px", borderRadius: "4px" }}>
        <SearchIcon />
        <InputBase placeholder="Search…" sx={{ ml: 1 }} />
      </div>

      {/* Chat Icon */}
      <IconButton color="inherit" sx={{ mr: 1 }} onClick={() => console.log(cpData)}>
        <ChatBubbleOutlineIcon />
      </IconButton>

      {/* Notification Icon */}
      <IconButton color="inherit" sx={{ mr: 1 }}>
        <NotificationsNoneIcon />
      </IconButton>

      {/* Profile Icon (Opens Dropdown) */}
      <IconButton color="inherit" sx={{ mr: 1 }} onClick={handleMenuOpen}>
        <AccountCircle />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ padding: "10px 20px", minWidth: "200px" }}>
          <Typography variant="subtitle1" fontWeight="bold">{cpData.name}</Typography>
          <Typography variant="body2" color="textSecondary">{cpData.email}</Typography>
        </Box>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={() => {
          localStorage.removeItem("cpJWT");
          setCpData(null);
          window.location.href = "/signin";
        }}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
