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
    marginLeft: theme.spacing(1),
    marginTop: 3,
  },
  subBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: theme.spacing(2),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  icon: {
    margin: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(0, 0, 0, 1),
    },
  },
}));

interface IntendedUseProps {
  primaryGoal?: string | string[];
  antiGoals?: string | { description?: string }[];
}
export default function IntendedUse(props: IntendedUseProps) {
  const { primaryGoal, antiGoals } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <BuildIcon className={classes.icon} fontSize={"large"} />
      <div className={classes.subContainer}>
        <Typography style={{ lineHeight: 1 }} variant={"h4"}>
          Intended Use
        </Typography>
        {primaryGoal && (
          <>
            <Typography
              variant={"h6"}
              style={{ marginTop: 10, whiteSpace: "pre-wrap" }}
            >
              Primary Goals
            </Typography>
            <div>
              <ListOrParagraph content={primaryGoal} />
            </div>
          </>
        )}

        {antiGoals && !!antiGoals.length && (
          <>
            <Typography variant={"h6"} style={{ marginTop: 10 }}>
              Out of Scope
            </Typography>
            <div>
              <ListOrParagraph
                content={
                  typeof antiGoals === "string"
                    ? antiGoals
                    : antiGoals
                        .map((antigoal) => antigoal.description || "")
                        .filter((text) => text !== "")
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
