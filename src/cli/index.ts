import figlet from "figlet";
import clear from "clear";
import inquirer from "inquirer";
import { CallQuestion, ParamQuestions, MainQuestion, MainChoices } from "../questions";
import { Desciptions } from "../client";
import Utils from "../utils";
import { exit } from "process";

const YOU_SELECTED = "You selected ";
const { logBlue, logGreen, logYellow } = Utils;
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
    case MainChoices.Desciptions:
      console.log(Desciptions());
    case MainChoices.Quit:
      exit(0);
  }
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
