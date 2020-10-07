import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Wizard, Steps, Step } from "react-albus";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import TextEntry from "./TextEntry";
import LicenseList from "spdx-license-list/simple";
import ListEntry from "./ListEntry";
import { useLocalStorage } from "../utils/LocalStorage";

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
        textLimit={50}
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
      <ListEntry
        short
        subtextPlaceholder="https://arxiv.org"
        mainField="supportingLinks"
        subtextField="link"
        title={"Any Github and Supporting Links?"}
        description={
          "Examples include your paper on ArXiv, a public github link, Co-Lab notebook, or Bigquery Dataset link."
        }
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
    path: "inputs",
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
      <ListEntry
        subtextPlaceholder="Resolving distinct identities for people in crowds (i.e. facial recognition)."
        mainField="antiGoals"
        subtextField="description"
        title={"Anti-Goals?"}
        description={"What usecases was this model not designed for?"}
      />
    ),
  },
  {
    path: "limitations",
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
    component: (
      <ListEntry
        subtextPlaceholder="Using this model for tracking people may lead to innaccurate results and harmful consequences in mission-critical contexts."
        mainField="ethicalConsiderations"
        subtextField="consideration"
        title={"Ethical Considerations?"}
        description={
          "Because of the limitations and usecases, are there ethical considerstions that model users should be aware of?"
        }
      />
    ),
  },
  {
    path: "datasets",
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
  const [ethicalConsiderations, setEthicalConsiderations] = useLocalStorage(
    "ethicalConsiderations"
  );

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
                                  {ethicalConsiderations.map(
                                    (_: string, idx: number) => {
                                      return (
                                        <Step
                                          key={`wizard/example${idx}`}
                                          id={`wizard/example${idx}`}
                                        >
                                          <TextEntry
                                            field={`title${idx}`}
                                            title={"Name?"}
                                            description={
                                              "This will eventually be the title of your card."
                                            }
                                            isMultiline={true}
                                            placeholder={"Yolov4 Faces"}
                                            textLimit={50}
                                          />
                                        </Step>
                                      );
                                    }
                                  )}
                                </Steps>
                              </div>
                            </CSSTransition>
                          </TransitionGroup>
                          <Box
                            display="flex"
                            alignItems="center"
                            marginTop={-4} // TODO: Extremely Janky margin, Hate this.
                          >
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
                                ? `Go to ${
                                    WizardSpec[stepIndex + 1].path || ""
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
