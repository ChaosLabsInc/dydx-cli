import { PublicCallers } from "./public";

export interface Caller {
  params: Params;
  description: string;
  func: (values: any[]) => Promise<any>;
}

export interface Params {
  [name: string]: string[] | undefined;
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

export function ParamsKeyOptions(call: string, key: string): string[] | undefined {
  if (PublicCallers[call] && PublicCallers[call].params[key]) {
    return PublicCallers[call].params[key];
  }
  return [];
}

// console.log(ParamsKeys(Calls()[0]));
// console.log(ParamsKeyOptions("markets", "market"));
