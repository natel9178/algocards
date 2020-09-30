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

export default function TextEntry({
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
  const [storedValue, setStoredValue] = useLocalStorage(field);
  const [value, setValue] = useState(storedValue);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setStoredValue(debouncedValue);
  }, [debouncedValue]);

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
      {autocompleteOptions ? (
        <Autocomplete
          freeSolo
          options={autocompleteOptions}
          renderInput={(params: any) => (
            <TextField
              {...params}
              autoFocus
              margin="normal"
              placeholder={placeholder}
            />
          )}
        />
      ) : (
        <TextField
          autoFocus
          className={classes.multilineTextField}
          InputProps={{
            classes: {
              input: classes.input,
            },
            disableUnderline: true,
            style: { textAlign: center ? "center" : "left" },
          }}
          multiline={isMultiline}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
