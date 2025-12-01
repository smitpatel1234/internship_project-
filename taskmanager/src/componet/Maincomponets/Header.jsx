import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from "react-redux";
import { removeCurrentUser } from "../../features/currentUser/currentUserSlice";
import { markRead, markAllReadForUser } from "../../features/Todolist/alertSlice";

import logo from "../../resource/logonav.png";
import profile from "../../resource/prnav.png";

export default function Header() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state.currentUserStore.currentUser
  );
  const alerts = useSelector((state) => state.alertStore.alerts || []);
  const unreadCount = alerts.filter(a => a.toUserId === currentUser?.id && !a.read).length;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleNotifOpen = (e) => setAnchorEl(e.currentTarget);
  const handleNotifClose = () => setAnchorEl(null);
  const handleNotifOpenAndMark = (e) => {
    if (currentUser) dispatch(markAllReadForUser(currentUser.id));
    setAnchorEl(e.currentTarget);
  };

  const onChangeHandel = () => {
    dispatch(removeCurrentUser());
  };

  return (
    <AppBar position="static" color="default" elevation={2} className="header" sx={{bgcolor:'white',
      zIndex:1,
      

    }}>
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Avatar
            src={logo}
            alt="logo"
            variant="square"
           
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AprojectO
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right", mr: 2 }}>
          <Typography variant="subtitle1">
            {currentUser?.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {currentUser?.email}
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={handleNotifOpenAndMark} sx={{mr:1}}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleNotifClose}>
          {alerts.filter(a => a.toUserId === currentUser?.id).slice(0,10).map((a) => (
            <MenuItem key={a.id} onClick={() => { dispatch(markRead(a.id)); handleNotifClose(); }}>
              <ListItemText primary={a.message} secondary={new Date(a.createdAt).toLocaleString()} />
            </MenuItem>
          ))}
          {alerts.filter(a => a.toUserId === currentUser?.id).length === 0 && (
            <MenuItem disabled>
              <ListItemText primary={"No notifications"} />
            </MenuItem>
          )}
        </Menu>

        <Avatar
          src={profile}
          alt="profile"
        />

        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={onChangeHandel}
        >
          Logout
        </Button>

      </Toolbar>
    </AppBar>
  );
}
