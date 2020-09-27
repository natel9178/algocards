export interface Spec {
  title: string;
  description: string;
  authors: {
    name: string;
    contact?: string;
  }[];
  link?: string;
  license?: string;
  input: string | string[];
  output: string | string[];
  architectureDescription?: string;

  intendedUse: {
    primaryUsecase: string[];
    subgoals?: string[];
    antiGoals?: string[];
  };


  

  limitations?: {
    type: string;
    description?: string;
    remediations?: string[];
  }[];
  tradeoffs?: string[];
  ethicalConsiderations?: string[];

  datasetPerformance?: {
    datasetName: string;
    description?: string;
    link?: string;

    performanceMetrics?: {
      name: string;
      value: string | number;
      description?: string;
    }[];
  }[];

  evaluationGraphs?: {
    title?: string;
    caption?: string;
    assetLinks?: string[];
  }[];

  additionalComments?: string;
}
