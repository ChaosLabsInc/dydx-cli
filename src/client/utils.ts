import { PublicCallers } from "./public";
import { PrivateCallers } from "./private";
import { DydxClient } from "@dydxprotocol/v3-client";
import Web3 from "web3";
import { CallersMapping, CallType, Param } from "./types";
import { AuthOrLogin } from "./auth";

// import detectEthereumProvider from "@metamask/detect-provider";

// const provider = await detectEthereumProvider();

const web3 = new Web3(Web3.givenProvider);
const HTTP_HOST = "https://api.dydx.exchange";

export const Client: DydxClient = new DydxClient(HTTP_HOST, {
  apiTimeout: 15000,
  web3,
});

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

export function Desciptions(type: CallType): string[] {
  return Object.entries(Caller(type)).map(([k, v]) => {
    return `${k} - ${v.description}`;
  });
}

export function ParamsKeys(call: string, type: CallType): string[] {
  const caller = Caller(type);
  return caller[call] ? Object.keys(caller[call].params) : [];
}

export function OptinalValue(v: any): any {
  return v !== undefined && v !== "" && v !== -1 ? v : undefined;
}

export function ParamFromKey(call: string, key: string, type: CallType): Param {
  const caller = Caller(type);
  if (caller[call] && caller[call].params[key]) {
    return caller[call].params[key];
  }
  throw new Error("invalid call and param key.");
}

export async function ExecuteCall(call: string, values: any[], type: CallType): Promise<any> {
  if (type === CallType.private) {
    await AuthOrLogin();
  }
  const caller = Caller(type);
  return await caller[call].func(values);
}
