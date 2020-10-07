import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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

interface AuthorsProps {
  authors: {
    name?: string; // added
    contact?: string; // added
  }[];
}

export default function Authors({ authors }: AuthorsProps) {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <AccountCircleIcon fontSize={"large"} />
      <div className={classes.subContainer}>
        <Typography
          style={{ fontWeight: "bold", lineHeight: 1 }}
          variant={"h4"}
        >
          Authors
        </Typography>
        <Grid container spacing={3}>
          {authors &&
            authors.map(({ name, contact }) => (
              <Grid item xs={4}>
                <div style={{ flexDirection: "column" }}>
                  <Typography variant={"h6"} style={{ marginTop: 10 }}>
                    {name}
                  </Typography>
                  <Typography variant={"body2"}>{contact}</Typography>
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}
