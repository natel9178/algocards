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
        description={"How do you want others to refer to your model?"}
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
        description={"Write a short single sentence that is easy to understand."}
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
          "Consider the core problem your model is trying to solve, or specific applications you had in mind while creating this model."
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
        text: "To push accuracy benchmarks on the COCO dataset",
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
        description={"What goals was this model not designed for? Think of related areas where your model may fail."}
      />
    ),
    examples: [
      {
        text:
          "Identifying and resolving individual identities from faces in crowds.",
      },
      {
        text: "Making perfectly sound financial decisions around stocks.",
      },
      {
        text: "Inferring demographic traits from a particular face.",
      },
      {
        text:
          "Enhancing resolution of security camera footage for use in courts and legal settings.",
      },
      {
        text:
          "Generating text and papers for submission to academic journals or publications.",
      },
      {
        text: "Generating reports for risk assessment of natural disasters.",
      },
      {
        text:
          "Counting biological cells other than white and red blood cells in blood.",
      },
      {
        text: "Clinical use in predicting disease prognosis of the lungs.",
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
      {
        titleText: "Defandants and Detainees",
        text:
          "This model may incorrectly give varying recidivism risk scores biased by demographic groups.",
      },
      {
        titleText: "Employers",
        text:
          "This model may incorrectly give varying recidivism risk scores biased by demographic groups.",
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
        description={"Under what inputs, conditions, or characteristics will your model fail? Consider the groups of people impacted by your model."}
      />
    ),
    examples: [
      {
        titleText: "Facial Orientation",
        text:
          "Needs visible facial landmarks such as eyes, noses, and mouths to work correctly. Faces that are looking away from the camera (pan > 90°, roll > 45°, or tilt > 45°) might not be detected.",
      },
      {
        titleText: "Object size",
        text:
          "Object size must be at least 1% of the image area to be detected.",
      },
      {
        titleText: "“Things” vs “stuff”",
        text:
          "Model was designed to detect discrete objects with clearly discernible shapes (“things”), not a group of overlapping objects or background clutter (“stuff”).",
      },
      {
        titleText: "Lighting",
        text:
          "Poor or harsh, high-contrast illumination (e.g. nighttime, back-lit, side-lit) may degrade model performance.",
      },
      {
        titleText: "Occlusion or clutter",
        text:
          "Partially obstructed or truncated objects may not be detected. For example, a shirt underneath a jacket, or where less than 25% of an object is visible in the image.",
      },
      {
        titleText: "Camera positioning and lens type",
        text:
          "Camera angle and positioning (e.g. oblique angles, long-distance), and lens type (e.g. fisheye) may impact model performance.",
      },
      {
        titleText: "Blur or noise",
        text:
          "Blurry objects, rapid movement between frames, or encoding/decoding noise may degrade model performance. ",
      },
      {
        titleText: "Image resolution",
        text: "Minimum image resolution of 300K pixels recommended.",
      },
      {
        titleText: "Object type",
        text:
          "Model accuracy varies across different object types (see Performance section).",
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
          "What remaining open questions or decisions need to be made before using this model? What improvements and future investigations are needed to address these questions?"
        }
      />
    ),
    examples: [
      {
        text:
          "Because of the high computational requirements of this model, consider the impacts of delays due to surges in use during production.",
      },
      {
        text:
          "In production environments, although smaller images will lead to faster prediction results, accuracy may be reduced as a tradeoff.",
      },
      {
        text:
          "Because of high computational requirements to train this model, consider the environmental impact of retraining and consider finetuning this model instead.",
      },
      {
        text:
          "Users of the model must be cognizant of impacts towards marginalized groups because of biased training data in our dataset. ",
      },
      {
        text:
          "Users should be aware that results coming from this model is purely predictive and are not objective.",
      },
      {
        text:
          "When using this model, consider psychological harms that targets of the model may have that may have adverse effects on model performance.",
      },
      {
        text:
          "More future investigations are needed to reduce racial bias in this housing price estimation model.",
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
          "Open Images Validation dataset (V4) is comprised of ~41k images, annotated with image-level labels, object bounding boxes, object segmentation masks, and visual relationships. It contains a total of 204k bounding boxes and covers 600 object classes",
      },
      {
        titleText: "Chest X-Ray Images (Kaggle)",
        text:
          "The dataset is organized into 3 folders (train, test, val) and contains subfolders for each image category (Pneumonia/Normal). There are 5,863 X-Ray images (JPEG) and 2 categories (Pneumonia/Normal). Chest X-ray images (anterior-posterior) were selected from retrospective cohorts of pediatric patients of one to five years old from Guangzhou Women and Children’s Medical Center, Guangzhou. All chest X-ray imaging was performed as part of patients’ routine clinical care. For the analysis of chest x-ray images, all chest radiographs were initially screened for quality control by removing all low quality or unreadable scans. The diagnoses for the images were then graded by two expert physicians before being cleared for training the AI system. In order to account for any grading errors, the evaluation set was also checked by a third expert.",
      },
      {
        titleText: "Google Dataset",
        text:
          "This dataset is comprised of ~5k images of consumer products taken and donated by Google employees. It covers 210 different object classes. The images are of variable resolution and quality. Most were taken using a mobile phone and feature one or a small number of primary objects that are recognizable as specific consumer products. This data was collected for the explicit purpose of evaluating object detection models for consumer product-related use-cases.",
      },
      {
        titleText: "Imagenet",
        text:
          "Imagnet is an image database organized according to the WordNet hierarchy (currently only the nouns), in which each node of the hierarchy is depicted by hundreds and thousands of images. Currently there is an average of over five hundred images per node.",
      },
      {
        titleText: "Students Performance in Exams (Kaggle)",
        text:
          "This data set consists of the marks secured by the students in various subjects.",
      },
      {
        titleText: "Daily News for Stock Market Prediction (Kaggle)",
        text:
          "Using 8 years daily news headlines to predict stock market movement",
      },
      {
        titleText:
          "COVID-19 Open Research Dataset Challenge (CORD-19) (Kaggle)",
        text:
          "CORD-19 is a resource of over 200,000 scholarly articles, including over 100,000 with full text, about COVID-19, SARS-CoV-2, and related coronaviruses. This freely available dataset is provided to the global research community to apply recent advances in natural language processing and other AI techniques to generate new insights in support of the ongoing fight against this infectious disease. There is a growing urgency for these approaches because of the rapid acceleration in new coronavirus literature, making it difficult for the medical research community to keep up.",
      },
      {
        titleText: "Credit Card Fraud Detection (Kaggle)",
        text:
          "The datasets contains transactions made by credit cards in September 2013 by european cardholders. This dataset presents transactions that occurred in two days, where we have 492 frauds out of 284,807 transactions. The dataset is highly unbalanced, the positive class (frauds) account for 0.172% of all transactions. It contains only numerical input variables which are the result of a PCA transformation. Unfortunately, due to confidentiality issues, we cannot provide the original features and more background information about the data. ",
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
          "How was your model trained? What are qualitative insights from your metrics? How do they affect various groups or reveal model limitations?"
        }
        isMultiline={true}
        placeholder={
          "We trained this model with standard Yolov4 training procedures. We noticed that on our evaluation dataset, our recall metrics dropped significantly when there was occlusion, or when there were multiple objects grouped in the frame. "
        }
      />
    ),
    examples: [
      {
        text:
          "This model was trained with the standard darknet training procedures. Aggregate performance varies accross the two evaluation datasets we've used, (mAP of 0.43 and Recall@60% Precision of 0.42 on Open Images Validation set; vs. mAP of 0.34 and Recall@60% Precision of 0.36 on the Google Internal test set). Performance also heavily varied across object classes...",
      },
      {
        text:
          "This model was trained by using transformers in place of convolutional neural nets for image classification. As a result, we were able to get a Top-1 Imagenet score of 95%, which is currently the state of the art.",
      },
      {
        text:
          "...Most of the accuracy from this model comes from objects that were extremely prevalent in the dataset. For example, Top-1 performance for humans and cars greatly exceeded performance less prevalent classes like 'paper' (mAP 0.30) and 'toad' (mAP 0.20)",
      },
      {
        text:
          "...This facial recognition model has a low recall but high precision for faces of people with darker skin. That means that fewer faces were accurately detected, but of the detected faces they were correctly identified most of the time. ",
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
          "Give all quantitative metrics necessary to give people the big picture."
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
          "Add the most important figures that demonstrate your performance and limitations."
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
          "Machine Learning",
          "Reinforcement Learning",
          "Robotics",
          "Automated Reasoning",
          "Knowledge Representation",
          "Search and Problem Solving",
          "Generation",
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
        text: "Photos",
      },
      {
        text: "Videos",
      },
      {
        text: "Generic Text",
      },
      {
        text: "Census Data",
      },
      {
        text: "Survey Choices",
      },
      {
        text: "Satelite data",
      },
      {
        text: "ECG Time Series",
      },
      {
        text: "News Headlines",
      },
      {
        text: "Scientific Journal Articles",
      },
      {
        text: "Human Genetic Code",
      },
      {
        text: "Flight data",
      },
    ],
    textStyle: { textAlign: "center" },
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
    textStyle: { textAlign: "center" },

    examples: [
      {
        text: "Bounding Boxes",
      },
      {
        text: "Confidence Scores",
      },
      {
        text: "Landmark Points",
      },
      {
        text: "Housing Prices",
      },
      {
        text: "Stock rise/fall prediction",
      },
      {
        text: "Face Embedding",
      },
      {
        text: "Lung Disease Type",
      },
      {
        text: "Disease Risk Score",
      },
      {
        text: "Predicted Age",
      },
      {
        text: "Word Embedding",
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
        text: "A Mobilenet backbone with Mask-RCNN architecture.",
      },
      {
        text: "Transformer backend, trained against perplexity",
      },
      {
        text: "Multimodal logistic regression trained with cross entropy.",
      },
    ],
  },
  { path: "finish", text: "Finish", component: <Finish /> },
];
