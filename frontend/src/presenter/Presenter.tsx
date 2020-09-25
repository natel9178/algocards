import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  paper: {
    borderRadius: 18,
    height: 500,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    flexGrow: 1,
    padding: "31px 50px",
  },
  sidebar: {
    width: 40 * 3,
  },
}));

export default function Presenter() {
  const classes = useStyles();
  return (
    <Grid container wrap="nowrap">
      <div className={classes.root}>
        <div className={classes.sidebar}></div>
        <Paper className={classes.paper}>
          <Card />
        </Paper>
        <div className={classes.sidebar}></div>
      </div>
    </Grid>
  );
}
