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
  supportingLinks?: string[]; // added
  license?: string; // added
  input?: string | string[]; // added
  output?: string | string[]; // added
  architectureDescription?: string; // added

  intendedUse?: {
    primaryUsecase?: string | string[]; // added
    antiGoals?: string | string[]; // added
  };

  limitations?: {
    type?: string; // added
    description?: string; // added
    workarounds?: string[];
  }[];

  ethicalConsiderations?: string[]; // added

  datasetPerformance?: {
    datasetName?: string;
    description?: string;
    link?: string;
    exampleImageLinks?: string[];

    performanceMetrics?: {
      name?: string;
      value?: string | number;
      description?: string;
    }[];

    performanceGraphs?: {
      name?: string;
      resourceLink?: string;
      description?: string;
    }[];
  }[];
}
