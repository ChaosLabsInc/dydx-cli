import { PublicCallers } from "./public";
import { PrivateCallers } from "./private";
import { CallersMapping, CallType, Param } from "./types";
import { MasterAuthOrLogin } from "./auth";
import { ClientSingleton } from "./client";

export const Client = new ClientSingleton();

function Caller(type: CallType): CallersMapping {
  switch (type) {
    case CallType.private:
      return PrivateCallers;
      break;
    case CallType.public:
      return PublicCallers;
    default:
      throw new Error("type not found");
  }
}

export function Calls(type: CallType): string[] {
  return Object.entries(Caller(type)).map(([k, v]) => {
    return k;
  });
}

export function Desciptions(type: CallType): string[][] {
  return Object.entries(Caller(type)).map(([k, v]) => {
    return [k, v.description];
    // return `${k} - ${v.description}`;
  });
}

export function ParamsKeys(call: string, type: CallType): string[] {
  const caller = Caller(type);
  return caller[call] ? Object.keys(caller[call].params) : [];
}

export function ParamFromKey(call: string, key: string, type: CallType): Param {
  const caller = Caller(type);
  if (caller[call] && caller[call].params[key]) {
    return caller[call].params[key];
  }
  throw new Error("invalid call and param key.");
}

export async function ExecuteCall(call: string, values: any[], type: CallType): Promise<any> {
  const caller = Caller(type);
  return await caller[call].func(values);
}
