import {
  Box,
  Fab,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  Grid,
  Tooltip,
  useTheme,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Wizard, Steps, Step } from "react-albus";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Element, scroller } from "react-scroll";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Card from "../presenter/Card";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useWindowDimensions } from "../utils/useWindowDimensions";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Spec } from "../spec/spec";
import { card } from "../utils/useCardState";
import { WizardSpec } from "./WizardSpec";
import AbstractCard from "../browse/AbstractCard";
import Example from "./Example";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  cardPaper: {
    borderRadius: 18,
    minHeight: 500,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: "31px 50px",
    width: "100%",
    boxSizing: "border-box",
    flexGrow: 1,
  },
  paper: {
    borderRadius: 18,
    height: "80vh",
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: "50px 0px",
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
  },
  sidebar: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nextbar: {
    width: 50,
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px 5px",
  },
  toolbar: {
    minHeight: 30,
    padding: 0,
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    width: "92%",
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "transparent",
    color: theme.palette.text.primary,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "inherit",
    padding: "30px 40px",
    marginBottom: theme.spacing(8),
  },
  title: {
    marginBottom: 6,
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function CardWizard() {
  const theme = useTheme();
  const classes = useStyles();
  const { scrollY } = useViewportScroll();
  const { height } = useWindowDimensions();

  const previewOpacity = useTransform(scrollY, [0, height * 0.7], [0, 1]);
  const previewScale = useTransform(scrollY, [0, height * 0.7], [0.9, 1]);
  const [progress, setProgress] = useState(0);
  const opacityAnim = useTransform(scrollY, [0, 40], [1, 0]);
  const [recoilCard] = useRecoilState<Spec>(card);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  return (
    <div className={classes.root}>
      <Container
        maxWidth={"xl"}
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          zIndex: 1000,
          height: 110,
        }}
      >
        <Box mx={2}>
          <Link to="/">
            <img src={"/logo.svg"} alt="Nice" width="40" />
          </Link>
        </Box>
        <Box mx={1} />
        <motion.div
          style={{
            opacity: opacityAnim,
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className={classes.title} variant={"h4"}>
            Algo-Card
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"flex-end"}
            ml={5}
            mr={2}
            width={150}
          >
            <Box mr={2} width={"100%"}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${progress}%`}</Typography>
            </Box>
          </Box>
          <Fab
            variant="extended"
            color="primary"
            size="medium"
            onClick={() => {
              scroller.scrollTo("card", {
                duration: 1500,
                smooth: "easeInOutQuint",
                offset: -100,
              });
            }}
          >
            <VisibilityIcon className={classes.extendedIcon} />
            Card Preview
          </Fab>
        </motion.div>
      </Container>
      <Container maxWidth={"xl"} className={classes.container}>
        <Box
          display="grid"
          gridColumnGap={40}
          gridTemplateColumns="1fr minmax(400px, 25%)"
        >
          <Paper className={classes.paper}>
            <Route
              render={({ history }) => (
                <Wizard
                  history={history}
                  render={({ step, next, previous, steps }) => {
                    const stepIndex = steps.indexOf(step);

                    setProgress(
                      Math.round(((stepIndex + 1) / steps.length) * 100)
                    );
                    return (
                      <div
                        style={{
                          // position: "relative",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                        // onKeyDown={(event) => {
                        //   if (event.key === "ArrowLeft" && stepIndex > 0) {
                        //     previous();
                        //   } else if (
                        //     event.key === "ArrowRight" &&
                        //     stepIndex < steps.length - 1
                        //   ) {
                        //     next();
                        //   }
                        // }}
                        // tabIndex={0}
                      >
                        <div className={classes.nextbar}>
                          <Tooltip
                            title={
                              stepIndex > 0
                                ? `Back to ${
                                    WizardSpec[stepIndex - 1].text ||
                                    WizardSpec[stepIndex - 1].path
                                  }`
                                : ""
                            }
                          >
                            <IconButton
                              onClick={previous}
                              style={{
                                display: stepIndex === 0 ? "none" : undefined,
                              }}
                              size={"small"}
                            >
                              <ChevronLeftIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <div style={{ flexGrow: 1, position: "relative" }}>
                          <TransitionGroup>
                            <CSSTransition
                              key={step.id}
                              classNames="wizard"
                              timeout={{ enter: 200, exit: 300 }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                <Steps key={step.id} step={step}>
                                  {WizardSpec.map((wizardStep) => (
                                    <Step
                                      key={`wizard/${wizardStep.path}`}
                                      id={`wizard/${wizardStep.path}`}
                                    >
                                      {wizardStep.component}
                                    </Step>
                                  ))}
                                </Steps>
                              </div>
                            </CSSTransition>
                          </TransitionGroup>
                        </div>
                        <div className={classes.nextbar}>
                          <Tooltip
                            title={
                              stepIndex < steps.length - 1
                                ? `Go to ${
                                    WizardSpec[stepIndex + 1].text ||
                                    WizardSpec[stepIndex + 1].path
                                  }`
                                : ""
                            }
                          >
                            <IconButton
                              onClick={next}
                              style={{
                                display:
                                  stepIndex === steps.length - 1
                                    ? "none"
                                    : undefined,
                              }}
                              size={"medium"}
                            >
                              <ArrowForwardIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    );
                  }}
                />
              )}
            />
          </Paper>

          <motion.div
            style={{
              opacity: sidebarHovered ? 1 : 0.8,
              transition: "all ease-in-out 0.1s",
            }}
            onMouseEnter={() => setSidebarHovered(true)}
            onMouseLeave={() => setSidebarHovered(false)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant={"h6"}>Summary Preview</Typography>
                <Box m={2} />
                <AbstractCard spec={recoilCard} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant={"h6"}>Examples</Typography>
                <Box m={2} />
                <Example />
              </Grid>
            </Grid>
          </motion.div>
        </Box>
        <Box m={10} />

        <motion.div style={{ opacity: previewOpacity, scale: previewScale }}>
          <Container maxWidth={"lg"}>
            <Element name="card">
              <Paper className={classes.cardPaper}>
                <Card spec={recoilCard} preview />
              </Paper>
            </Element>
          </Container>
        </motion.div>
      </Container>
    </div>
  );
}
