import { Inquiry } from "./types";

export enum AuthChoices {
  Reset = "Reset Credentials",
  Login = "Login Using Ethereum Private Key",
  // Stark = "Login Using Stark Credentials",
  Back = "Back",
}

export function AuthMainQuestion(): Inquiry[] {
  return [
    {
      type: "rawlist",
      name: "Main",
      message: "Select Option",
      choices: Object.values(AuthChoices),
      default: [AuthChoices.Login],
    },
  ];
}

export function AreYouSureQuestion(): Inquiry[] {
  return [
    {
      type: "rawlist",
      name: "AreYouSure",
      message: "Are you sure you want to continue?",
      choices: ["yes", "no"],
      default: "yes",
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
        "Insert account private key or make sure it is set using `export ETHEREUM_PRIVATE_KEY=<key>` (and press enter).",
      default: "",
    },
  ];
}
