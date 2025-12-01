import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";

import ComponentHider from "../Middelware/ComponentHider";
import AccountTreeIcon from '@mui/icons-material/AccountTreeOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';import ic3 from "../../resource/ic3.png";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
export default function SideBar() {
  return (
    
      <Box className='sidebar'>
        <List>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/project/">
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="Project" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/">
              <ListItemIcon>
                <TaskOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary="Task" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/user/">
              <ListItemIcon>
              <PermContactCalendarRoundedIcon/>
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItemButton>
          </ListItem>

          <ComponentHider ComponentId={42}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard/role/">
                <ListItemIcon>
                  <SupervisedUserCircleIcon/>
                </ListItemIcon>
                <ListItemText primary="Role" />
              </ListItemButton>
            </ListItem>
          </ComponentHider>

        </List>
      </Box>
   
  );
}
