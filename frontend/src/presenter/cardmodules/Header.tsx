import {
  Chip,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import LinkIcon from "@material-ui/icons/Link";
import BuildIcon from "@material-ui/icons/Build";
import GavelIcon from "@material-ui/icons/Gavel";
import CategoryIcon from "@material-ui/icons/Category";
import { useHistory } from "react-router-dom";
import Definer from "../definer/Definer";

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const history = useHistory();
  return (
    <Grid container spacing={1}>
      <Grid item sm={7} xs={12} className={classes.leftTitle}>
        <Typography style={{ fontWeight: "bold" }} variant={"h3"}>
          <a
            style={{ color: "black", textDecoration: "none" }}
            href={"google.com"}
          >
            {title}
          </a>
        </Typography>
        <Typography variant={"body1"}>
          <Definer text={description || ""} />
        </Typography>
      </Grid>
      <Grid
        item
        sm={5}
        xs={12}
        className={classes.rightTitle}
        style={{ justifyContent: matches ? "flex-start" : "flex-end" }}
      >
        {type && (
          <Chip className={classes.chip} icon={<CategoryIcon />} label={type} />
        )}
        {version && (
          <Chip className={classes.chip} icon={<BuildIcon />} label={version} />
        )}
        {license && (
          <Chip className={classes.chip} icon={<GavelIcon />} label={license} />
        )}
        {supportingLinks &&
          !!supportingLinks.length &&
          supportingLinks[0].link && (
            <Chip
              className={classes.chip}
              clickable
              icon={<LinkIcon />}
              label={"Link"}
              onClick={() => {
                window.open(supportingLinks[0].link!);
              }}
            />
          )}
      </Grid>
    </Grid>
  );
}
