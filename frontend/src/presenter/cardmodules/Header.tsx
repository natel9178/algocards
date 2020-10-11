import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Icon from "../Icon";
import BookIcon from "@material-ui/icons/Book";
import TranslateIcon from "@material-ui/icons/Translate";

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

interface HeaderProps {
  title?: string;
  description?: string;
  type?: string;
  version?: string;
  license?: string;
}
export default function Header(props: HeaderProps) {
  const { title, description, type, version, license } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={10}>
      <Grid item xs={8} className={classes.leftTitle}>
        <Typography style={{ fontWeight: "bold" }} variant={"h3"}>
          <a
            style={{ color: "black", textDecoration: "none" }}
            href={"google.com"}
          >
            {title}
          </a>
        </Typography>
        <Typography variant={"body1"}>{description}</Typography>
      </Grid>
      {/* <Grid item xs={4} className={classes.rightTitle}>
        {type && (
          <Icon
            icon={<TranslateIcon fontSize={"large"} />}
            title={type}
            label={""}
          />
        )}
        {version && (
          <>
            {type && (
              <Divider
                variant={"middle"}
                orientation={"vertical"}
                light
                flexItem
              />
            )}
            <Icon
              icon={<BookIcon fontSize={"large"} />}
              title={version}
              label={""}
            />
          </>
        )}

        {license && (
          <>
            {(version || type) && (
              <Divider
                variant={"middle"}
                orientation={"vertical"}
                light
                flexItem
              />
            )}
            <Icon
              icon={
                <Typography variant={"h5"} style={{ fontWeight: "bolder" }}>
                  {license}
                </Typography>
              }
              title={"License"}
              label={""}
            />
          </>
        )}
      </Grid> */}
    </Grid>
  );
}
