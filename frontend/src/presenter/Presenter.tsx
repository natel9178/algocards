import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import Card from "./Card";
import BuildIcon from "@material-ui/icons/Build";
import InfoIcon from "@material-ui/icons/Info";
import { CircleIndicator } from "./ViewportScroller";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  paper: {
    borderRadius: 18,
    minHeight: 500,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: "31px 50px",
    width: "100%",
  },
  sidebar: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Presenter() {
  const classes = useStyles();
  return (
    <>
      <Grid container wrap="nowrap" className={classes.root}>
        <Grid item xs={1} className={classes.sidebar}>
          <Box my={2} />
          <InfoIcon />
          <Box my={2} />
          <BuildIcon />
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Card />
          </Paper>
        </Grid>
        <Grid item xs={1} className={classes.sidebar}></Grid>
      </Grid>
    </>
  );
}
