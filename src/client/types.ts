export enum ParamType {
  number = "number",
  time = "time", //iso - 2022-01-13T18:46:01
  string = "string",
  choice = "choice",
}

export enum CallType {
  public = "public",
  private = "private",
}

export interface Caller {
  params: Params;
  description: string;
  func: (values: any[]) => Promise<any>;
}

export interface Params {
  [name: string]: Param;
}

export interface Param {
  type: ParamType;
  optional: boolean;
  options: any[] | undefined;
  description?: string;
}

export interface CallersMapping {
  [name: string]: Caller;
}
