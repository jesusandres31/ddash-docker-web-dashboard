import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks";
import {
  Button,
  Typography,
  Toolbar,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Drawer,
  Divider,
  CssBaseline,
  Box,
  AppBar,
} from "@mui/material";
import {
  MenuRounded,
  WidgetsRounded,
  ImageRounded,
  SaveRounded,
  HubRounded,
  SettingsSuggestRounded,
} from "@mui/icons-material";
import { getToolbarHeader } from "src/utils";
import { AppRoutes } from "src/config";

const drawerWidth = 240;

const menuItemsFirst = [
  {
    text: "Containers",
    icon: <WidgetsRounded />,
    to: AppRoutes.Containers,
  },
  {
    text: "Images",
    icon: <ImageRounded />,
    to: AppRoutes.Images,
  },
  {
    text: "Volumes",
    icon: <SaveRounded />,
    to: AppRoutes.Volumes,
  },
  {
    text: "Networks",
    icon: <HubRounded />,
    to: AppRoutes.Networks,
  },
];

const menuItemsSecond = [
  {
    text: "System",
    icon: <SettingsSuggestRounded />,
    to: AppRoutes.System,
  },
];

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSignOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (to: string) => {
    navigate(to);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItemsFirst.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={(e) => handleClick(item.to)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItemsSecond.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={(e) => handleClick(item.to)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuRounded />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {getToolbarHeader(location.pathname)}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              handleSignOut();
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
