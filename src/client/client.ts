import { DydxClient } from "@dydxprotocol/v3-client";
import { ClientOptions } from "@dydxprotocol/v3-client/build/src/dydx-client";
import Web3 from "web3";

const HTTP_HOST = "https://api.dydx.exchange";
const STAGING_HTTP_HOST = "https://api.stage.dydx.exchange";

const INFURA_NODE_URL = "https://mainnet.infura.io/v3/7b6391c3ea66406e83d69e9934fda70c";
const INFURA_ROPSTEN_NODE_URL = "https://ropsten.infura.io/v3/7b6391c3ea66406e83d69e9934fda70c";

export class ClientSingleton {
  public client: DydxClient;
  constructor() {
    this.client = BaseClient({});
  }

  async OverWriteClientOptions(options: ClientOptions) {
    const newC = await OverwriteClient(this.client, options);
    this.client = newC;
  }
}

function BaseClient(options: ClientOptions): DydxClient {
  const nodeUrl = process.env.STAGING ? INFURA_ROPSTEN_NODE_URL : INFURA_NODE_URL;
  const clientUrl = process.env.STAGING ? STAGING_HTTP_HOST : HTTP_HOST;
  return new DydxClient(clientUrl, {
    apiTimeout: 15000,
    apiKeyCredentials: options.apiKeyCredentials,
    web3: options.web3 ?? new Web3(new Web3.providers.HttpProvider(nodeUrl)),
    starkPrivateKey: options.starkPrivateKey,
  });
}

async function OverwriteClient(c: DydxClient, options: ClientOptions): Promise<DydxClient> {
  return BaseClient({
    apiTimeout: options.apiTimeout ?? c.apiTimeout,
    web3: options.web3 ?? c.web3,
    starkPrivateKey: options.starkPrivateKey ?? c.starkPrivateKey,
    apiKeyCredentials: options.apiKeyCredentials ?? c.apiKeyCredentials,
  });
}
