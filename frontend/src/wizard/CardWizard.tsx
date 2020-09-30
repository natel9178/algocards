import {
  Box,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Spec } from "../spec/spec";
import { useLocalStorage } from "../utils/LocalStorage";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Divider from "@material-ui/core/Divider";
import { Wizard, Steps, Step, WithWizard } from "react-albus";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./animation.css";
import TextEntry from "./TextEntry";
import { LinearProgressWithLabel } from "../utils/LinearProgressWithLabel";
import LicenseList from "spdx-license-list/simple";

const WizardSpec = [
  {
    path: "title",
    component: (
      <TextEntry
        field={"title"}
        title={"Name?"}
        description={"This will eventually be the title of your card."}
        isMultiline={true}
        placeholder={"Yolov4 Faces"}
      />
    ),
  },
  {
    path: "description",
    component: (
      <TextEntry
        field={"description"}
        title={"Description?"}
        description={"Write something fast to understand and read."}
        isMultiline={true}
        placeholder={
          "State of the art facial detection with the Yolo architecture."
        }
      />
    ),
  },
  {
    path: "type",
    component: (
      <TextEntry
        field={"type"}
        title={"Model Type?"}
        description={"What area of ML would this model be a part of?"}
        isMultiline={true}
        placeholder={"Computer Vision"}
        autocompleteOptions={[
          "Computer Vision",
          "Natural Language Processing",
          "XGBoost",
          "Reinforcement Learning",
        ]}
      />
    ),
  },
  {
    path: "authors",
    component: (
      <TextEntry
        field={"authors"}
        title={"Authors?"}
        description={"List anyone who could be points of contact."}
        isMultiline={true}
      />
    ),
  },
  {
    path: "version",
    component: (
      <TextEntry
        field={"version"}
        title={"Model Version?"}
        description={
          "Your model's limitations and performance will change from version to version."
        }
        isMultiline={true}
        placeholder={"v4"}
      />
    ),
  },
  {
    path: "links",
    component: (
      <TextEntry
        field={"supportingLinks"}
        title={"Any Github and Supporting Links?"}
        description={
          "Examples include your paper on ArXiv, a public github link, Co-Lab notebook, or Bigquery Dataset link."
        }
        isMultiline={true}
        placeholder={"google.com"}
      />
    ),
  },
  {
    path: "license",
    component: (
      <TextEntry
        field={"license"}
        title={"What are you licensing this model under?"}
        description={"How should others be able to use your model?"}
        isMultiline={true}
        placeholder={"MIT"}
        autocompleteOptions={Array.from(LicenseList.values())}
      />
    ),
  },
  {
    path: "I/O",
    component: <TextEntry field={"input"} title={"I/O"} isMultiline={true} />,
  },
  {
    path: "architecture",
    component: (
      <TextEntry
        field={"architectureDescription"}
        title={"What is the underlying model architecture?"}
        description={
          "Describe what powers the model underneath, including backbones and other technologies."
        }
        isMultiline={true}
        placeholder={
          "A Darknet50 backbone with three Yolov3 heads, trained on CIoU loss."
        }
      />
    ),
  },
  {
    path: "primaryUsecase",
    component: (
      <TextEntry
        field={"intendedUse.primaryUsecase"}
        title={"What is the primary usecase of your model?"}
        description={
          "Include relevant stakeholders, and how people should be using the model."
        }
        isMultiline={true}
      />
    ),
  },
  {
    path: "antiGoals",
    component: (
      <TextEntry
        field={"intendedUse.antiGoals"}
        title={"What should this model not be used for?"}
        description={"What usecases was this model not designed for?"}
        isMultiline={true}
        placeholder={"Resolving individual identities for people in crowds."}
      />
    ),
  },
  {
    path: "limitations",
    component: (
      <TextEntry
        field={"limitations"}
        title={"Limitations"}
        description={"What are the core limitations of the model?"}
        isMultiline={true}
      />
    ),
  },
  {
    path: "ethicalConsiderations",
    component: (
      <TextEntry
        field={""}
        title={"Ethical Considerations"}
        description={
          "Because of the limitations and usecases, are there ethical considerstions that model users should be aware of?"
        }
        isMultiline={true}
      />
    ),
  },
];

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
  paper: {
    borderRadius: 18,
    height: 600,
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
}));

export default function CardWizard() {
  const classes = useStyles();
  //   const [specBuilder, setSpecBuilder] = useLocalStorage<Partial<Spec>>(
  //     "specBuilder"
  //   );

  return (
    <div className={classes.root}>
      <Grid container wrap="nowrap" className={classes.container}>
        <Grid item xs={1} className={classes.sidebar}></Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Route
              render={({ history }) => (
                <Wizard
                  history={history}
                  render={({ step, next, previous, steps }) => {
                    const stepIndex = steps.indexOf(step);
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
                      >
                        <div className={classes.nextbar}>
                          <Tooltip
                            title={
                              stepIndex > 0
                                ? `Back to ${WizardSpec[stepIndex - 1].path}`
                                : ""
                            }
                          >
                            <IconButton
                              onClick={previous}
                              style={{
                                display: stepIndex === 0 ? "none" : undefined,
                              }}
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
                              timeout={{ enter: 200, exit: 200 }}
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
                                    <Step id={`wizard/${wizardStep.path}`}>
                                      {wizardStep.component}
                                    </Step>
                                  ))}
                                </Steps>
                              </div>
                            </CSSTransition>
                          </TransitionGroup>
                          <Box display="flex" alignItems="center">
                            <Box mr={2} width={"100%"}>
                              <LinearProgress
                                variant="determinate"
                                value={((stepIndex + 1) / steps.length) * 100}
                              />
                            </Box>
                            <Box minWidth={35}>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                              >{`${Math.round(
                                ((stepIndex + 1) / steps.length) * 100
                              )}%`}</Typography>
                            </Box>
                          </Box>
                        </div>
                        <div className={classes.nextbar}>
                          <Tooltip
                            title={
                              stepIndex < steps.length - 1
                                ? `Go to ${WizardSpec[stepIndex + 1].path}`
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
                            >
                              <ChevronRightIcon />
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
        </Grid>
        <Grid item xs={1} className={classes.sidebar}></Grid>
      </Grid>
    </div>
  );
}
