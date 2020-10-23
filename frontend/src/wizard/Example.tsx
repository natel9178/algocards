import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Chip,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SimCardIcon from "@material-ui/icons/SimCard";
import ListOrParagraph from "../presenter/ListOrParagraph";
import useFetchCard from "../presenter/useFetchCard";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Textfit } from "react-textfit";
import { Spec } from "../spec/spec";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
  },
  paper: {
    borderRadius: 18,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: "10px 15px",
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    flexDirection: "column",
    minHeight: 200,
    cursor: "pointer",
  },
  title: {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: "Roboto Mono",
    fontSize: 15,
  },
  subHeader: {
    fontFamily: "Roboto Mono",
    fontSize: 16,
  },
  text: {
    fontSize: 13,
  },
  captionText: {
    fontFamily: "Roboto Mono",
    fontWeight: "bold",
    opacity: 0.3,
    fontSize: 13,
    alignSelf: "flex-start",
  },
}));

interface ExampleProps {}

export default function Example({}: ExampleProps) {
  const classes = useStyles();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={classes.wrapper}
    >
      <Paper className={classes.paper}></Paper>
    </motion.div>
  );
}
