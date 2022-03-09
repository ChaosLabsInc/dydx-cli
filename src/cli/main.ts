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
  StarkCredentialQuestions,
} from "../questions/";
import {
  Desciptions,
  ResetAuth,
  isPrivateKeyInEnv,
  APIAuthOrLogin,
  configAddress,
  isAuthed,
  CallType,
  ExecuteCall,
  StarkAuthOrLogin,
} from "../client";
import { logBlue, logGreen, logYellow, StarkKeyPair } from "../utils";
import { exit } from "process";
import Table from "cli-table3";

const YOU_SELECTED = "You selected ";
const { prompt } = inquirer;

export function Welcome() {
  clear();
  logGreen("🎉 ✨ 🔥 dYdX Public CLI by: 🎉 ✨ 🔥");
  logBlue(figlet.textSync("Chaos Labs"));
  logAccountDetails();
}

export async function MainSelector(): Promise<void> {
  const inquiry = MainQuestion();
  const answered = await prompt(inquiry);
  const choice = answered[inquiry[0].name];
  switch (choice) {
    case MainChoices.PublicCall:
      return await CallSelector(CallType.public);
    case MainChoices.PrivateCall:
      return await CallSelector(CallType.private);
    case MainChoices.Auth:
      return await AuthSelector();
    case MainChoices.PublicDesciptions:
      consoleDescriptions(Desciptions(CallType.public));
      return await MainSelector();
    case MainChoices.PrivateDesciptions:
      consoleDescriptions(Desciptions(CallType.private));
      return await MainSelector();
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
  return await MainSelector();
}

export async function AuthSelector(): Promise<void> {
  const inquiry = AuthMainQuestion();
  const answered = await prompt(inquiry);
  const choice = answered[inquiry[0].name];
  switch (choice) {
    case AuthChoices.Login:
      await LoginSelector();
      break;
    // case AuthChoices.Stark:
    //   await StarkLoginSelector();
    //   break;
    case AuthChoices.Reset:
      await ResetAuthSelector();
      break;
    case AuthChoices.Back:
      return MainSelector();
  }
}

function logAccountDetails(): void {
  const account = configAddress();
  const accountState = account !== "" ? `${account}` : `Logged Out`;
  const authed = isAuthed();
  const authState = authed ? `Authenticated` : `Logged Out`;
  const accountLog = `* Account: <${accountState}>`;
  const authLog = `* API: <${authState}>`;
  logGreen(accountLog);
  logGreen(authLog);
}

async function StarkLoginSelector(): Promise<void> {
  const inquiries = StarkCredentialQuestions();
  const choices = new Map<string, string>();
  for (const inquiry of inquiries) {
    const answered = await prompt(inquiry);
    const choice = answered[inquiry[0].name];
    logBlue(YOU_SELECTED + choice);
    choices.set(inquiry[0].name, choice);
  }
  if (!choices.has("publicKey") || !choices.get("publicKeyYCoordinate") || !choices.get("privateKey")) {
    logYellow("Invalid input for Stark credentials");
    exit(0);
  }
  const credentials: StarkKeyPair = {
    publicKey: choices.get("publicKey") ?? "",
    publicKeyYCoordinate: choices.get("publicKeyYCoordinate") ?? "",
    privateKey: choices.get("privateKey") ?? "",
  };
  await StarkAuthOrLogin(credentials);
  logBlue("Logged in successfully.");
  return MainSelector();
}

async function LoginSelector(): Promise<void> {
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
    if (key === "") {
      logYellow("Expected private key in env (ETHEREUM_PRIVATE_KEY). Try again.");
      exit(0);
    }
  }
  await APIAuthOrLogin(address, key);
  logBlue("Logged in successfully.");
  return MainSelector();
}

async function ResetAuthSelector(): Promise<void> {
  const inquiry = AreYouSureQuestion();
  const answered = await prompt(inquiry);
  const choice = answered[inquiry[0].name];
  logBlue(YOU_SELECTED + choice);
  ResetAuth();
  return MainSelector();
}

async function selectCall(type: CallType): Promise<string> {
  const inquiry = CallQuestion(type);
  const answered = await prompt(inquiry);
  const choice = answered[inquiry[0].name];
  logBlue(YOU_SELECTED + choice);
  return choice;
}

async function fillParams(call: string, type: CallType): Promise<string[]> {
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

function consoleDescriptions(data: string[][]) {
  const table = new Table({
    head: ["Method", "Descriptions"],
  });
  for (const d of data) {
    table.push(d);
  }
  console.log(table.toString());
}
