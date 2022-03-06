import { Inquiry } from "./types";

export enum MainChoices {
  Call = "Call Methods",
  Auth = "Authentication Options",
  Desciptions = "See Method Descriptions",
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
