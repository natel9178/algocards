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
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Wizard, Steps, Step } from "react-albus";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Element, scroller } from "react-scroll";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Card from "../presenter/Card";
import {
  AnimatePresence,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useWindowDimensions } from "../utils/useWindowDimensions";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Spec } from "../spec/spec";
import { card } from "../utils/useCardState";
import { WizardSpec } from "./WizardSpec";
import AbstractCard from "../browse/AbstractCard";
import Examples from "./Examples";

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
    display: "flex",
    flexGrow: 1,
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
  const history = useHistory();
  const previewOpacity = useTransform(scrollY, [0, height * 0.7], [0, 1]);
  const previewScale = useTransform(scrollY, [0, height * 0.7], [0.9, 1]);
  const [stepIndex, setStepIndex] = useState(0);
  const [confirmDeleteAllDialogOpen, setConfirmDeleteAllDialogOpen] = useState(
    false
  );
  const opacityAnim = useTransform(scrollY, [0, 40], [1, 0]);
  const [recoilCard, setLoadCard] = useRecoilState<Spec>(card);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const progress = Math.round(((stepIndex + 1) / WizardSpec.length) * 100);
  const matches = useMediaQuery(theme.breakpoints.up("md"));

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
          {matches && (
            <Typography className={classes.title} variant={"h4"}>
              AI Cards
            </Typography>
          )}
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"flex-end"}
            ml={5}
            mr={2}
            width={"clamp(80px, 50%, 150px)"}
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
            {matches && <>Card</>} Preview
          </Fab>
          <Box m={1} />
          <Fab
            variant="extended"
            size="medium"
            onClick={() => {
              setConfirmDeleteAllDialogOpen(true);
            }}
          >
            Start Over
          </Fab>
          <Dialog
            open={confirmDeleteAllDialogOpen}
            onClose={() => setConfirmDeleteAllDialogOpen(false)}
          >
            <DialogTitle disableTypography>
              <Typography variant={"h5"} style={{ fontWeight: "bold" }}>
                Confirm Start Over
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Starting over will overwrite any AI Card you are currently
                editing. Do you wish to continue?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => setConfirmDeleteAllDialogOpen(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setConfirmDeleteAllDialogOpen(false);
                  localStorage.setItem("card", "{}");
                  setLoadCard({});
                  history.push("/wizard");
                  history.go(0);
                }}
                color="primary"
              >
                Delete All
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      </Container>
      <Container maxWidth={"xl"} className={classes.container}>
        <Box display="flex" flexDirection={"row"} flexWrap="wrap">
          <Paper className={classes.paper}>
            <Route
              render={({ history }) => (
                <Wizard
                  history={history}
                  render={({ step, next, previous, steps }) => {
                    setStepIndex(steps.indexOf(step));
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
          {matches && <Box m={2} />}

          <motion.div
            style={{
              width: matches ? 400 : "100%",
              opacity: sidebarHovered ? 1 : 0.8,
              transition: "all ease-in-out 0.1s",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseEnter={() => setSidebarHovered(true)}
            onMouseLeave={() => setSidebarHovered(false)}
          >
            {!matches && <Box m={2} />}
            <Typography variant={"h6"}>Summary Preview</Typography>
            <Box m={0.5} />
            <AbstractCard paperStyle={{ cursor: "auto" }} spec={recoilCard} />
            <AnimatePresence>
              {WizardSpec[stepIndex] && WizardSpec[stepIndex].examples && (
                <Box mt={2} flexGrow={1}>
                  <Examples
                    examples={WizardSpec[stepIndex].examples!}
                    textStyle={WizardSpec[stepIndex].textStyle}
                  />
                </Box>
              )}
            </AnimatePresence>
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
