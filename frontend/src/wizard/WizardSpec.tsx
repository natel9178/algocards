import React from "react";
import Finish from "./Finish";
import ListEntry from "./ListEntry";
import TextEntry from "./TextEntry";
import UploadEntry from "./UploadEntry";
import LicenseList from "spdx-license-list/simple";

export const WizardSpec = [
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
