import { Calls, ParamsKeys, ParamFromKey, ParamType, CallType } from "../client";
import { Inquiry } from "./types";

export function CallQuestion(type: CallType): Inquiry[] {
  return [
    {
      type: "rawlist",
      name: "Calls",
      message: "Select DyDx call",
      choices: Calls(type),
      default: [],
    },
  ];
}

export function ParamQuestions(call: string, callType: CallType): Inquiry[][] {
  const inquiries = [];
  for (const param of ParamsKeys(call, callType)) {
    const { options, type, description, optional } = ParamFromKey(call, param, callType);
    let message = "";
    const optionalM = optional ? "[Optional] " : "";
    const paramM = `${optionalM}${param}`;
    switch (type) {
      case ParamType.choice:
        message = description
          ? `Select param value for ${paramM} - ${description}`
          : `Select param value for ${paramM}.`;
        inquiries.push([
          {
            type: "rawlist",
            name: param,
            message: message,
            choices: options,
            default: [],
          },
        ]);
        break;
      case ParamType.number:
        message = description
          ? `Insert param value for ${paramM} - ${description}`
          : `Insert param value for ${paramM}.`;
        inquiries.push([
          {
            type: "number",
            name: param,
            message: message,
            default: optional ? -1 : 0,
          },
        ]);
        break;
      case ParamType.string:
        message = description
          ? `Insert param value for ${paramM} - ${description}`
          : `Insert param value for ${paramM}.`;
        inquiries.push([
          {
            type: "string",
            name: param,
            message: message,
            default: optional ? undefined : "",
          },
        ]);
        break;
      case ParamType.time:
        message = `Insert param value for ${paramM} in ISO format (2022-01-13T18:46:01) or leave empty for current time.`;
        inquiries.push([
          {
            type: "string",
            name: param,
            message: message,
            default: optional ? undefined : "",
          },
        ]);
        break;
      default:
        throw new Error("Param type invalid");
    }
  }
  return inquiries;
}
