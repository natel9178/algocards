import {
  AppBar,
  Box,
  Fab,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  Toolbar,
  Tooltip,
  useTheme,
  Typography,
  Container,
} from "@material-ui/core";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Wizard, Steps, Step } from "react-albus";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Element, scroller } from "react-scroll";
import TextEntry from "./TextEntry";
import LicenseList from "spdx-license-list/simple";
import ListEntry from "./ListEntry";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Card from "../presenter/Card";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useWindowDimensions } from "../utils/useWindowDimensions";
import UploadEntry from "./UploadEntry";
import Finish from "./Finish";
import { Link } from "react-router-dom";

const WizardSpec = [
  {
    path: "title",
    text: "Title",
    component: (
      <TextEntry
        field={"title"}
        title={"Name?"}
        description={"This will eventually be the title of your card."}
        isMultiline={true}
        placeholder={"Yolov4 Faces"}
        textLimit={50}
      />
    ),
  },
  {
    path: "description",
    text: "Description",
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
    text: "Model Type",

    component: (
      <TextEntry
        field={"type"}
        title={"ML Field?"}
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
    text: "Authors",
    component: (
      <ListEntry
        textPlaceholder="Name"
        subtextPlaceholder="Contact (e-mail)"
        mainField="authors"
        textField="name"
        short
        subtextField="contact"
        title={"Authors?"}
        description={"List anyone who could be points of contact."}
      />
    ),
  },
  {
    path: "version",
    text: "Version",
    component: (
      <TextEntry
        field={"version"}
        title={"Version?"}
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
    text: "Links",
    component: (
      <ListEntry
        short
        subtextPlaceholder="https://arxiv.org"
        mainField="supportingLinks"
        subtextField="link"
        title={"Supporting Links?"}
        description={
          "Examples include your paper on ArXiv, a public github link, Co-Lab notebook, or Bigquery Dataset link."
        }
      />
    ),
  },
  {
    path: "license",
    text: "License",
    component: (
      <TextEntry
        field={"license"}
        title={"License?"}
        description={"How should others be able to use your model?"}
        isMultiline={true}
        placeholder={"MIT"}
        autocompleteOptions={Array.from(LicenseList.values())}
      />
    ),
  },
  {
    path: "inputs",
    text: "Inputs",
    component: (
      <ListEntry
        short
        subtextPlaceholder="Photo(s) / Video(s)"
        mainField="inputs"
        subtextField="name"
        title={"Inputs?"}
        description={"Add relevant inputs to this model."}
      />
    ),
  },
  {
    path: "outputs",
    text: "Outputs",
    component: (
      <ListEntry
        short
        subtextPlaceholder="Bounding Boxes"
        mainField="outputs"
        subtextField="name"
        title={"Outputs?"}
        description={
          "Add any features or detections outputted from this model."
        }
      />
    ),
  },
  {
    path: "showcase",
    text: "Showcase",

    component: (
      <UploadEntry
        title={"Showcase Image?"}
        description={
          "If appropiate, you may add a showcase image below showing your model."
        }
        field={"showcase"}
      />
    ),
  },
  {
    path: "architecture",
    text: "Architecture",
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
    text: "Primary Usecase",

    component: (
      <TextEntry
        smallText
        field={"primaryUsecase"}
        title={"What is the primary usecase of your model?"}
        description={
          "When creating and training this algorithm, what usecase did you have in mind?"
        }
        placeholder={
          "To help social media users engage with their friends more easily by automatically identifying taggable faces in images."
        }
        isMultiline={true}
      />
    ),
  },
  {
    path: "outOfScope",
    text: "Out Of Scope Usecases",
    component: (
      <ListEntry
        subtextPlaceholder="Resolving distinct identities for people in crowds (i.e. facial recognition)."
        mainField="antiGoals"
        subtextField="description"
        title={"Out Of Scope Usecases?"}
        description={"What usecases was this model not designed for?"}
      />
    ),
  },
  {
    path: "stakeholderImpacts",
    text: "Stakeholder Impacts",
    component: (
      <ListEntry
        minWidth={"50ch"}
        textPlaceholder="Innocent bystanders"
        subtextPlaceholder="Bystanders to security cameras may have their faces recognized without their consent."
        mainField="stakeholderImpacts"
        textField="stakeholder"
        subtextField="impact"
        title={"Stakeholder Impacts?"}
        description={
          "What are stakeholders (impacted groups) and potential harmful impacts on each?"
        }
      />
    ),
  },
  {
    path: "limitations",
    text: "Limitations",
    component: (
      <ListEntry
        textPlaceholder="Occlusion"
        subtextPlaceholder="While faces or objects are occluded, this model may not be able to resolve these objects accurately."
        mainField="limitations"
        textField="type"
        subtextField="description"
        title={"Limitations?"}
        description={"What are the core limitations of the model?"}
      />
    ),
  },
  {
    path: "ethicalConsiderations",
    text: "Ethical Considerations",
    component: (
      <ListEntry
        subtextPlaceholder="Using this model for tracking people may lead to innaccurate results and harmful consequences in mission-critical contexts."
        mainField="ethicalConsiderations"
        subtextField="description"
        title={"Ethical Considerations?"}
        description={
          "Are there ethical considerations that model users should be aware of? What improvements and future investigations are needed to address these?"
        }
      />
    ),
  },
  {
    path: "datasets",
    text: "Datasets",

    component: (
      <ListEntry
        minWidth={"50ch"}
        textPlaceholder="COCO (People)"
        subtextPlaceholder="A subset of the COCO dataset, meaning “Common Objects In Context”, is a set of challenging, high quality datasets for computer vision, mostly state-of-the-art neural networks. We only selected face labels on this dataset. "
        mainField="datasets"
        textField="name"
        subtextField="description"
        title={"Datasets?"}
        description={
          "What datasets did your model use for training and evaluation?"
        }
      />
    ),
  },
  {
    path: "performanceOverview",
    text: "Performance Overview",

    component: (
      <TextEntry
        smallText
        field={"performanceOverview"}
        title={"Performance Summary?"}
        description={
          "Describe how the model was trained and any qualatative insights from your performance evaluation."
        }
        isMultiline={true}
        placeholder={
          "We trained this model with standard Yolov4 training procedures. We noticed that on our evaluation dataset, our recall metrics dropped significantly when there was occlusion, or when there were multiple objects grouped in the frame. "
        }
      />
    ),
  },
  {
    path: "performanceMetrics",
    text: "Performance Metrics",

    component: (
      <ListEntry
        short
        center
        maxWidth={"20ch"}
        textPlaceholder="PR-AUC"
        subtextPlaceholder="0.43"
        mainField="performanceMetrics"
        textField="name"
        subtextField="value"
        title={"Metrics?"}
        description={
          "Give all quantative metrics necessary to give people the big picture."
        }
      />
    ),
  },
  {
    path: "figures",
    text: "Figures",

    component: (
      <UploadEntry
        title={"Figures?"}
        description={
          "Add the most important figures that show your performance and limitations."
        }
        field={"figures"}
      />
    ),
  },
  { path: "finish", text: "Finish", component: <Finish /> },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
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
    marginLeft: 40,
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

  return (
    <>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <img src={"/logo.svg"} alt="Nice" width="40" />
          </Link>
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
            <Box display="flex" alignItems="center" ml={5} mr={2} width={150}>
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
              style={{
                marginRight: theme.spacing(5),
              }}
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
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Container maxWidth={"lg"} className={classes.container}>
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
          <Box m={10} />

          <motion.div style={{ opacity: previewOpacity, scale: previewScale }}>
            <Element name="card">
              <Paper className={classes.cardPaper}>
                <Card fromRecoil preview />
              </Paper>
            </Element>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
