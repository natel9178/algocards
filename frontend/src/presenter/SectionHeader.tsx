import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0px 5px",
  },
  type: {},
}));

export default function SectionHeader({}: {}) {
  const classes = useStyles();
  return <div className={classes.container}></div>;
}
