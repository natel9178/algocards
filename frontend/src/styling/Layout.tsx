import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles<Theme, { showHeader: boolean }>((theme) => ({
  "@global": {
    html: {
      background: "#FAFAFA",
    },
  },
  title: {
    textAlign: "center",
  },
  root: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FAFAFA",
    width: "100vw",
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

  return (
    <div className={classes.root}>
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
          Made by the AI Cards Team. Send us feedback{" "}
          <a href={"mailto:natelee@stanford.edu"}>here</a>.
        </Typography>
      </footer>
    </div>
  );
}
