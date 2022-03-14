import { ApiKeyCredentials } from "@dydxprotocol/v3-client";
import fs from "fs";
import { resolve } from "path";

const path = "../../config/config.json";

export interface StarkKeyPair {
  publicKey: string;
  publicKeyYCoordinate?: string;
  privateKey: string;
}

export interface Config {
  EthAddress: string;
  apiCredentials?: ApiKeyCredentials;
  starkCredentials?: StarkKeyPair;
  developerMode: boolean;
}

export const EmptyConfig: Config = {
  EthAddress: "",
  developerMode: false,
};

export function readConfig(): Config {
  try {
    const rawData = fs.readFileSync(resolve(__dirname, path));
    return JSON.parse(rawData.toString());
  } catch (e) {
    writeConfig(EmptyConfig);
    return EmptyConfig;
  }
}

export function writeConfig(confing: Config): void {
  fs.writeFile(resolve(__dirname, path), JSON.stringify(confing), function (err) {
    if (err) {
      console.log(err);
    }
  });
}

export async function FlipDevelopMode(): Promise<void> {
  const conf = readConfig();
  conf.developerMode = !conf.developerMode;
  writeConfig(conf);
}
