import { readConfig } from "../utils";
import { Inquiry } from "./types";

export enum AuthChoices {
  Stark = "Login Using Stark Credentials",
  Login = "Login Using Ethereum Private Key",
  Reset = "Reset Credentials",
  Back = "Back",
}

export function AuthMainQuestion(): Inquiry[] {
  let choices = Object.values(AuthChoices);
  if (!readConfig().developerMode) {
    choices = choices.filter((v) => v !== AuthChoices.Login);
  }
  return [
    {
      type: "rawlist",
      name: "Main",
      message: "Select Option",
      choices: choices,
      default: [AuthChoices.Login],
    },
  ];
}
export function AddressQuestion(): Inquiry[] {
  return [
    {
      type: "string",
      name: "Address",
      message: "Insert account Ethereum address",
      default: "",
    },
  ];
}

export function StarkCredentialQuestions(): Inquiry[][] {
  return [
    [
      {
        type: "string",
        name: "publicKey",
        message: "Insert account Stark publicKey",
        default: "",
      },
    ],
    [
      {
        type: "string",
        name: "publicKeyYCoordinate",
        message: "Insert account Stark publicKeyYCoordinate",
        default: "",
      },
    ],
    [
      {
        type: "string",
        name: "privateKey",
        message: "Insert account Stark privateKey",
        default: "",
      },
    ],
  ];
}

export function PrivateKeyQuestion(): Inquiry[] {
  return [
    {
      type: "string",
      name: "private key",
      message:
        "Insert account private key or make sure it is set using `export ETHEREUM_PRIVATE_KEY=<key>` (and press enter). It will not be stored.",
      default: "",
    },
  ];
}
