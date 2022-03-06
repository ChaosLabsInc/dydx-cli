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
import { Desciptions, ResetAuth, isPrivateKeyInEnv, AuthOrLogin, configAddress } from "../client";
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
    case MainChoices.Call:
      return;
    case MainChoices.Auth:
      return Authelector();
    case MainChoices.Desciptions:
      console.log(Desciptions());
      return MainSelector();
    case MainChoices.Quit:
      exit(0);
  }
}

export async function Authelector(): Promise<void> {
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
      logBlue("Expected private key in env (ETHEREUM_PRIVATE_KEY). Try again.");
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

export async function selectCall(): Promise<string> {
  const inquiry = CallQuestion();
  const answered = await prompt(inquiry);
  const choice = answered[inquiry[0].name];
  logBlue(YOU_SELECTED + choice);
  return choice;
}

export async function fillParams(call: string): Promise<string[]> {
  const inquiries = ParamQuestions(call);
  const choices = [];
  for (const inquiry of inquiries) {
    const answered = await prompt(inquiry);
    const choice = answered[inquiry[0].name];
    logBlue(YOU_SELECTED + choice);
    choices.push(choice);
  }
  return choices;
}

// export async function selectCall(): Promise<string> {
//   const valueChangeSelection = await prompt(Questions.getPriceChangeQuestion());
//   logBlue(YOU_SELECTED + valueChangeSelection[QUESTION_NAMES.MOCK_PRICE_VALUE]);
//   return valueChangeSelection[QUESTION_NAMES.MOCK_PRICE_VALUE];
// }

// async function mock(pool: Pool, twapInteraval: number, price: number): Promise<void> {
//   try {
//     const mocker = new UniSwapPoolMocker(rpcURL, pool.address);
//     const originalPrices = await mocker.prices(twapInteraval, pool.decimals.token0, pool.decimals.token1);
//     logBlue(`Original Prices ${originalPrices}`);
//     await mocker.MockPrice(price, twapInteraval, pool.decimals.token0, pool.decimals.token1);
//     const mockedPrices = await mocker.prices(twapInteraval, pool.decimals.token0, pool.decimals.token1);
//     logBlue(`New Prices ${mockedPrices}`);
//     logBlue(`Let's get to work 💼 😏 ...`);
//     logYellow(figlet.textSync("Celebrate"));
//     logBlue(`You are a shadowy super code 🔥 ✨ 😏 ...`);
//   } catch (err) {
//     logYellow(`${err}`);
//   }
// }
