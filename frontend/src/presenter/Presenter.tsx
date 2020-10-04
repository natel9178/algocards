import { Box, makeStyles, Paper, Drawer, AppBar, Fab } from "@material-ui/core";
import React from "react";
import Card from "./Card";
import BuildIcon from "@material-ui/icons/Build";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BarChartIcon from "@material-ui/icons/BarChart";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import AddIcon from "@material-ui/icons/Add";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  paper: {
    borderRadius: 18,
    minHeight: 500,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: "31px 50px",
    width: "100%",
    flexGrow: 1,
    margin: theme.spacing(0, 8, 0, 6),
  },
  sidebar: {
    height: "100%",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
    position: "sticky",
    alignSelf: "flex-start",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    borderWidth: 0,
    backgroundColor: "transparent",
    paddingLeft: theme.spacing(4),
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(10) + 1,
    },
  },
  drawerListItem: { borderRadius: 10 },
  title: {
    marginLeft: 40,
    marginBottom: 6,
  },
  toolbar: {
    minHeight: 30,
    padding: 0,
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    width: "92%",
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "transparent",
    color: theme.palette.text.primary,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "inherit",
    padding: "30px 40px",
    marginBottom: theme.spacing(8),
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
  },
  container: {},
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Presenter() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useViewportScroll();
  const opacityAnim = useTransform(scrollY, [0, 40], [1, 0]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <img src={"/logo.svg"} alt="Nice" width="40" />
          </Link>
          <motion.div
            style={{
              opacity: opacityAnim,
              display: "flex",
              flexGrow: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography className={classes.title} variant={"h4"}>
              Algo-Card
            </Typography>
            <Link to="/wizard">
              <Fab
                style={{
                  backgroundColor: "rgba(250,250,250,0.3)",
                  textDecoration: "none",
                }}
                variant="extended"
              >
                <AddIcon className={classes.extendedIcon} />
                Add Card
              </Fab>
            </Link>
          </motion.div>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerPaper]: true,
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          onMouseEnter={handleDrawerOpen}
          onMouseLeave={handleDrawerClose}
        >
          <Box mt={5} mb={13} ml={1}></Box>

          <List>
            <ListItem button key={"Info"} className={classes.drawerListItem}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "h6",
                  style: { fontSize: 17 },
                }}
                primary={"Info"}
              />
            </ListItem>
            <ListItem
              button
              key={"Intended Use"}
              className={classes.drawerListItem}
            >
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "h6",
                  style: { fontSize: 17 },
                }}
                primary={"Intended Use"}
              />
            </ListItem>
            <ListItem
              button
              key={"Performance"}
              className={classes.drawerListItem}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "h6",
                  style: { fontSize: 17 },
                }}
                primary={"Performance"}
              />
            </ListItem>
            <ListItem button key={"Authors"} className={classes.drawerListItem}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "h6",
                  style: { fontSize: 17 },
                }}
                primary={"Authors"}
              />
            </ListItem>
          </List>
        </Drawer>
        <Paper className={classes.paper}>
          <Card />
        </Paper>
      </div>
    </>
  );
}
