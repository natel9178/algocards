export interface Spec {
  title: string;
  description: string;
  authors: {
    name: string;
    contact?: string;
  }[];
  version: string;
  type: string;
  githubLink?: string;
  supportingLinks?: string[];
  license?: string;
  input: string | string[];
  output: string | string[];
  architectureDescription?: string;

  intendedUse: {
    primaryUsecase: string | string[];
    antiGoals?: string | string[];
  };

  limitations?: {
    type: string;
    description: string;
    workarounds?: string[];
  }[];

  ethicalConsiderations?: string[];

  datasetPerformance?: {
    datasetName: string;
    description?: string;
    link?: string;
    exampleImageLinks?: string[];

    performanceMetrics?: {
      name: string;
      value: string | number;
      description?: string;
    }[];

    performanceGraphs?: {
      name: string;
      resourceLink: string;
      description?: string
    }[];
  }[];
}
