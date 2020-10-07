import React from "react";
import { makeStyles, Grid, Typography, Box, Divider } from "@material-ui/core";
import ListOrParagraph from "../ListOrParagraph";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme) => ({
  metaBarContainer: {
    flexDirection: "column",
  },
  metaBarTypography: {
    marginTop: 10,
    opacity: 0.5,
    fontSize: 12,
    fontWeight: 600,
  },
  metaBarTypographyBody: {
    whiteSpace: "pre-wrap",
    fontSize: 15,
    // fontFamily: "Lato",
    fontFamily: "Roboto Mono",
    fontWeight: "bold",
  },

  metaBarRow: {
    flexDirection: "column",
  },
}));

interface InfoBarProps {
  input?: string | string[];
  output?: string | string[];
  architectureDescription?: string;
  type?: string;
  version?: string;
  license?: string;
  supportingLinks?: string[];
}

export default function InfoBar(props: InfoBarProps) {
  const classes = useStyles();
  const {
    input,
    output,
    architectureDescription,
    type,
    version,
    license,
    supportingLinks,
  } = props;
  return (
    <div style={{ flexDirection: "column" }}>
      <Grid container>
        {input && (
          <Grid
            item
            xs={input && output ? 5 : 12}
            className={classes.metaBarRow}
          >
            <Typography variant={"h6"} className={classes.metaBarTypography}>
              Inputs
            </Typography>
            <Typography
              variant={"body2"}
              className={classes.metaBarTypographyBody}
            >
              {typeof input === "string" ? input : input.join("\n")}
            </Typography>
          </Grid>
        )}
        {input && output && (
          <Grid
            item
            xs={2}
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <ArrowForwardIosIcon style={{ opacity: 0.5 }} />
          </Grid>
        )}
        {output && (
          <Grid
            item
            xs={input && output ? 5 : 12}
            className={classes.metaBarRow}
          >
            <Typography variant={"h6"} className={classes.metaBarTypography}>
              Outputs
            </Typography>
            <Typography
              variant={"body2"}
              className={classes.metaBarTypographyBody}
            >
              {typeof output === "string" ? output : output.join("\n")}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Box m={1} />
      <Typography variant={"h6"} className={classes.metaBarTypography}>
        Example
      </Typography>
      <img
        style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
        alt={"input example"}
        src={
          "https://modelcards.withgoogle.com/assets/images/object-detection/obj-detection-model-description.png"
        }
      />
      <Box m={1} />

      {architectureDescription && (
        <>
          <Divider />
          <Grid item xs={12} className={classes.metaBarRow}>
            <Typography variant={"h6"} className={classes.metaBarTypography}>
              Architecture
            </Typography>
            <Typography
              variant={"body2"}
              className={classes.metaBarTypographyBody}
            >
              <ListOrParagraph content={architectureDescription} />
            </Typography>
          </Grid>
          <Box m={1} />
        </>
      )}

      <Divider />
      <Grid container>
        <Grid item xs={6} className={classes.metaBarRow}>
          <Typography variant={"h6"} className={classes.metaBarTypography}>
            Model Type
          </Typography>
          <Typography
            variant={"body2"}
            className={classes.metaBarTypographyBody}
          >
            {type}
          </Typography>
        </Grid>

        <Grid item xs={6} className={classes.metaBarRow}>
          <Typography variant={"h6"} className={classes.metaBarTypography}>
            Version
          </Typography>
          <Typography
            variant={"body2"}
            className={classes.metaBarTypographyBody}
          >
            {version}
          </Typography>
        </Grid>
      </Grid>
      <Box m={1} />

      <Divider />
      <Grid container>
        <Grid item xs={6} className={classes.metaBarRow}>
          <Typography variant={"h6"} className={classes.metaBarTypography}>
            License
          </Typography>
          <Typography
            variant={"body2"}
            className={classes.metaBarTypographyBody}
          >
            {license}
          </Typography>
        </Grid>
      </Grid>
      <Box m={1} />

      {/* {githubLink && (
        <>
          <Divider />
          <Grid item xs={12} className={classes.metaBarRow}>
            <Typography variant={"h6"} className={classes.metaBarTypography}>
              Github
            </Typography>
            <Box m={0.5} />
            <div style={{ flexDirection: "row", alignItems: "center" }}>
              <GitHubIcon />
              <Box mx={0.5} />
              <Typography
                variant={"body2"}
                className={classes.metaBarTypographyBody}
              >
                <ListOrParagraph content={githubLink} />
              </Typography>
            </div>
          </Grid>
          <Box m={1} />
        </>
      )} */}
      {supportingLinks && !!supportingLinks.length && (
        <>
          <Divider />
          <Grid item xs={12} className={classes.metaBarRow}>
            <Typography variant={"h6"} className={classes.metaBarTypography}>
              Supporting Resources
            </Typography>
            <Box m={0.5} />
            {supportingLinks.map((link) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-starts",
                }}
              >
                <LinkIcon />
                <Box mx={0.5} />
                <Typography
                  variant={"body2"}
                  className={classes.metaBarTypographyBody}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <ListOrParagraph content={link} />
                </Typography>
              </div>
            ))}
          </Grid>
          <Box m={1} />
        </>
      )}
    </div>
  );
}
