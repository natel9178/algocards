import React from "react";
import Finish from "./Finish";
import ListEntry from "./ListEntry";
import TextEntry from "./TextEntry";
import UploadEntry from "./UploadEntry";
import LicenseList from "spdx-license-list/simple";

interface WizardSpecInterface {
  path: string;
  text: string;
  component: JSX.Element;
  examples?: {
    titleText?: string;
    text: string;
  }[];
  textStyle?: React.CSSProperties;
}

export const WizardSpec: WizardSpecInterface[] = [
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
    examples: [
      {
        text: "Multimodal Stress Sensing",
      },
      {
        text: "Yolov4 Faces",
      },
      {
        text: "GPT-3 Code",
      },
      {
        text: "Shakespeare Generator",
      },
      {
        text: "CelebA Facemorph",
      },
      {
        text: "FaceGAN",
      },
      {
        text: "CheXNet",
      },
    ],
    textStyle: { textAlign: "center" },
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
    examples: [
      {
        text:
          "Ambient stress detection methods with skin conductance and computer vision",
      },
      {
        text: "State of the art facial detection with Yolo",
      },
      {
        text: "Automatic sonnet generation from Shakespeare text corpra",
      },
      {
        text: "High speed sentiment analyzer of court transcripts",
      },
      {
        text: "Voice identification with novel transformer architecture",
      },
    ],
  },
  {
    path: "primaryGoal",
    text: "Primary Goal",

    component: (
      <TextEntry
        smallText
        field={"primaryGoal"}
        title={"What is the primary goal of your model?"}
        description={
          "When creating and training this algorithm, what goal did you have in mind?"
        }
        placeholder={
          "To help social media users engage with their friends more easily by automatically identifying taggable faces in images."
        }
        isMultiline={true}
      />
    ),
    examples: [
      {
        text:
          "To help building managers respond to increased stress levels for building employees",
      },
      {
        text:
          "To help users of social media more easily tag their friends in images",
      },
      {
        text:
          "To use novel NLP technologies for computational understanding of Shakespeare's plays",
      },
      {
        text: "To push accuracy limits on the COCO dataset",
      },
    ],
  },
  {
    path: "outOfScope",
    text: "Out of Scope Goals",
    component: (
      <ListEntry
        subtextPlaceholder="Resolving distinct identities for people in crowds (i.e. facial recognition)."
        mainField="antiGoals"
        subtextField="description"
        title={"Out of Scope Goals?"}
        description={"What goals was this model not designed for?"}
      />
    ),
    examples: [
      {
        titleText: "Facial Orientation",
        text:
          "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
      },
    ],
  },
  {
    path: "groupImpacts",
    text: "Societal Risk Groups & Perspectives",
    component: (
      <ListEntry
        minWidth={"50ch"}
        textPlaceholder="Innocent bystanders"
        subtextPlaceholder="Bystanders to security cameras may have their faces recognized without their consent."
        mainField="groupImpacts"
        textField="group"
        subtextField="impact"
        title={"Group Impacts?"}
        description={
          "Consider the main group affected by this model, marginalized subgroups (e.g. LGBTQ+ Individuals), and other societies not mainly targeted by your model."
        }
      />
    ),
    examples: [
      {
        titleText: "Persons with Mental Illness",
        text:
          "People who have mental illnesses may not want their stress levels measured and tracked because of patient privacy.",
      },
      {
        titleText: "Marginalized Race Groups",
        text:
          "Because of confirmation bias in data, this may indicate that people in marginalized groups have higher crime risk scores than others.",
      },
      {
        titleText: "Persons with Dark Skin",
        text:
          "Facial recognition may be less accurate on people with darker skin because of lack of data balance.",
      },
      {
        titleText: "Innocent Bystanders",
        text:
          "Bystanders to security cameras may have their faces recognized without their consent.",
      },
    ],
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
    examples: [
      {
        titleText: "Facial Orientation",
        text:
          "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
      },
    ],
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
    examples: [
      {
        titleText: "Facial Orientation",
        text:
          "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
      },
    ],
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
    examples: [
      {
        titleText: "COCO",
        text:
          "Coco is a ...",
      },
    ],
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
    examples: [
      {
        titleText: "Facial Orientation",
        text:
          "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
      },
    ],
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
        description={
          <>
            How should others be able to use your model?{" "}
            <a href="https://tldrlegal.com/" target="_blank">
              https://tldrlegal.com/
            </a>{" "}
            can be a resource.
          </>
        }
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
    examples: [
      {
        titleText: "Facial Orientation",
        text:
          "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
      },
    ],
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
    examples: [
      {
        titleText: "Facial Orientation",
        text:
          "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
      },
    ],
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
    examples: [
      {
        titleText: "Facial Orientation",
        text:
          "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
      },
    ],
  },
  { path: "finish", text: "Finish", component: <Finish /> },
];
