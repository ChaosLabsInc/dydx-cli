import { Inquiry } from "./types";

export enum MainChoices {
  PublicCall = "Call Public Methods",
  PrivateCall = "Call Private Methods",
  Auth = "Authentication",
  PublicDesciptions = "See Public Method Descriptions",
  PrivateDesciptions = "See Private Method Descriptions",
  DeveloperMode = "Developer Mode",
  Quit = "Quit",
}

export enum YesNoChoice {
  yes = "yes",
  no = "no",
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

export function AreYouSureQuestion(): Inquiry[] {
  return [
    {
      type: "rawlist",
      name: "AreYouSure",
      message: "Are you sure you want to continue?",
      choices: Object.values(YesNoChoice),
      default: YesNoChoice.yes,
    },
  ];
}

export function DeveloperQuesstion(): Inquiry[] {
  return [
    {
      type: "rawlist",
      name: "Developer Mode",
      message: "Turn On/Off Developer Mode?",
      choices: Object.values(YesNoChoice),
      default: YesNoChoice.yes,
    },
  ];
}
