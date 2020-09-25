interface CustomDefinition {
  title: string;
  description: string;
  assetLinks?: string[];
}

interface IntendedUse {
  primaryUsecase: string[];
  subgoals?: string[];
  antiGoals?: string[];
}

interface Dataset {
  name: string;
  description?: string;
  link?: string;
}

interface PerformanceMetric {
  name: string;
  value: string | number;
  description?: string;
}

interface GraphSet {
  title?: string;
  caption?: string;
  assetLinks?: string[];
}

interface Author {
  name: string;
  contact?: string;
}

interface Limitation {
  type: string;
  description?: string;
  remediations?: string[];
}

interface ShortLong {
  shortDescription?: string;
  description: string;
}

export interface Spec {
  title: string;
  description: string;
  authors: Author[];
  link?: string;
  license?: string;

  intendedUse: IntendedUse;
  input: string;
  output: string;
  architectureDescription?: string;

  ethicalConsiderations?: string[];
  limitations?: Limitation[];
  tradeoffs?: string[];

  datasets?: Dataset[];
  performanceMetrics?: PerformanceMetric[];
  evaluationGraphs?: GraphSet[];

  additionalComments?: string;
  customDefinitions?: CustomDefinition[];
}
