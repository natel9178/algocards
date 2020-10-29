import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ListOrParagraph from "../ListOrParagraph";
import WarningIcon from "@material-ui/icons/Warning";

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
  leftTitle: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  rightTitle: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-around",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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

interface LimitationsProps {
  limitations?: {
    type?: string;
    description?: string;
    workarounds?: string[];
  }[];
}

export default function Limitations(props: LimitationsProps) {
  const { limitations } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <WarningIcon className={classes.icon} fontSize={"large"} />
      <div className={classes.subContainer}>
        <Typography style={{ lineHeight: 1 }} variant={"h4"}>
          Limitations & Tradeoffs
        </Typography>
        <Grid container spacing={1}>
          {limitations &&
            limitations.map(({ type, description, workarounds }, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <div style={{ flexDirection: "column" }}>
                  <Typography variant={"h6"} style={{ marginTop: 10 }}>
                    {type}
                  </Typography>
                  {description && (
                    <div>
                      <ListOrParagraph content={description} />
                    </div>
                  )}
                  {workarounds && (
                    <div style={{ marginTop: 10 }}>
                      <strong>Workaround: </strong>
                      <ListOrParagraph content={workarounds} />
                    </div>
                  )}
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}
