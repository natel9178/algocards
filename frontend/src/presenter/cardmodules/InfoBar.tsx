import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Box,
  Divider,
  Chip,
} from "@material-ui/core";
import ListOrParagraph from "../ListOrParagraph";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import LinkIcon from "@material-ui/icons/Link";
import { Textfit } from "react-textfit";
import { linkSync } from "fs";
import Definer from "../definer/Definer";

const useStyles = makeStyles(() => ({
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
    lineHeight: 1.2,
  },

  metaBarRow: {
    flexDirection: "column",
  },
}));

interface InfoBarProps {
  inputs?: { name?: string }[];
  outputs?: { name?: string }[];
  architectureDescription?: string;
  type?: string;
  version?: string;
  license?: string;
  supportingLinks?: { link?: string }[];
  showcase?: string[];
}

export default function InfoBar(props: InfoBarProps) {
  const classes = useStyles();
  const {
    inputs,
    outputs,
    architectureDescription,
    type,
    version,
    license,
    supportingLinks,
    showcase,
  } = props;
  return (
    <div style={{ flexDirection: "column", width: "100%", height: "100%" }}>
      <Box display="flex">
        {inputs && (
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
          >
            <Typography variant={"h6"} className={classes.metaBarTypography}>
              Inputs
            </Typography>
            {inputs.map((i, idx) => (
              <Box key={idx} m={0.25}>
                <Chip
                  variant="outlined"
                  size="small"
                  label={
                    <Textfit
                      max={25}
                      style={{
                        whiteSpace: "normal",
                        lineHeight: 1,
                        fontSize: 13,
                      }}
                      mode="single"
                    >
                      <Definer text={i.name || ""} noHighlight />
                    </Textfit>
                  }
                />
              </Box>
            ))}
          </Box>
        )}
        {inputs && outputs && (
          <Box
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <ArrowForwardIosIcon style={{ opacity: 0.5 }} />
          </Box>
        )}
        {outputs && (
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            alignItems="flex-end"
          >
            <Typography variant={"h6"} className={classes.metaBarTypography}>
              Outputs
            </Typography>
            {outputs.map((i, idx) => (
              <Box key={idx} m={0.25}>
                <Chip
                  size="small"
                  variant="outlined"
                  label={
                    <Textfit
                      max={25}
                      style={{
                        whiteSpace: "normal",
                        lineHeight: 1,
                        fontSize: 13,
                      }}
                      mode="single"
                    >
                      <Definer text={i.name || ""} noHighlight />
                    </Textfit>
                  }
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box m={1} />
      {showcase && !!showcase.length && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="stretch"
          justifyContent="center"
          width="100%"
        >
          <Box
            flex="0 1 500px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            alignSelf="center"
          >
            <Typography variant={"h6"} className={classes.metaBarTypography}>
              Showcase
            </Typography>
            <img
              style={{
                width: "100%",
                borderRadius: 10,
                marginTop: 5,
              }}
              alt={"showcase"}
              src={showcase[0]}
            />
          </Box>
        </Box>
      )}
      <Box m={1} />

      {architectureDescription && (
        <>
          <Divider />
          <Grid item xs={12} className={classes.metaBarRow}>
            <Typography variant={"h6"} className={classes.metaBarTypography}>
              Architecture
            </Typography>
            <div className={classes.metaBarTypographyBody}>
              <ListOrParagraph content={architectureDescription} />
            </div>
          </Grid>
          <Box m={1} />
        </>
      )}

      {(type || version) && (
        <>
          <Divider />
          <Grid container>
            {type && (
              <Grid item xs={6} className={classes.metaBarRow}>
                <Typography
                  variant={"h6"}
                  className={classes.metaBarTypography}
                >
                  Model Type
                </Typography>
                <Typography
                  variant={"body2"}
                  className={classes.metaBarTypographyBody}
                >
                  {type}
                </Typography>
              </Grid>
            )}

            {version && (
              <Grid item xs={6} className={classes.metaBarRow}>
                <Typography
                  variant={"h6"}
                  className={classes.metaBarTypography}
                >
                  Version
                </Typography>
                <Typography
                  variant={"body2"}
                  className={classes.metaBarTypographyBody}
                >
                  {version}
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
      <Box m={1} />

      {license && (
        <>
          <Divider />{" "}
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
        </>
      )}
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
              Links
            </Typography>
            <Box m={0.5} />
            {supportingLinks.map((link, idx) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-starts",
                  cursor: link.link ? "pointer" : undefined,
                }}
                key={idx}
                onClick={() => window.open(link.link!)}
              >
                <LinkIcon />
                <Box mx={0.5} />
                <div
                  className={classes.metaBarTypographyBody}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {link.link?.replace("https://", "") || ""}
                </div>
              </div>
            ))}
          </Grid>
          <Box m={1} />
        </>
      )}
    </div>
  );
}
