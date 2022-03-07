import { Inquiry } from "./types";

export enum MainChoices {
  PublicCall = "Call Public Methods",
  PrivateCall = "Call Private Methods",
  Auth = "Authentication Options",
  PublicDesciptions = "See Public Method Descriptions",
  PrivateDesciptions = "See Private Method Descriptions",
  Quit = "Quit",
}

export function MainQuestion(): Inquiry[] {
  return [
    {
      type: "rawlist",
      name: "Main",
      message: "Select Option",
      choices: Object.values(MainChoices),
      default: [MainChoices.PublicCall],
    },
  ];
}
