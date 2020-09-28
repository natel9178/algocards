import React from "react";
import { AppBar, Box, Hidden, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import { Location } from "history";

const useStyles = makeStyles<Theme, { location: Location<any> }>((theme) => ({
  "@global": {
    html: {
      background: "#FAFAFA",
    },
    div: {
      display: "flex",
    },
  },
  title: {
    marginLeft: 40,
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
  },
  content: {
    flexGrow: 1,
  },
  container: {},
}));

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const classes = useStyles({ location });

  return (
    <div className={classes.root}>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <img src={"/logo.svg"} alt="Nice" width="40" />
          </Link>
          <Typography className={classes.title} variant={"h4"}>
            Algo-Card
          </Typography>
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
