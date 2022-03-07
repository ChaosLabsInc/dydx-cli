import { ApiKeyCredentials } from "@dydxprotocol/v3-client";
import fs from "fs";
import { resolve } from "path";
// import ConingFile from "../../config/config.json";

const path = "../../config/config.json";

export interface Config {
  EthAddress: string;
  apiCredentials?: ApiKeyCredentials;
}

export const EmptyConfig: Config = {
  EthAddress: "",
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
