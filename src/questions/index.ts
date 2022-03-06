import { Calls, ParamsKeys, ParamFromKey, ParamType } from "../client";

interface Inquiry {
  type: string;
  name: string;
  message: string;
  choices?: string[];
  default: any;
}

export enum MainChoices {
  Call = "Call methods",
  Desciptions = "See method descriptions",
  Quit = "Quit",
}

export function MainQuestion(): Inquiry[] {
  return [
    {
      type: "rawlist",
      name: "Main",
      message: "Select Option",
      choices: Object.values(MainChoices),
      default: [MainChoices.Call],
    },
  ];
}

export function CallQuestion(): Inquiry[] {
  return [
    {
      type: "rawlist",
      name: "Calls",
      message: "Select DyDx call",
      choices: Calls(),
      default: [],
    },
  ];
}

export function ParamQuestions(call: string): Inquiry[][] {
  const inquiries = [];
  for (const param of ParamsKeys(call)) {
    const { options, type, description, optional } = ParamFromKey(call, param);
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

// getPriceChangeQuestion: function getPriceChangeQuestion() {
//   return [
//     {
//       type: "number",
//       name: QUESTION_PROMPT_NAMES.MOCK_PRICE_VALUE,
//       message: "Select the new price",
//       default: [0],
//     },
//   ];
// },
