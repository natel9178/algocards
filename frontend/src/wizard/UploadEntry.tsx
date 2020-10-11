import {
  Box,
  IconButton,
  makeStyles,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../utils/LocalStorage";
import { Alert, Autocomplete } from "@material-ui/lab";
import { useCardLocalStorage } from "../utils/useCardState";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles<Theme>(() => ({
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
  dropzone: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  filesContainer: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 20,
    overflow: "auto",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: 40,
  },
}));

export default function UploadEntry({
  title,
  description,
  field,
}: {
  title: string;
  description?: string;
  field: string;
}) {
  const classes = useStyles();
  const [files, setFiles] = useCardLocalStorage<string[]>("card", field, []);
  const [snackOpen, setSnackOpen] = React.useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize: 1000000,
    noClick: true,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setFiles([...files, `${reader.result}`]);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      });
    },
    onDropRejected: () => {
      setSnackOpen(true);
    },
  });

  // {
  //   ...file,
  //   preview: URL.createObjectURL(file),
  // }
  // useEffect(
  //   () => () => {
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  return (
    <div
      className={classes.root}
      {...getRootProps({ className: classes.dropzone })}
    >
      <input
        style={{ position: "absolute", width: "100%", height: "100%" }}
        {...getInputProps()}
      />
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

      <div className={classes.filesContainer}>
        {files.length === 0 ? (
          <Typography
            style={{
              width: "100%",
              textAlign: "center",
              fontFamily: "Roboto Mono",
            }}
          >
            Drop files here to upload.
          </Typography>
        ) : (
          files.map((file, idx) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                maxWidth: "30%",
                margin: 15,
                position: "relative",
                maxHeight: "100%",
              }}
              layout
              key={idx}
            >
              <IconButton
                style={{
                  position: "absolute",
                  top: -20,
                  right: -10,
                  backgroundColor: "rgba(255,0,0,0.2)",
                }}
                aria-label="delete"
                onClick={() => {
                  setFiles(files.filter((_, i) => i !== idx));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <img
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
                src={file}
              />
            </motion.div>
          ))
        )}
      </div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="error">
          Could not upload image(s)
        </Alert>
      </Snackbar>
    </div>
  );
}
