import {
  Box,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Card as MuiCard,
  useTheme,
} from "@material-ui/core";
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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BarChartIcon from "@material-ui/icons/BarChart";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    marginTop: 3,
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
  architectureDescription: lorem.generateSentences(1), // done

  ethicalConsiderations: Array.apply(null, Array(getRandomInt(1, 3))).map((x) =>
    lorem.generateSentences(1)
  ),
  limitations: [
    // done
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
  datasetPerformance: [
    {
      datasetName: "Open Images subset",
      description:
        "Annotations for demographic variables were made by humans and used purely for testing; the model cannot detect them.",
      link: "http://google.com",

      performanceMetrics: [
        {
          name: "PR-AUC",
          value: 0.84,
        },
        {
          name: "PR-AUC-Gender",
          value: 0.94,
        },
      ],

      performanceGraphs: [
        {
          name: "Gender vs. Accuracy",
          resourceLink:
            "data:image/png;base64,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",
        },
      ],
    },
    {
      datasetName: "Face Detection Dataset and Benchmark",
      description: lorem.generateSentences(2),
      link: "http://google.com",

      performanceMetrics: [
        {
          name: "PR-AUC",
          value: 0.92,
        },
        {
          name: "PR-AUC-Gender",
          value: 0.94,
        },
      ],
    },
    {
      datasetName: "Labeled Faces in the Wild",
      description: lorem.generateSentences(2),
      link: "http://google.com",

      performanceMetrics: [
        {
          name: "PR-AUC",
          value: 0.94,
        },
        {
          name: "PR-AUC-Gender",
          value: 0.94,
        },
      ],
    },
  ],
};

export default function Card({ spec = SAMPLE_SPEC }: { spec?: Spec }) {
  const classes = useStyles();
  const theme = useTheme();
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
                      Limitations & Tradeoffs
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
                <Grid item xs={12} className={classes.subBox}>
                  <BarChartIcon fontSize={"large"} />
                  <div className={classes.subContainer}>
                    <Typography
                      style={{ fontWeight: "bold", lineHeight: 1 }}
                      variant={"h4"}
                    >
                      Dataset Performance
                    </Typography>
                    <Grid container spacing={3}>
                      {spec.datasetPerformance &&
                        spec.datasetPerformance.map((dataset) => (
                          <Grid item xs={12}>
                            <div
                              style={{ flexDirection: "column", width: "100%" }}
                            >
                              <Typography
                                variant={"h6"}
                                style={{ marginTop: 10 }}
                              >
                                {dataset.link ? (
                                  <a
                                    style={{
                                      color: "black",
                                      textDecoration: "none",
                                    }}
                                    href={dataset.link}
                                  >
                                    {dataset.datasetName}{" "}
                                    <LinkIcon fontSize={"small"} />
                                  </a>
                                ) : (
                                  <> {dataset.datasetName}</>
                                )}
                              </Typography>
                              {dataset.description && (
                                <Typography variant={"body2"}>
                                  {dataset.description}
                                </Typography>
                              )}
                              {dataset.performanceMetrics && (
                                <div style={{ width: "100%" }}>
                                  <TableContainer
                                    component={MuiCard}
                                    style={{
                                      margin: theme.spacing(1),
                                      width: "100%",
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    <Table size="small">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Metric</TableCell>
                                          <TableCell align="right">
                                            Value
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {dataset.performanceMetrics.map(
                                          (row) => (
                                            <TableRow key={row.name}>
                                              <TableCell
                                                component="th"
                                                scope="row"
                                              >
                                                {row.name}
                                              </TableCell>
                                              <TableCell align="right">
                                                {row.value}
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </div>
                              )}
                              {dataset.performanceGraphs && (
                                <Accordion
                                  style={{
                                    flexDirection: "column",
                                    margin: theme.spacing(1),
                                  }}
                                >
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                  >
                                    <Typography variant={"body2"}>
                                      Performance Graphs
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Grid
                                      container
                                      spacing={3}
                                      style={{ width: "100%" }}
                                    >
                                      {dataset.performanceGraphs.map(
                                        (graph) => (
                                          <Grid
                                            item
                                            xs={6}
                                            style={{ flexDirection: "column" }}
                                          >
                                            <img
                                              src={graph.resourceLink}
                                              style={{
                                                width: "100%",
                                                minHeight: 100,
                                                boxShadow:
                                                  "3px 3px 30px rgba(0, 0, 0, 0.05)",
                                              }}
                                              alt={`Graph of ${graph.name}`}
                                            />
                                            <Typography variant={"body2"}>
                                              <strong>{graph.name}</strong>{" "}
                                              {graph.description}
                                            </Typography>
                                          </Grid>
                                        )
                                      )}
                                    </Grid>
                                  </AccordionDetails>
                                </Accordion>
                              )}
                            </div>
                          </Grid>
                        ))}
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} className={classes.subBox}>
                  <AccountCircleIcon fontSize={"large"} />
                  <div className={classes.subContainer}>
                    <Typography
                      style={{ fontWeight: "bold", lineHeight: 1 }}
                      variant={"h4"}
                    >
                      Authors
                    </Typography>
                    <Grid container spacing={3}>
                      {spec.authors &&
                        spec.authors.map(({ name, contact }) => (
                          <Grid item xs={4}>
                            <div style={{ flexDirection: "column" }}>
                              <Typography
                                variant={"h6"}
                                style={{ marginTop: 10 }}
                              >
                                {name}
                              </Typography>
                              <Typography variant={"body2"}>
                                {contact}
                              </Typography>
                            </div>
                          </Grid>
                        ))}
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
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
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
                <Typography
                  variant={"h6"}
                  className={classes.metaBarTypography}
                >
                  Example
                </Typography>
                <img
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                  src={
                    "https://modelcards.withgoogle.com/assets/images/object-detection/obj-detection-model-description.png"
                  }
                />
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
            </Grid>
          </Grid>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
