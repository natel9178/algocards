import { Box, Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { Spec } from "../spec/spec";
import { AnimatePresence, motion } from "framer-motion";
import InfoBar from "./cardmodules/InfoBar";
import Authors from "./cardmodules/Authors";
import Header from "./cardmodules/Header";
import IntendedUse from "./cardmodules/IntendedUse";
import Limitations from "./cardmodules/Limitations";
import Performance from "./cardmodules/Performance";
import { card } from "../utils/useCardState";
import { useRecoilState } from "recoil";
import StakeholderImpacts from "./cardmodules/StakeholderImpacts";
import EthicalConsiderations from "./cardmodules/EthicalConsiderations";

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

export const SAMPLE_SPEC = {
  // title: "AI Object Detection", // done
  // supportingLinks: [
  //   "https://arxiv.org/abs/2005.14165",
  //   "https://github.com/openai/gpt-3/blob/master/175b_samples.jsonl",
  // ],
  // description: lorem.generateSentences(1), // done
  // authors: Array.apply(null, Array(3)).map(() => ({
  //   name: "Nate Lee",
  //   contact: "natelee@stanford.edu",
  // })),
  // license: "MIT", // done
  // version: "Yolov4",
  // type: "Language Model",
  // intendedUse: {
  //   // done
  //   primaryUsecase:
  //     "The intended direct users of GPT-3 are developers who access its capabilities via the OpenAI API. Through the OpenAI API, the model can be used by those who may not have AI development experience to build and explore language modeling systems across a wide range of functions. We also anticipate that the model will continue to be used by researchers to better understand the behaviors, capabilities, biases, and constraints of large-scale language models. \n Given GPT-3’s limitations (described below), and the breadth and open-ended nature of GPT-3’s capabilities, we currently only support controlled access to and use of the model via the OpenAI API. Access and use are subject to OpenAI’s access approval process, API Usage Guidelines, and API Terms of Use, which are designed to prohibit the use of the API in a way that causes societal harm.\nWe review all use cases prior to onboarding to the API, review them again before customers move into production, and have systems in place to revoke access if necessary after moving to production. Additionally, we provide guidance to users on some of the potential safety risks they should attend to and related mitigations.", // done
  //   antiGoals: Array.apply(null, Array(getRandomInt(1, 3))).map(() =>
  //     lorem.generateSentences(1)
  //   ), // done
  // },
  // input: Array.apply(null, Array(getRandomInt(1, 3))).map(() =>
  //   lorem.generateWords(2)
  // ), // done
  // output: Array.apply(null, Array(getRandomInt(1, 3))).map(() =>
  //   lorem.generateWords(2)
  // ), // done
  // architectureDescription: lorem.generateSentences(1), // done
  // ethicalConsiderations: Array.apply(null, Array(getRandomInt(1, 3))).map(() =>
  //   lorem.generateSentences(1)
  // ),
  // limitations: [
  //   // done
  //   {
  //     type: "Repetition",
  //     description: lorem.generateSentences(2),
  //     workarounds: ["Input a correctly oriented image when using this model"],
  //   },
  //   {
  //     type: "Lack of world grounding",
  //     description:
  //       "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
  //   },
  //   {
  //     type: "Predominantly English",
  //     description: lorem.generateSentences(2),
  //   },
  //   {
  //     type: "Interpretability & predictability",
  //     description: lorem.generateSentences(2),
  //   },
  //   {
  //     type: "Biases",
  //     description: lorem.generateSentences(4),
  //   },
  // ],
  // datasetPerformance: [
  //   {
  //     datasetName: "Open Images subset",
  //     description:
  //       "Annotations for demographic variables were made by humans and used purely for testing; the model cannot detect them.",
  //     link: "http://google.com",
  //     performanceMetrics: [
  //       {
  //         name: "PR-AUC",
  //         value: 0.84,
  //       },
  //       {
  //         name: "PR-AUC-Gender",
  //         value: 0.94,
  //       },
  //     ],
  //     performanceGraphs: [
  //       {
  //         name: "Gender vs. Accuracy",
  //         resourceLink:
  //           "data:image/png;base64,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",
  //       },
  //     ],
  //   },
  //   {
  //     datasetName: "Face Detection Dataset and Benchmark",
  //     description: lorem.generateSentences(2),
  //     link: "http://google.com",
  //     performanceMetrics: [
  //       {
  //         name: "PR-AUC",
  //         value: 0.92,
  //       },
  //       {
  //         name: "PR-AUC-Gender",
  //         value: 0.94,
  //       },
  //     ],
  //   },
  //   {
  //     datasetName: "Labeled Faces in the Wild",
  //     description: lorem.generateSentences(2),
  //     link: "http://google.com",
  //     performanceMetrics: [
  //       {
  //         name: "PR-AUC",
  //         value: 0.94,
  //       },
  //       {
  //         name: "PR-AUC-Gender",
  //         value: 0.94,
  //       },
  //     ],
  //   },
  // ],
};

export default function Card({
  defaultSpec,
  fromRecoil,
  preview,
}: {
  defaultSpec?: Spec;
  fromRecoil?: boolean;
  preview?: boolean;
}) {
  const theme = useTheme();
  const classes = useStyles();

  const [recoilSpec] = useRecoilState<Spec>(card);
  let spec = defaultSpec || {};
  if (fromRecoil) {
    spec = recoilSpec;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classes.root}
      >
        {preview && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            border="1px solid rgba(0,0,0,0.1)"
            borderRadius={10}
            mb={3}
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            <Typography
              variant="body1"
              style={{
                fontFamily: "Roboto Mono",
                color: "white",
                margin: theme.spacing(1),
              }}
            >
              You are viewing a preview
            </Typography>
          </Box>
        )}
        <Header {...spec} title={spec.title} />
        <div style={{ width: "100%" }}>
          <Grid container spacing={10}>
            <Grid item xs={8}>
              <Grid container spacing={3}>
                {((spec.primaryUsecase && !!spec.primaryUsecase.length) ||
                  (spec.antiGoals && !!spec.antiGoals.length)) && (
                  <Grid item xs={12} className={classes.subBox}>
                    <IntendedUse
                      primaryUsecase={spec.primaryUsecase}
                      antiGoals={spec.antiGoals}
                    />
                  </Grid>
                )}

                {spec.stakeholderImpacts && !!spec.stakeholderImpacts.length && (
                  <Grid item xs={12} className={classes.subBox}>
                    <StakeholderImpacts
                      stakeholderImpacts={spec.stakeholderImpacts}
                    />
                  </Grid>
                )}

                {spec.limitations && !!spec.limitations.length && (
                  <Grid item xs={12} className={classes.subBox}>
                    <Limitations limitations={spec.limitations} />
                  </Grid>
                )}

                {spec.ethicalConsiderations &&
                  !!spec.ethicalConsiderations.length && (
                    <Grid item xs={12} className={classes.subBox}>
                      <EthicalConsiderations
                        ethicalConsiderations={spec.ethicalConsiderations}
                      />
                    </Grid>
                  )}

                {(spec.figures ||
                  spec.datasets ||
                  spec.performanceMetrics ||
                  spec.performanceOverview) && (
                  <Grid item xs={12} className={classes.subBox}>
                    <Performance
                      figures={spec.figures}
                      datasets={spec.datasets}
                      performanceMetrics={spec.performanceMetrics}
                      performanceOverview={spec.performanceOverview}
                    />
                  </Grid>
                )}
                {spec.authors && !!spec.authors.length && (
                  <Grid item xs={12} className={classes.subBox}>
                    <Authors authors={spec.authors} />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                flexDirection: "column",
              }}
            >
              <InfoBar {...spec} />
            </Grid>
          </Grid>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
