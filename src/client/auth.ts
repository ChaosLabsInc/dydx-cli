import { ApiKeyCredentials } from "@dydxprotocol/v3-client";
import { readConfig, writeConfig, Config, EmptyConfig, StarkKeyPair } from "../utils";
import { Client } from "./utils";

export function isAuthed(conf?: Config): boolean {
  conf = conf ?? readConfig();
  if (conf.apiCredentials !== undefined && conf.apiCredentials.key !== "" && conf.apiCredentials.key !== undefined) {
    return true;
  }
  return false;
}

export function isStarkAuthed(conf?: Config): boolean {
  conf = conf ?? readConfig();
  if (
    conf.starkCredentials !== undefined &&
    conf.starkCredentials.publicKey !== "" &&
    conf.starkCredentials.publicKey !== undefined
  ) {
    return true;
  }
  return false;
}

export function configAddress(): string {
  const conf = readConfig();
  return conf.EthAddress;
}

export function isPrivateKeyInEnv(): boolean {
  const ethKey = process.env.ETHEREUM_PRIVATE_KEY;
  if (ethKey === undefined) {
    return false;
  }
  return true;
}

export async function MasterAuthOrLogin(): Promise<void> {
  await APIAuthOrLogin();
  // await StarkAuthOrLogin();
}

export async function APIAuthOrLogin(address?: string, inputPrivateKey?: string): Promise<void> {
  const conf = readConfig();
  if (!address && !conf.EthAddress) {
    throw new Error("Eth Address not provided.");
  }
  if (address !== conf.EthAddress && address) {
    conf.EthAddress = address;
    writeConfig(conf);
  }
  if (!isAuthed(conf)) {
    const credentials = await Auth(conf.EthAddress, inputPrivateKey);
    conf.apiCredentials = credentials;
    writeConfig(conf);
  }
  Client.client.apiKeyCredentials = conf.apiCredentials;
  return;
}

export async function StarkAuthOrLogin(credentials?: StarkKeyPair): Promise<void> {
  const conf = readConfig();
  if (!isStarkAuthed(conf)) {
    if (!credentials) {
      throw new Error("Stark login required.");
    }
    conf.starkCredentials = credentials;
    writeConfig(conf);
  }
  await Client.OverWriteClientOptions({
    starkPrivateKey: conf.starkCredentials,
  });
  return;
}

//Auth - require ETHEREUM_PRIVATE_KEY in the env variable.
async function Auth(address: string, inputPrivateKey?: string): Promise<ApiKeyCredentials> {
  let ethKey = inputPrivateKey;
  if (!ethKey) {
    ethKey = process.env.ETHEREUM_PRIVATE_KEY;
    if (ethKey === undefined) {
      throw new Error("Need to provide eth private through env: 'export ETHEREUM_PRIVATE_KEY=<key> or through CLI");
    }
  }
  Client.client.web3?.eth.accounts.wallet.add(ethKey as string);
  const credentials = await Client.client.onboarding.recoverDefaultApiCredentials(address);
  return credentials;
}

export function ResetAuth(): void {
  writeConfig(EmptyConfig);
}
