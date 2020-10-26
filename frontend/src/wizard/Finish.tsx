import { Box, makeStyles, Theme, Typography, Button } from "@material-ui/core";
import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import GitHubIcon from "@material-ui/icons/GitHub";
import fileDownload from "js-file-download";
import { card } from "../utils/useCardState";
import { useRecoilState } from "recoil";
import { Spec } from "../spec/spec";

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
    fontSize: 30,
    lineHeight: 1.3,
    fontFamily: "Roboto",
    "&::placeholder": {
      opacity: 0.15,
    },
  },
}));

interface FinishProps {}

export default function Finish(props: FinishProps) {
  const classes = useStyles();
  const [recoilSpec] = useRecoilState<Spec>(card);

  return (
    <div className={classes.root}>
      <Typography style={{ fontWeight: "bold" }} variant={"h3"}>
        You've completed your card!
      </Typography>
      <Box m={1} />
      <Typography variant={"body1"} style={{ fontFamily: "Roboto Mono" }}>
        Choose your saving method.
      </Typography>
      <Box m={2} />
      <Box
        display={"flex"}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="outlined"
          size="large"
          color="primary"
          startIcon={<FileCopyIcon />}
          onClick={() => {
            fileDownload(
              JSON.stringify(recoilSpec),
              `${recoilSpec.title || "export"}-card.json`
            );
          }}
        >
          Download Algo-Card File
        </Button>
      </Box>
    </div>
  );
}
