import { Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Spec } from "../spec/spec";
import { LoremIpsum } from "lorem-ipsum";
import ImageIcon from "@material-ui/icons/Image";
import Icon from "./Icon";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import BuildIcon from "@material-ui/icons/Build";
import ListOrParagraph from "./ListOrParagraph";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import GitHubIcon from "@material-ui/icons/GitHub";

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
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  rightTitle: {
    flexDirection: "row",
    marginLeft: 30,
    alignItems: "center",
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
  },
  subBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: theme.spacing(2),
  },
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

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SAMPLE_SPEC = {
  title: "Yolov4 Faces", // done
  link: "http://google.com",
  description: lorem.generateSentences(1), // done
  authors: Array.apply(null, Array(3)).map(() => ({
    name: "Nate Lee",
    contact: "natelee@stanford.edu",
  })),
  license: "MIT", // done

  intendedUse: {
    // done
    primaryUsecase: Array.apply(null, Array(getRandomInt(1, 3))).map((x) =>
      lorem.generateSentences(1)
    ), // done
    subgoals: Array.apply(null, Array(getRandomInt(1, 3))).map((x) =>
      lorem.generateSentences(1)
    ), // done
    antiGoals: Array.apply(null, Array(getRandomInt(1, 3))).map((x) =>
      lorem.generateSentences(1)
    ), // done
  },
  input: Array.apply(null, Array(getRandomInt(1, 3))).map((x) =>
    lorem.generateWords(2)
  ), // done
  output: Array.apply(null, Array(getRandomInt(1, 3))).map((x) =>
    lorem.generateWords(2)
  ), // done
  architectureDescription: lorem.generateSentences(1),

  ethicalConsiderations: Array.apply(null, Array(getRandomInt(1, 3))).map((x) =>
    lorem.generateSentences(1)
  ),
  limitations: [
    {
      type: "Repetition",
      description: lorem.generateSentences(2),
    },
    {
      type: "Lack of world grounding",
      description: lorem.generateSentences(2),
    },
    {
      type: "Predominantly English",
      description: lorem.generateSentences(2),
    },
    {
      type: "Interpretability & predictability",
      description: lorem.generateSentences(2),
    },
    {
      type: "Biases",
      description: lorem.generateSentences(4),
    },
  ],
};

export default function Card({ spec = SAMPLE_SPEC }: { spec?: Spec }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div style={{ width: "100%" }}>
        <div className={classes.header} style={{ marginBottom: 20 }}>
          <div className={classes.leftTitle}>
            <Typography style={{ fontWeight: "bold" }} variant={"h3"}>
              <a
                style={{ color: "black", textDecoration: "none" }}
                href={spec.link}
              >
                {spec.title}
              </a>
            </Typography>
            <Typography variant={"body1"}>{spec.description}</Typography>
          </div>
          <div className={classes.rightTitle}>
            <Icon
              icon={
                <Typography variant={"h5"} style={{ fontWeight: "bolder" }}>
                  {spec.license}
                </Typography>
              }
              label={"License"}
            />
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.subBox}>
                <BuildIcon fontSize={"large"} />
                <div className={classes.subContainer}>
                  <Typography
                    style={{ fontWeight: "bold", lineHeight: 1 }}
                    variant={"h4"}
                  >
                    Intended Use
                  </Typography>
                  <Typography variant={"h6"} style={{ marginTop: 10 }}>
                    Primary Usecases
                  </Typography>
                  <Typography variant={"body2"}>
                    <ListOrParagraph
                      content={spec.intendedUse.primaryUsecase}
                    />
                  </Typography>
                  {spec.intendedUse.subgoals &&
                    !!spec.intendedUse.subgoals.length && (
                      <>
                        <Typography variant={"h6"} style={{ marginTop: 10 }}>
                          Goals
                        </Typography>
                        <Typography variant={"body2"}>
                          <ListOrParagraph
                            content={spec.intendedUse.subgoals}
                          />
                        </Typography>
                      </>
                    )}
                  {spec.intendedUse.antiGoals && (
                    <>
                      <Typography variant={"h6"} style={{ marginTop: 10 }}>
                        Anti-Goals
                      </Typography>
                      <Typography variant={"body2"}>
                        <ListOrParagraph content={spec.intendedUse.antiGoals} />
                      </Typography>
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.metaBarRow}>
            <div style={{ flexDirection: "column" }}>
              <Grid container>
                <Grid item xs={5} className={classes.metaBarRow}>
                  <Typography
                    variant={"h6"}
                    className={classes.metaBarTypography}
                  >
                    Inputs
                  </Typography>
                  <Typography
                    variant={"body2"}
                    className={classes.metaBarTypographyBody}
                  >
                    {typeof spec.input !== "string"
                      ? spec.input.join("\n")
                      : spec.input}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <ArrowForwardIosIcon style={{ opacity: 0.5 }} />
                </Grid>

                <Grid item xs={5} className={classes.metaBarRow}>
                  <Typography
                    variant={"h6"}
                    className={classes.metaBarTypography}
                  >
                    Outputs
                  </Typography>
                  <Typography
                    variant={"body2"}
                    className={classes.metaBarTypographyBody}
                  >
                    {typeof spec.output !== "string"
                      ? spec.output.join("\n")
                      : spec.output}
                  </Typography>
                </Grid>
              </Grid>
              <Box m={1} />

              {spec.architectureDescription && (
                <>
                  <Divider />
                  <Grid item xs={12} className={classes.metaBarRow}>
                    <Typography
                      variant={"h6"}
                      className={classes.metaBarTypography}
                    >
                      Architecture
                    </Typography>
                    <Typography
                      variant={"body2"}
                      className={classes.metaBarTypographyBody}
                    >
                      <ListOrParagraph content={spec.architectureDescription} />
                    </Typography>
                  </Grid>
                  <Box m={1} />
                </>
              )}

              {spec.link && (
                <>
                  <Divider />
                  <Grid item xs={12} className={classes.metaBarRow}>
                    <Typography
                      variant={"h6"}
                      className={classes.metaBarTypography}
                    >
                      Github
                    </Typography>
                    <Box m={0.5} />
                    <div style={{ flexDirection: "row", alignItems: "center" }}>
                      <GitHubIcon />
                      <Box mx={1} />
                      <Typography
                        variant={"body2"}
                        className={classes.metaBarTypographyBody}
                      >
                        <ListOrParagraph content={spec.link} />
                      </Typography>
                    </div>
                  </Grid>
                  <Box m={1} />
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
