import {
  Box,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useLocalStorage } from "../utils/LocalStorage";
import { Autocomplete } from "@material-ui/lab";
import { useCardLocalStorage } from "../utils/useCardState";

const useStyles = makeStyles<Theme, { smallText?: boolean }>(() => ({
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
    fontSize: (props) => (props.smallText ? 30 : 50),
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
  smallText = false,
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
  smallText?: boolean;
}) {
  const classes = useStyles({ smallText });
  const [value, setValue] = useCardLocalStorage("card", field, "");

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
          rows={smallText ? 7 : 3}
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
