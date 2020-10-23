import {
  Box,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { AnimatePresence, motion } from "framer-motion";
import { useCardLocalStorage } from "../utils/useCardState";

interface ListEntryProps {
  textPlaceholder?: string;
  subtextPlaceholder: string;
  mainField: string;
  textField?: string;
  subtextField: string;
  short?: boolean;
  minWidth?: string | number;
  maxWidth?: string | number;
  center?: boolean;
}

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

const useItemStyles = makeStyles<Theme, { center?: boolean }>((theme) => ({
  paper: {
    borderRadius: 18,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(2, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    margin: theme.spacing(2),
    width: "100%",
    boxSizing: "border-box",
  },
  textField: {},
  subtextField: { flexGrow: 1, flexShrink: 1 },
  textInput: {
    fontSize: 25,
    lineHeight: 1.3,
    fontFamily: "Roboto Mono",
    fontWeight: "bold",
    textAlign: ({ center }) => (center ? "center" : "left"),
    "&::placeholder": {
      opacity: 0.15,
    },
  },
  subtextInput: {
    fontSize: 18,
    lineHeight: 1.3,
    fontFamily: "Roboto",
    textAlign: ({ center }) => (center ? "center" : "left"),
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
    const classes = useItemStyles({ center: props.center });
    return (
      <motion.div
        style={{
          flex: !props.short ? "0 0 35ch" : undefined,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
          minWidth: props.minWidth,
          maxWidth: props.maxWidth,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        layout
      >
        <Paper
          className={classes.paper}
          style={{
            minWidth: props.maxWidth
              ? props.maxWidth
              : props.short
              ? "40ch"
              : undefined,
          }}
        >
          {props.textPlaceholder && props.textField && (
            <TextField
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
                props.editFunc(
                  props.itemIndex,
                  props.textField || "",
                  e.target.value
                )
              }
              rows={1}
              placeholder={props.textPlaceholder}
            />
          )}
          <Box flexGrow={1} overflow={"auto"}>
            <TextField
              style={{ maxHeight: "100%", width: "100%" }}
              InputProps={{
                classes: {
                  input: classes.subtextInput,
                },
                disableUnderline: true,
              }}
              multiline={!props.short}
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
          </Box>
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
          flexDirection: props.short ? "column" : "row",
          flexWrap: props.short ? "wrap" : "nowrap",
          justifyContent: "flex-start",
          alignItems: props.short ? "center" : "stretch",
          position: "relative",
          padding: theme.spacing(2),
          overflow: "auto",
        }}
      >
        <AnimatePresence>
          {props.items.map((item, index) => {
            return (
              <SortableItem
                disabled={props.short}
                key={index}
                index={index}
                itemIndex={index}
                item={item}
                {...props}
              />
            );
          })}
          <SortableItem
            disabled={props.short}
            key={props.items.length}
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
  const [values, setValues] = useCardLocalStorage<Record<string, string>[]>(
    "card",
    props.mainField,
    []
  );

  const editField = (index: number, field: string, newValue: string) => {
    if (index >= values.length) {
      setValues([...values, { [field]: newValue }]);
    } else {
      if (newValue === "") {
        let foundNonemptyKey = false;
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
