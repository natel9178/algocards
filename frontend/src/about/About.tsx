import { Paper, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(10, 0),
  },
  paper: {
    width: "clamp(400px, 50%, 1000px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 18,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(10, 5),
  },
}));

export default function About(props: {}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <img src={"/logo.svg"} alt="Nice" width="70" />
        
      </Paper>
    </div>
  );
}
