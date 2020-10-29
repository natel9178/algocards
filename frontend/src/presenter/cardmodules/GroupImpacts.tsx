import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ListOrParagraph from "../ListOrParagraph";
import GroupIcon from "@material-ui/icons/Group";

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

interface GroupImpactsProps {
  groupImpacts?: {
    group?: string;
    impact?: string;
  }[];
}

export default function GroupImpacts(props: GroupImpactsProps) {
  const { groupImpacts } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GroupIcon className={classes.icon} fontSize={"large"} />
      <div className={classes.subContainer}>
        <Typography style={{ lineHeight: 1 }} variant={"h4"}>
          Group Impacts
        </Typography>
        <Grid container spacing={3}>
          {groupImpacts &&
            groupImpacts.map(({ group, impact }, idx) => (
              <Grid item xs={6} key={idx}>
                <div style={{ flexDirection: "column" }}>
                  <Typography variant={"h6"} style={{ marginTop: 10 }}>
                    {group}
                  </Typography>
                  {impact && (
                    <div>
                      <ListOrParagraph content={impact} />
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
