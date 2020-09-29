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
}));

export default function TextEntry({
  title,
  description,
  isMultiline,
}: {
  title: string;
  description?: string;
  isMultiline: boolean;
}) {
  const classes = useStyles();
  const [value, setValue] = useState("");

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
      <TextField
        className={classes.multilineTextField}
        multiline={isMultiline}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        rows={6}
      />
    </div>
  );
}
