import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Spec } from "../spec/spec";
import { useLocalStorage } from "../utils/LocalStorage";
import { useDebounce } from "../utils/useDebounce";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  multilineTextField: {
    width: "100%",
  },
  input: {
    fontSize: 50,
    lineHeight: 1.3,
    fontFamily: "Roboto",
    "&::placeholder": {
      opacity: 0.15,
    },
  },
}));

export default function ListEntry({
  title,
  description,
  placeholder,
  isMultiline,
  field,
  center = false,
  autocompleteOptions,
}: {
  title: string;
  description?: string;
  placeholder?: string;
  isMultiline: boolean;
  field: string;
  center?: boolean;
  autocompleteOptions?: string[];
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography style={{ fontWeight: "bold" }} variant={"h3"}>
        {title}
      </Typography>
      <Box m={1} />
      {description && (
        <Typography variant={"body1"} style={{ fontFamily: "Roboto Mono" }}>
          {description}
        </Typography>
      )}
      <Box m={2} />

    </div>
  );
}
