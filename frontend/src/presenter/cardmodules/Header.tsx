import { Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import LinkIcon from "@material-ui/icons/Link";
import BuildIcon from "@material-ui/icons/Build";
import GavelIcon from "@material-ui/icons/Gavel";
import CategoryIcon from "@material-ui/icons/Category";

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
    alignItems: "flex-start",
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "flex-end",
    alignSelf: "center",
    flexGrow: 1,
    padding: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
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
  supportingLinks?: { link?: string }[];
}
export default function Header(props: HeaderProps) {
  const { title, description, type, version, license, supportingLinks } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={10}>
      <Grid item xs={7} className={classes.leftTitle}>
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
      <Grid item xs={5} className={classes.rightTitle}>
        {type && (
          <Chip className={classes.chip} icon={<CategoryIcon />} label={type} />
        )}
        {version && (
          <Chip className={classes.chip} icon={<BuildIcon />} label={version} />
        )}
        {license && (
          <Chip className={classes.chip} icon={<GavelIcon />} label={license} />
        )}
        {supportingLinks && !!supportingLinks.length && (
          <Chip
            className={classes.chip}
            clickable
            icon={<LinkIcon />}
            label={"Homepage"}
            onClick={() => {
              console.log(supportingLinks[0]);
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
