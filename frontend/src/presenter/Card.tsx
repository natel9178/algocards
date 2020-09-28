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
import WarningIcon from "@material-ui/icons/Warning";
import LinkIcon from "@material-ui/icons/Link";
import { AnimatePresence, motion } from "framer-motion";

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
  githubLink: "http://google.com",
  supportingLinks: [
    "https://arxiv.org/abs/2005.14165",
    "https://github.com/openai/gpt-3/blob/master/175b_samples.jsonl",
  ],
  description: lorem.generateSentences(1), // done
  authors: Array.apply(null, Array(3)).map(() => ({
    name: "Nate Lee",
    contact: "natelee@stanford.edu",
  })),
  license: "MIT", // done
  version: "175 billion parameter model",
  type: "Language Model",

  intendedUse: {
    // done
    primaryUsecase:
      "The intended direct users of GPT-3 are developers who access its capabilities via the OpenAI API. Through the OpenAI API, the model can be used by those who may not have AI development experience to build and explore language modeling systems across a wide range of functions. We also anticipate that the model will continue to be used by researchers to better understand the behaviors, capabilities, biases, and constraints of large-scale language models. \n Given GPT-3’s limitations (described below), and the breadth and open-ended nature of GPT-3’s capabilities, we currently only support controlled access to and use of the model via the OpenAI API. Access and use are subject to OpenAI’s access approval process, API Usage Guidelines, and API Terms of Use, which are designed to prohibit the use of the API in a way that causes societal harm.\nWe review all use cases prior to onboarding to the API, review them again before customers move into production, and have systems in place to revoke access if necessary after moving to production. Additionally, we provide guidance to users on some of the potential safety risks they should attend to and related mitigations.", // done
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
      workarounds: ["Input a correctly oriented image when using this model"],
    },
    {
      type: "Lack of world grounding",
      description:
        "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classes.root}
      >
        <Grid container spacing={10}>
          <Grid item xs={8} className={classes.leftTitle}>
            <Typography style={{ fontWeight: "bold" }} variant={"h3"}>
              <a
                style={{ color: "black", textDecoration: "none" }}
                href={spec.githubLink}
              >
                {spec.title}
              </a>
            </Typography>
            <Typography variant={"body1"}>{spec.description}</Typography>
          </Grid>
          <Grid item xs={4} className={classes.rightTitle}>
            <Icon
              icon={
                <Typography variant={"h5"} style={{ fontWeight: "bolder" }}>
                  {spec.license}
                </Typography>
              }
              label={"License"}
            />
          </Grid>
        </Grid>
        <Box m={2} />
        <div style={{ width: "100%" }}>
          <Grid container spacing={10}>
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
                    <Typography
                      variant={"h6"}
                      style={{ marginTop: 10, whiteSpace: "pre-wrap" }}
                    >
                      Primary Usecases
                    </Typography>
                    <Typography variant={"body2"}>
                      <ListOrParagraph
                        content={spec.intendedUse.primaryUsecase}
                      />
                    </Typography>

                    {spec.intendedUse.antiGoals && (
                      <>
                        <Typography variant={"h6"} style={{ marginTop: 10 }}>
                          Anti-Goals
                        </Typography>
                        <Typography variant={"body2"}>
                          <ListOrParagraph
                            content={spec.intendedUse.antiGoals}
                          />
                        </Typography>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} className={classes.subBox}>
                  <WarningIcon fontSize={"large"} />
                  <div className={classes.subContainer}>
                    <Typography
                      style={{ fontWeight: "bold", lineHeight: 1 }}
                      variant={"h4"}
                    >
                      Limitations
                    </Typography>
                    <Grid container spacing={3}>
                      {spec.limitations &&
                        spec.limitations.map(
                          ({ type, description, workarounds }) => (
                            <Grid item xs={6}>
                              <div style={{ flexDirection: "column" }}>
                                <Typography
                                  variant={"h6"}
                                  style={{ marginTop: 10 }}
                                >
                                  {type}
                                </Typography>
                                <Typography variant={"body2"}>
                                  <ListOrParagraph content={description} />
                                </Typography>
                                {workarounds && (
                                  <Typography
                                    variant={"body2"}
                                    style={{ marginTop: 10 }}
                                  >
                                    <strong>Workaround: </strong>
                                    <ListOrParagraph content={workarounds} />
                                  </Typography>
                                )}
                              </div>
                            </Grid>
                          )
                        )}
                    </Grid>
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
                        <ListOrParagraph
                          content={spec.architectureDescription}
                        />
                      </Typography>
                    </Grid>
                    <Box m={1} />
                  </>
                )}

                <Divider />
                <Grid container>
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
                      {spec.type}
                    </Typography>
                  </Grid>

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
                      {spec.version}
                    </Typography>
                  </Grid>
                </Grid>
                <Box m={1} />

                <Divider />
                <Grid container>
                  <Grid item xs={6} className={classes.metaBarRow}>
                    <Typography
                      variant={"h6"}
                      className={classes.metaBarTypography}
                    >
                      License
                    </Typography>
                    <Typography
                      variant={"body2"}
                      className={classes.metaBarTypographyBody}
                    >
                      {spec.license}
                    </Typography>
                  </Grid>
                </Grid>
                <Box m={1} />

                {spec.githubLink && (
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
                      <div
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <GitHubIcon />
                        <Box mx={0.5} />
                        <Typography
                          variant={"body2"}
                          className={classes.metaBarTypographyBody}
                        >
                          <ListOrParagraph content={spec.githubLink} />
                        </Typography>
                      </div>
                    </Grid>
                    <Box m={1} />
                  </>
                )}
                {spec.supportingLinks && !!spec.supportingLinks.length && (
                  <>
                    <Divider />
                    <Grid item xs={12} className={classes.metaBarRow}>
                      <Typography
                        variant={"h6"}
                        className={classes.metaBarTypography}
                      >
                        Supporting Resources
                      </Typography>
                      <Box m={0.5} />
                      {spec.supportingLinks.map((link) => (
                        <div
                          style={{
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
            </Grid>
          </Grid>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
