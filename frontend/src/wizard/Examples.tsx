import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SimCardIcon from "@material-ui/icons/SimCard";
import ListOrParagraph from "../presenter/ListOrParagraph";
import useFetchCard from "../presenter/useFetchCard";
import { useHistory } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Textfit } from "react-textfit";
import { Spec } from "../spec/spec";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    borderRadius: 18,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: "10px 15px",
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: 200,
    cursor: "pointer",
    flexGrow: 1,
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

interface ExamplesProps {
  examples: { titleText?: string; text: string }[];
  textStyle?: React.CSSProperties;
}

export default function Examples({ examples, textStyle }: ExamplesProps) {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [examples]);

  return (
    <motion.div className={classes.wrapper}>
      <Box mb={1} display={"flex"} flexDirection="row">
        <Typography variant={"h6"} style={{ flexGrow: 1 }}>
          Examples
        </Typography>
        <IconButton
          size="small"
          onClick={() => setCurrentIndex((currentIndex - 1) % examples.length)}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setCurrentIndex((currentIndex + 1) % examples.length)}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Paper
        className={classes.paper}
        onClick={() => setCurrentIndex((currentIndex + 1) % examples.length)}
      >
        <AnimatePresence>
          {examples[currentIndex].titleText ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography variant={"h5"} style={{ fontWeight: "bold" }}>
                <i>{examples[currentIndex].titleText}</i>
              </Typography>
              <Box m={1} />
              <Typography variant={"body2"} style={textStyle}>
                <i>{examples[currentIndex].text}</i>
              </Typography>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography style={textStyle}>
                <i>{examples[currentIndex].text}</i>
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
}
