import {
  Box,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Spec } from "../spec/spec";
import { useLocalStorage } from "../utils/LocalStorage";
import { useDebounce } from "../utils/useDebounce";
import { Autocomplete } from "@material-ui/lab";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { AnimatePresence, motion } from "framer-motion";

interface ListEntryProps {
  textPlaceholder: string;
  subtextPlaceholder: string;
  mainField: string;
  textField: string;
  subtextField: string;
}

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

const useItemStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 18,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(2, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    margin: theme.spacing(2),
  },
  textField: {},
  subtextField: { flexGrow: 1 },
  textInput: {
    fontSize: 25,
    lineHeight: 1.3,
    fontFamily: "Roboto Mono",
    fontWeight: "bold",
    "&::placeholder": {
      opacity: 0.15,
    },
  },
  subtextInput: {
    fontSize: 18,
    lineHeight: 1.3,
    fontFamily: "Roboto",
    "&::placeholder": {
      opacity: 0.15,
    },
  },
}));

const SortableItem = SortableElement(
  (
    props: ListEntryProps & {
      item: Record<string, string>;
      itemIndex: number;
      editFunc: (index: number, field: string, newValue: string) => void;
    }
  ) => {
    const classes = useItemStyles();
    return (
      <motion.div
        style={{
          flex: "0 0 30%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Paper className={classes.paper}>
          <TextField
            autoFocus
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.textInput,
              },
              disableUnderline: true,
            }}
            multiline={false}
            value={props.item[props.textField] || ""}
            onChange={(e) =>
              props.editFunc(props.itemIndex, props.textField, e.target.value)
            }
            rows={1}
            placeholder={props.textPlaceholder}
          />
          <TextField
            autoFocus
            className={classes.subtextField}
            InputProps={{
              classes: {
                input: classes.subtextInput,
              },
              disableUnderline: true,
            }}
            multiline={true}
            value={props.item[props.subtextField] || ""}
            onChange={(e) =>
              props.editFunc(
                props.itemIndex,
                props.subtextField,
                e.target.value
              )
            }
            placeholder={props.subtextPlaceholder}
          />
        </Paper>
      </motion.div>
    );
  }
);

const SortableList = SortableContainer(
  (
    props: ListEntryProps & {
      items: Record<string, string>[];
      editFunc: (index: number, field: string, newValue: string) => void;
    }
  ) => {
    const theme = useTheme();
    return (
      <div
        style={{
          flex: "1 1 100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "stretch",
          position: "relative",
          padding: theme.spacing(2),
          overflow: "auto",
        }}
      >
        <AnimatePresence>
          {props.items.map((item, index) => {
            return (
              <SortableItem
                key={index}
                index={index}
                itemIndex={index}
                item={item}
                {...props}
              />
            );
          })}
          <SortableItem
            index={props.items.length}
            itemIndex={props.items.length}
            item={{}}
            {...props}
          />
        </AnimatePresence>
      </div>
    );
  }
);

export default function ListEntry(
  props: ListEntryProps & {
    title: string;
    description?: string;
  }
) {
  const classes = useStyles();
  const [storedValue, setStoredValue] = useLocalStorage(props.mainField);
  const [values, setValues] = useState<Record<string, string>[]>(
    storedValue || []
  );
  const debouncedValue = useDebounce(values, 500);

  const editField = (index: number, field: string, newValue: string) => {
    if (index >= values.length) {
      setValues([...values, { [field]: newValue }]);
    } else {
      if (newValue === "") {
        let foundNonemptyKey = false;
        console.log(values[index]);
        for (let key in values[index]) {
          if (key === field) continue;
          if (values[index][key] !== "") {
            foundNonemptyKey = true;
            break;
          }
        }

        if (!foundNonemptyKey) {
          setValues(values.filter((_, idx) => idx !== index));
          return;
        }
      }

      setValues(
        values.map((item: any, j: number) => {
          if (j === index) {
            return { ...item, [field]: newValue };
          } else {
            return item;
          }
        })
      );
    }
  };

  useEffect(() => {
    setStoredValue(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={classes.root}>
      <Typography style={{ fontWeight: "bold" }} variant={"h3"}>
        {props.title}
      </Typography>
      <Box m={1} />
      {props.description && (
        <Typography variant={"body1"} style={{ fontFamily: "Roboto Mono" }}>
          {props.description}
        </Typography>
      )}
      <Box m={2} />
      <SortableList
        {...props}
        axis={"x"}
        onSortEnd={({ oldIndex, newIndex }) => {
          setValues(arrayMove(values, oldIndex, newIndex));
        }}
        editFunc={editField}
        items={values}
      />
    </div>
  );
}
