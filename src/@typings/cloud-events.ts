export const enum CloudEventType {
  ConfigurationChanged = 'sh.keptn.event.configuration.change',
  DeploymentFinished = 'sh.keptn.events.deployment-finished',
  TestsFinished = 'sh.keptn.events.tests-finished',
  EvaluationDone = 'sh.keptn.events.evaluation-done',
  Problem = 'sh.keptn.events.problem',
}

export type ConfigurationChanged = Base<{
  project: string;
  service: string;
  stage: string;
  valuesCanary: Array<{
    Key?: string;
    Value?: string;
  }>,
  canary: Array<{
    Key?: string;
    Value?: string;
  }>,
  channelInfo: Array<{
    Key?: string;
    Value?: string;
  }>
}>;

export type DeploymentFinished = Base<{
  project: string;
  stage: string;
  service: string;
  teststrategy: string;
  deploymentstrategy: string;
}>;

export type TestsFinished = Base<{
  project: string;
  stage: string;
  service: string;
  teststrategy: string;
  deploymentstrategy: string;
  startedat: string;
}>;

export type EvaluationDone = Base<{
  githuborg: string;
  project: string;
  service: string;
  image: string;
  tag: string;
  stage: string;
  teststrategy: string;
  deploymentstrategy: string;
  evaluationpassed: boolean;
  // Evaluation Details isn't strictly typed
  evaluationdetails: {
    options?: {
      timeStart?: number;
      timeEnd?: number;
    },
    totalScore?: number;
    objectives?: {
      pass?: number;
      warning?: number;
    },
    indicatorResults?: Array<{
      id?: string;
      violations?: Array<{
        value?: any,
        key?: string;
        breach?: string;
        threshold?: number;
      }>;
      score?: number;
    }>,
    result: "pass" | "fail";
  }
}>;

export type Problem = Base<{
  State: string;
  ProblemID: string;
  ProblemTitle: string;
  ProblemDetails: {
    ProblemDetailsJSON: string;
  };
  ImpactedEntities: unknown;
  ImpactedEntity: string;
  PID: string;
}>;

export interface CloudEvent {
  type: CloudEventType;
  specversion: string;
  source: string;
  id: string;
  time: string;
  contenttype: string;
  shkeptncontext: string;
  data: unknown;
}

interface Base<D> extends CloudEvent {
  type: CloudEventType;
  shkeptncontext: string;
  data: D;
}