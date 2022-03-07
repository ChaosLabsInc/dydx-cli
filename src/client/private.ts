import {} from "@dydxprotocol/v3-client";
import { CallersMapping, ParamType } from "./types";
import { OptinalValue, Client } from "./utils";
import { configAddress } from "./auth";

export const EthPrivateCallers: CallersMapping = {
  RegisterAPIKey: {
    params: {},
    description: "Create new API key credentials for a user.",
    func: async (values: any[]) => {
      const res = await Client.ethPrivate.createApiKey(configAddress());
      return res;
    },
  },
};

export const PrivateCallers: CallersMapping = {
  RegisterAPIKey: {
    params: {},
    description: "Create new API key credentials for a user.",
    func: async (values: any[]) => {
      const res = await Client.ethPrivate.createApiKey(configAddress());
      return res;
    },
  },
  GetRegistration: {
    params: {},
    description:
      "Gets the dYdX provided Ethereum signature required to send a registration transaction to the Starkware smart contract.",
    func: async (values: any[]) => {
      const res = await Client.private.getRegistration();
      return res;
    },
  },
  GetUser: {
    params: {},
    description: "return the user and user information.",
    func: async (values: any[]) => {
      const res = await Client.private.getUser();
      return res;
    },
  },
};
