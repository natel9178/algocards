import {
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
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

const WizardSpec = [
  {
    path: "title",
    title: "Name?",
    description: "This will eventually be the title of your card.",
    inputPlaceholder: "Yolov4 Faces",
    component: motion.div,
  },
  {
    path: "description",
    title: "Description?",
    description: "Write something fast to understand and read.",
    inputPlaceholder:
      "State of the art facial detection with the Yolo architecture.",
    component: motion.div,
  },
  {
    path: "type",
    title: "Model Type?",
    description: "What area of ML would this model be a part of?",
    inputPlaceholder: "Computer Vision",
    component: motion.div,
  },
  {
    path: "authors",
    title: "Authors?",
    description: "List anyone who could be points of contact.",
    component: motion.div,
  },
  {
    path: "version",
    title: "Model Version?",
    description:
      "Your model's limitations and performance will change from version to version.",
    inputPlaceholder: "v4",
    component: motion.div,
  },
  {
    path: "links",
    title: "Any Github and Supporting Links?",
    description:
      "Examples include your paper on ArXiv, a public github link, Co-Lab notebook, or Bigquery Dataset link.",
    component: motion.div,
  },
  {
    path: "license",
    title: "What are you licensing this model under?",
    description: "How should others be able to use your model?",
    inputPlaceholder: "MIT",
    component: motion.div,
  },
  {
    path: "I/O",
    title: "I/O",
    component: motion.div,
  },
  {
    path: "architecture",
    title: "What is the underlying model architecture?",
    description:
      "Describe what powers the model underneath, including backbones and other technologies.",
    inputPlaceholder:
      "A Darknet50 backbone with three Yolov3 heads, trained on CIoU loss.",
    component: motion.div,
  },
  {
    path: "primaryUsecase",
    title: "What is the primary usecase of your model?",
    description:
      "Include relevant stakeholders, and how people should be using the model. ",
    component: motion.div,
  },
  {
    path: "antiGoals",
    title: "What should this model not be used for?",
    description: "What usecases was this model not designed for?",
    inputPlaceholder: "Resolving individual identities for people in crowds.",
    component: motion.div,
  },
  {
    path: "limitations",
    title: "Limitations",
    description: "What are the core limitations of the model?",
    component: motion.div,
  },
  {
    path: "ethicalConsiderations",
    title: "Ethical Considerations",
    description:
      "Because of the limitations and usecases, are there ethical considerstions that model users should be aware of?",
    component: motion.div,
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
    margin: "0px 5px"
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
                  render={({ step, next, previous }) => (
                    <div
                      style={{
                        // position: "relative",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div className={classes.nextbar}>
                        <IconButton onClick={previous}>
                          <ChevronLeftIcon />
                        </IconButton>
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
                                    <TextEntry
                                      title={wizardStep.title}
                                      description={wizardStep.description}
                                      isMultiline={true}
                                    />
                                  </Step>
                                ))}
                              </Steps>
                            </div>
                          </CSSTransition>
                        </TransitionGroup>
                      </div>
                      <div className={classes.nextbar}>
                        <IconButton onClick={next}>
                          <ChevronRightIcon />
                        </IconButton>
                      </div>
                    </div>
                  )}
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
