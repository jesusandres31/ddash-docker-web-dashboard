import { useState } from "react";
import { Outlet } from "react-router-dom";
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
  useTheme,
} from "@mui/material";
import {
  MenuRounded,
  WidgetsRounded,
  ImageRounded,
  SaveRounded,
  HubRounded,
  SettingsSuggestRounded,
} from "@mui/icons-material";
import { AppRoutes } from "src/config";
import { useRouter } from "src/hooks/useRouter";

const drawerWidth = 210;

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
  const { handleGoTo, getRouteTitle } = useRouter();
  const { handleSignOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: theme.palette.primary.main }} />
      <Divider />
      <List>
        {menuItemsFirst.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={(e) => handleGoTo(item.to)}>
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
            <ListItemButton onClick={(e) => handleGoTo(item.to)}>
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
          boxShadow: 0,
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
            {getRouteTitle()}
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
        sx={{
          width: { sm: drawerWidth },
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

// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { useAuth } from "src/hooks";
// import {
//   Button,
//   Typography,
//   Toolbar,
//   ListItemText,
//   ListItemIcon,
//   ListItemButton,
//   ListItem,
//   List,
//   IconButton,
//   Divider,
//   CssBaseline,
//   Box,
//   styled,
//   useTheme,
//   Theme,
//   CSSObject,
// } from "@mui/material";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import {
//   MenuRounded,
//   WidgetsRounded,
//   ImageRounded,
//   SaveRounded,
//   HubRounded,
//   SettingsSuggestRounded,
//   ChevronRightRounded,
//   ChevronLeftRounded,
// } from "@mui/icons-material";
// import { AppRoutes } from "src/config";
// import { useRouter } from "src/hooks/useRouter";

// const drawerWidth = 240;

// const menuItemsFirst = [
//   {
//     text: "Containers",
//     icon: <WidgetsRounded />,
//     to: AppRoutes.Containers,
//   },
//   {
//     text: "Images",
//     icon: <ImageRounded />,
//     to: AppRoutes.Images,
//   },
//   {
//     text: "Volumes",
//     icon: <SaveRounded />,
//     to: AppRoutes.Volumes,
//   },
//   {
//     text: "Networks",
//     icon: <HubRounded />,
//     to: AppRoutes.Networks,
//   },
// ];

// const menuItemsSecond = [
//   {
//     text: "System",
//     icon: <SettingsSuggestRounded />,
//     to: AppRoutes.System,
//   },
// ];

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function Dashboard() {
//   const theme = useTheme();
//   const [open, setOpen] = useState(false);
//   const { handleGoTo, getRouteTitle } = useRouter();
//   const { handleSignOut } = useAuth();

//   const handleToggleDrawer = () => {
//     setOpen(!open);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{ top: "auto", boxShadow: 0 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleToggleDrawer}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuRounded />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             {getRouteTitle()}
//           </Typography>
//           <Button
//             variant="outlined"
//             onClick={() => {
//               handleSignOut();
//             }}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleToggleDrawer}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightRounded />
//             ) : (
//               <ChevronLeftRounded />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {menuItemsFirst.map((item) => (
//             <ListItem key={item.to} disablePadding sx={{ display: "block" }}>
//               <ListItemButton
//                 onClick={(e) => handleGoTo(item.to)}
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.text}
//                   sx={{ opacity: open ? 1 : 0 }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {menuItemsSecond.map((item) => (
//             <ListItem key={item.to} disablePadding sx={{ display: "block" }}>
//               <ListItemButton
//                 onClick={(e) => handleGoTo(item.to)}
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.text}
//                   sx={{ opacity: open ? 1 : 0 }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />

//         {/* route render */}
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }
