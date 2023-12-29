import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
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
  useTheme,
  darken,
  ListSubheader,
  Grid,
} from "@mui/material";
import {
  MenuRounded,
  WidgetsRounded,
  ImageRounded,
  SaveRounded,
  HubRounded,
  SettingsSuggestRounded,
} from "@mui/icons-material";
import { AppRoutes, version } from "src/config";
import { useRouter } from "src/hooks/useRouter";
import DockerIcon from "src/assets/DockerIcon";
import LoginButton from "./LoginButton";
import { IMenuItem } from "src/types";
import { useIsMobile } from "src/hooks";

const DRAWER_WIDTH = 230;

const MENU_ITEMS_FIRST: IMenuItem[] = [
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

const MENU_ITEMS_SECOND: IMenuItem[] = [
  {
    text: "System Info",
    icon: <SettingsSuggestRounded />,
    to: AppRoutes.System,
  },
];

interface CustomListProps {
  items: IMenuItem[];
  subheader: string;
}

const CustomList = ({ items, subheader }: CustomListProps) => {
  const { handleGoTo, getRoute } = useRouter();
  const theme = useTheme();
  const isSelected = (path: string) => getRoute() === path;
  const backgroundColor = darken(theme.palette.background.default, 0.08);

  return (
    <List
      subheader={
        <ListSubheader>
          <Box py={1.5}>
            <Typography variant="subtitle2">{subheader}</Typography>
          </Box>
        </ListSubheader>
      }
    >
      {items.map((item) => (
        <ListItem
          key={item.text}
          disablePadding
          selected={isSelected(item.to)}
          sx={{
            height: "45px",
            "&.Mui-selected": {
              // color: theme.palette.primary.main,
              backgroundColor,
              borderRadius: 5,
            },
            "&:hover": {
              backgroundColor,
              borderRadius: 5,
            },
            "&.Mui-selected:hover": {
              backgroundColor,
              borderRadius: 5,
            },
          }}
        >
          <ListItemButton
            onClick={() => handleGoTo(item.to)}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Box pl={1} display="flex">
              <ListItemIcon
                sx={{
                  minWidth: "40px",
                  // color: theme.palette.text.secondary,
                  color: theme.palette.secondary.light,
                  // color: isSelected(item.to)
                  //   ? lighten(theme.palette.primary.main, 0.15)
                  //   : theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
            </Box>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const CustomDrawer = () => {
  const theme = useTheme();

  return (
    <div>
      <Toolbar sx={{ backgroundColor: theme.palette.primary.main }}>
        <DockerIcon />
        <Typography variant="subtitle1" color="background.default">
          {`\xa0ddash v${version}`}
        </Typography>
      </Toolbar>
      <Box px={1}>
        <CustomList items={MENU_ITEMS_FIRST} subheader="Dashboards" />
      </Box>
      <Divider variant="middle" />
      <Box px={1}>
        <CustomList items={MENU_ITEMS_SECOND} subheader="More Options" />
      </Box>
    </div>
  );
};

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isMobile } = useIsMobile();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuRounded />
            </IconButton>
            {/* <Typography variant="subtitle1" noWrap component="div">
              {getRouteTitle()}
            </Typography> */}
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <LoginButton />
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 },
        }}
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
              width: DRAWER_WIDTH,
            },
          }}
        >
          <CustomDrawer />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          <CustomDrawer />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          height: "100%",
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        <Box sx={{ height: isMobile ? "90%" : { sm: `calc(100% - 60px)` } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
