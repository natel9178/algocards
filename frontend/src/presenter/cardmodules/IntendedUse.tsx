import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import BuildIcon from "@material-ui/icons/Build";
import ListOrParagraph from "../ListOrParagraph";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: { margin: 0, padding: 0, marginLeft: 20 },
  },
  root: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    height: "100%",
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
    marginLeft: theme.spacing(2),
    marginTop: 3,
  },
  subBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: theme.spacing(2),
  },
}));

interface IntendedUseProps {
  primaryUsecase?: string | string[];
  antiGoals?: string | string[];
}
export default function IntendedUse(props: IntendedUseProps) {
  const { primaryUsecase, antiGoals } = props;
  const classes = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <BuildIcon fontSize={"large"} />
      <div className={classes.subContainer}>
        <Typography
          style={{ fontWeight: "bold", lineHeight: 1 }}
          variant={"h4"}
        >
          Intended Use
        </Typography>
        {primaryUsecase && (
          <>
            <Typography
              variant={"h6"}
              style={{ marginTop: 10, whiteSpace: "pre-wrap" }}
            >
              Primary Usecases
            </Typography>
            <Typography variant={"body2"}>
              <ListOrParagraph content={primaryUsecase} />
            </Typography>
          </>
        )}

        {antiGoals && (
          <>
            <Typography variant={"h6"} style={{ marginTop: 10 }}>
              Anti-Goals
            </Typography>
            <Typography variant={"body2"}>
              <ListOrParagraph content={antiGoals} />
            </Typography>
          </>
        )}
      </div>
    </div>
  );
}
