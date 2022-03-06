import { PublicCallers } from "./public";

export enum ParamType {
  number = "number",
  time = "time", //iso - 2022-01-13T18:46:01
  string = "string",
  choice = "choice",
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

export function Calls(): string[] {
  return Object.entries(PublicCallers).map(([k, v]) => {
    return k;
  });
}

export function Desciptions(): string[] {
  return Object.entries(PublicCallers).map(([k, v]) => {
    return `${k} - ${v.description}`;
  });
}

export function ParamsKeys(call: string): string[] {
  return PublicCallers[call] ? Object.keys(PublicCallers[call].params) : [];
}

export function OptinalValue(v: any): any {
  return v !== undefined && v !== "" ? v : undefined;
}

export function ParamFromKey(call: string, key: string): Param {
  if (PublicCallers[call] && PublicCallers[call].params[key]) {
    return PublicCallers[call].params[key];
  }
  throw new Error("invalid call and param key.");
}

// console.log(ParamsKeys(Calls()[0]));
// console.log(ParamsKeyOptions("markets", "market"));
