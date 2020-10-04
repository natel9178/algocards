import { Box, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../utils/LocalStorage";
import { useDebounce } from "../utils/useDebounce";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
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
  textLimit,
}: {
  title: string;
  description?: string;
  placeholder?: string;
  isMultiline: boolean;
  field: string;
  center?: boolean;
  autocompleteOptions?: string[];
  textLimit?: number;
}) {
  const classes = useStyles();
  const [storedValue, setStoredValue] = useLocalStorage(field);
  const [value, setValue] = useState(storedValue || "");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setStoredValue(debouncedValue);
  }, [debouncedValue, setStoredValue]);

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
          onChange={(e) => {
            if (!textLimit || e.target.value.length <= textLimit) {
              setValue(e.target.value);
            }
          }}
          rows={3}
          placeholder={placeholder}
        />
      )}
      {textLimit && (
        <Typography
          variant={"h5"}
          style={{ alignSelf: "flex-end", opacity: 0.5 }}
        >
          {textLimit - value.length}
        </Typography>
      )}
    </div>
  );
}
