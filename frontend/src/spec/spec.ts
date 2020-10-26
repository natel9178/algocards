export interface Spec {
  title?: string; // added
  description?: string; // added
  authors?: {
    name?: string; // added
    contact?: string; // added
  }[];
  exampleImageLink?: string;
  version?: string; // added
  type?: string; // added
  supportingLinks?: { link?: string }[]; // added
  license?: string; // added
  input?: { name?: string }[]; // added
  output?: { name?: string }[]; // added
  architectureDescription?: string; // added

  primaryGoal?: string | string[]; // added
  antiGoals?: { description?: string }[]; // added

  limitations?: {
    type?: string; // added
    description?: string; // added
    workarounds?: string[];
  }[];

  groupImpacts?: {
    group?: string;
    impact?: string;
  }[];

  ethicalConsiderations?: { description?: string }[]; // added

  performanceOverview?: string;
  performanceMetrics?: {
    name?: string;
    value?: string | number;
    description?: string;
  }[];

  figures?: string[];
  datasets?: { name?: string; description?: string }[];
}
