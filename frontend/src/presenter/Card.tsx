import { Box, Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { Spec } from "../spec/spec";
import InfoBar from "./cardmodules/InfoBar";
import Authors from "./cardmodules/Authors";
import Header from "./cardmodules/Header";
import IntendedUse from "./cardmodules/IntendedUse";
import Limitations from "./cardmodules/Limitations";
import Performance from "./cardmodules/Performance";
import StakeholderImpacts from "./cardmodules/StakeholderImpacts";
import EthicalConsiderations from "./cardmodules/EthicalConsiderations";
import { Element } from "react-scroll";

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
  fill: {
    width: "100%",
    height: "100%",
  },
}));

export const PAGE_BOOKMARK_HEADER = "PAGE_BOOKMARK_HEADER";
export const PAGE_BOOKMARK_INTENDED_USE = "PAGE_BOOKMARK_INTENDED_USE";
export const PAGE_BOOKMARK_STAKEHOLDER_IMPACTS =
  "PAGE_BOOKMARK_STAKEHOLDER_IMPACTS";
export const PAGE_BOOKMARK_LIMITATIONS = "PAGE_BOOKMARK_LIMITATIONS";
export const PAGE_BOOKMARK_ETHICAL_CONSIDERATIONS =
  "PAGE_BOOKMARK_ETHICAL_CONSIDERATIONS";
export const PAGE_BOOKMARK_PERFORMANCE = "PAGE_BOOKMARK_PERFORMANCE";
export const PAGE_BOOKMARK_AUTHORS = "PAGE_BOOKMARK_AUTHORS";

export function hasIntendedUse(spec: Spec) {
  return (
    (!!spec.primaryUsecase && !!spec.primaryUsecase.length) ||
    (!!spec.antiGoals && !!spec.antiGoals.length)
  );
}

export function hasStakeholderImpacts(spec: Spec) {
  return !!spec.stakeholderImpacts && !!spec.stakeholderImpacts.length;
}

export function hasLimitations(spec: Spec) {
  return !!spec.limitations && !!spec.limitations.length;
}

export function hasEthicalConsiderations(spec: Spec) {
  return !!spec.ethicalConsiderations && !!spec.ethicalConsiderations.length;
}

export function hasPerformance(spec: Spec) {
  return (
    !!spec.figures ||
    !!spec.datasets ||
    !!spec.performanceMetrics ||
    !!spec.performanceOverview
  );
}
export function hasAuthors(spec: Spec) {
  return !!spec.authors && !!spec.authors.length;
}

export default function Card({
  spec,
  preview,
}: {
  spec: Spec;
  preview?: boolean;
}) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
      <Element name={PAGE_BOOKMARK_HEADER}>
        <Header {...spec} title={spec.title} />
      </Element>
      <div style={{ width: "100%" }}>
        <Grid container spacing={10}>
          <Grid item xs={8}>
            <Grid container spacing={3}>
              {hasIntendedUse(spec) && (
                <Grid item xs={12} className={classes.subBox}>
                  <Element
                    className={classes.fill}
                    name={PAGE_BOOKMARK_INTENDED_USE}
                  >
                    <IntendedUse
                      primaryUsecase={spec.primaryUsecase}
                      antiGoals={spec.antiGoals}
                    />
                  </Element>
                </Grid>
              )}

              {hasStakeholderImpacts(spec) && (
                <Grid item xs={12} className={classes.subBox}>
                  <Element
                    className={classes.fill}
                    name={PAGE_BOOKMARK_STAKEHOLDER_IMPACTS}
                  >
                    <StakeholderImpacts
                      stakeholderImpacts={spec.stakeholderImpacts}
                    />
                  </Element>
                </Grid>
              )}

              {hasLimitations(spec) && (
                <Grid item xs={12} className={classes.subBox}>
                  <Element
                    className={classes.fill}
                    name={PAGE_BOOKMARK_LIMITATIONS}
                  >
                    <Limitations limitations={spec.limitations} />
                  </Element>
                </Grid>
              )}

              {hasEthicalConsiderations(spec) && (
                <Grid item xs={12} className={classes.subBox}>
                  <Element
                    className={classes.fill}
                    name={PAGE_BOOKMARK_ETHICAL_CONSIDERATIONS}
                  >
                    <EthicalConsiderations
                      ethicalConsiderations={spec.ethicalConsiderations}
                    />
                  </Element>
                </Grid>
              )}

              {hasPerformance(spec) && (
                <Grid item xs={12} className={classes.subBox}>
                  <Element
                    className={classes.fill}
                    name={PAGE_BOOKMARK_PERFORMANCE}
                  >
                    <Performance
                      figures={spec.figures}
                      datasets={spec.datasets}
                      performanceMetrics={spec.performanceMetrics}
                      performanceOverview={spec.performanceOverview}
                    />
                  </Element>
                </Grid>
              )}
              {hasAuthors(spec) && (
                <Grid item xs={12} className={classes.subBox}>
                  <Element
                    className={classes.fill}
                    name={PAGE_BOOKMARK_AUTHORS}
                  >
                    <Authors authors={spec.authors || []} />
                  </Element>
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
    </div>
  );
}
