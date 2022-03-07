import { DydxClient } from "@dydxprotocol/v3-client";
import { ClientOptions } from "@dydxprotocol/v3-client/build/src/dydx-client";
import Web3 from "web3";

const HTTP_HOST = "https://api.dydx.exchange";
const STAGING_HTTP_HOST = "https://api.stage.dydx.exchange";

export class ClientSingleton {
  public client: DydxClient;
  constructor() {
    this.client = BaseClient({});
  }

  //   setNewClient(c: DydxClient) {
  //     this.client = c;
  //   }

  //   async OverwriteWeb3() {
  //     const newC = await ClientWithWeb3(this.client);
  //     this.client = newC;
  //   }
}

export function BaseClient(options: ClientOptions): DydxClient {
  return new DydxClient(process.env.STAGING ? STAGING_HTTP_HOST : HTTP_HOST, {
    apiTimeout: 15000,
    apiKeyCredentials: options.apiKeyCredentials,
    web3: options.web3 ?? new Web3(),

    //TODO :
    starkPrivateKey: options.starkPrivateKey ?? {
      publicKey: "0756b137c2f3acda782d37a64047d036d3ba03b0a974ca4fc49b11d1b9aa0877",
      publicKeyYCoordinate: "03cb8aab8e056dff1f6bca38eabfe960aeea9a2f2d3a5ac98e829bb7dc4d027d",
      privateKey: "0467bbf39aebf232e18139b7555743d45ec6fc5a6106cf2c166162f26f068e8b",
    },
    // END of TODO
  });
}

export async function ClientWithWeb3(c: DydxClient, w3: Web3): Promise<DydxClient> {
  return BaseClient({
    web3: w3,
    starkPrivateKey: c.starkPrivateKey,
    apiKeyCredentials: c.apiKeyCredentials,
  });
}
