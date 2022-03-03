import { Calls, ParamsKeys, ParamsKeyOptions } from "../client";

interface Inquiry {
  type: string;
  name: string;
  message: string;
  choices?: string[];
  default: any[];
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
    const options = ParamsKeyOptions(call, param);
    if (options !== undefined) {
      inquiries.push([
        {
          type: "rawlist",
          name: param,
          message: `Select param value for ${param}`,
          choices: options,
          default: [],
        },
      ]);
    } else {
      inquiries.push([
        {
          type: "string",
          name: param,
          message: `Insert param value for ${param}`,
          default: [""],
        },
      ]);
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
