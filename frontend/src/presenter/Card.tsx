import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Spec } from "../spec/spec";
import { LoremIpsum } from "lorem-ipsum";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    width: "100%",
    height: "100%",
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

const SAMPLE_SPEC = {
  title: "Yolov4",
  link: "http://google.com",
  description: lorem.generateSentences(1),
  authors: [{ name: "Nate Lee", contact: "natelee@stanford.edu" }],
  license: "MIT",

  intendedUse: {
    primaryUsecase: [lorem.generateSentences(1)],
    subgoals: [lorem.generateSentences(2), lorem.generateSentences(1)],
    antiGoals: [lorem.generateSentences(1)],
  },
  input: lorem.generateWords(1),
  output: lorem.generateWords(2),
  architectureDescription: lorem.generateSentences(1),

  ethicalConsiderations: [
    lorem.generateSentences(2),
    lorem.generateSentences(1),
  ],
  limitations: [
    {
      type: "occlusion",
      description: lorem.generateSentences(2),
      // remediation
    },
  ],
  //   tradeoffs?: string[];

  //   datasets: [{

  //   }];
  //   performanceMetrics?: PerformanceMetric[];
  //   evaluationGraphs?: GraphSet[];

  //   additionalComments?: string;
  //   customDefinitions?: CustomDefinition[];
};

export default function Card({ spec = SAMPLE_SPEC }: { spec?: Spec }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={{ fontWeight: "bold" }} variant={"h2"}>
            <a href={spec.link}></a>
            {spec.title}
          </Typography>
          <Box m={1} />
          <Typography variant={"body1"}>{spec.description}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
