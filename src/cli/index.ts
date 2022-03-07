import figlet from "figlet";
import clear from "clear";
import inquirer from "inquirer";
import {
  CallQuestion,
  ParamQuestions,
  MainQuestion,
  MainChoices,
  AuthMainQuestion,
  AuthChoices,
  AreYouSureQuestion,
  AddressQuestion,
  PrivateKeyQuestion,
} from "../questions/";
import {
  Desciptions,
  ResetAuth,
  isPrivateKeyInEnv,
  AuthOrLogin,
  configAddress,
  isAuthed,
  CallType,
  ExecuteCall,
} from "../client";
import { logBlue, logGreen, logYellow } from "../utils";
import { exit } from "process";

const YOU_SELECTED = "You selected ";
const { prompt } = inquirer;

export function Welcome() {
  clear();
  logGreen("🎉 ✨ 🔥 DyDX Public CLI by: 🎉 ✨ 🔥");
  logBlue(figlet.textSync("Chaos Labs"));
}

export async function MainSelector(): Promise<void> {
  const inquiry = MainQuestion();
  const answered = await prompt(inquiry);
  const choice = answered[inquiry[0].name];
  switch (choice) {
    case MainChoices.PublicCall:
      return CallSelector(CallType.public);
    case MainChoices.PrivateCall:
      return CallSelector(CallType.private);
    case MainChoices.Auth:
      return AuthSelector();
    case MainChoices.PublicDesciptions:
      console.log(Desciptions(CallType.public));
      return MainSelector();
    case MainChoices.PrivateCall:
      console.log(Desciptions(CallType.private));
      return MainSelector();
    case MainChoices.Quit:
      exit(0);
  }
}

export async function CallSelector(type: CallType): Promise<void> {
  if (type === CallType.private && !isAuthed()) {
    logYellow(`You must authenticate first - Go to ${MainChoices.Auth}`);
    return MainSelector();
  }
  const call = await selectCall(type);
  const params = await fillParams(call, type);
  console.log(call, params);
  const res = await ExecuteCall(call, params, type);
  console.log(res);
}

export async function AuthSelector(): Promise<void> {
  const inquiry = AuthMainQuestion();
  const answered = await prompt(inquiry);
  const choice = answered[inquiry[0].name];
  switch (choice) {
    case AuthChoices.Login:
      await LoginSelector();
      break;
    case AuthChoices.Reset:
      await ResetAuthSelector();
      break;
    case AuthChoices.Back:
      return MainSelector();
  }
}

export async function LoginSelector(): Promise<void> {
  let address = configAddress();
  if (address === "") {
    const inquiry = AddressQuestion();
    const answered = await prompt(inquiry);
    address = answered[inquiry[0].name];
  }
  logBlue(YOU_SELECTED + address);
  let key = "";
  if (!isPrivateKeyInEnv()) {
    const keyInquiry = PrivateKeyQuestion();
    const answered2 = await prompt(keyInquiry);
    key = answered2[keyInquiry[0].name];
    if ((key = "")) {
      logYellow("Expected private key in env (ETHEREUM_PRIVATE_KEY). Try again.");
      exit(0);
    }
  }
  await AuthOrLogin(address, key);
  logBlue("Logged in successfully.");
  return MainSelector();
}

export async function ResetAuthSelector(): Promise<void> {
  const inquiry = AreYouSureQuestion();
  const answered = await prompt(inquiry);
  const choice = answered[inquiry[0].name];
  logBlue(YOU_SELECTED + choice);
  ResetAuth();
  return MainSelector();
}

export async function selectCall(type: CallType): Promise<string> {
  const inquiry = CallQuestion(type);
  const answered = await prompt(inquiry);
  const choice = answered[inquiry[0].name];
  logBlue(YOU_SELECTED + choice);
  return choice;
}

export async function fillParams(call: string, type: CallType): Promise<string[]> {
  const inquiries = ParamQuestions(call, type);
  const choices = [];
  for (const inquiry of inquiries) {
    const answered = await prompt(inquiry);
    const choice = answered[inquiry[0].name];
    logBlue(YOU_SELECTED + choice);
    choices.push(choice);
  }
  return choices;
}
