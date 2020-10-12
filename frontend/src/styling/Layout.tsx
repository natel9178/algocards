import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import { motion, useTransform, useViewportScroll } from "framer-motion";

const useStyles = makeStyles<Theme, { showHeader: boolean }>((theme) => ({
  "@global": {
    html: {
      background: "#FAFAFA",
    },
  },
  title: {
    marginLeft: 40,
    marginBottom: 6,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FAFAFA",
    width: "100%",
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
    display: ({ showHeader }) => (showHeader ? "inherit" : "none"),
    marginBottom: ({ showHeader }) =>
      showHeader ? theme.spacing(8) : theme.spacing(0),
  },
  content: {
    flexGrow: 1,
  },
  container: {},
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const classes = useStyles({
    showHeader:
      location.pathname !== "/presenter" &&
      !location.pathname.startsWith("/wizard"),
  });
  const { scrollY } = useViewportScroll();
  const opacityAnim = useTransform(scrollY, [0, 40], [1, 0]);

  return (
    <div className={classes.root}>
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
          </motion.div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Box className={classes.container}>{children}</Box>
      </main>
      <footer
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          className={classes.title}
          variant={"h6"}
          style={{ fontSize: 15 }}
        >
          Made by the Algo-Cards Team. Send us feedback{" "}
          <a href={"mailto:natelee@stanford.edu"}>here</a>.
        </Typography>
      </footer>
    </div>
  );
}
