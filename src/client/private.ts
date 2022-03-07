import {} from "@dydxprotocol/v3-client";
import { CallersMapping, ParamType } from "./types";
import { OptinalValue, Client } from "./utils";
import { configAddress } from "./auth";

export const EthPrivateCallers: CallersMapping = {
  RegisterAPIKey: {
    //https://github.com/dydxprotocol/v3-client/issues/126
    params: {},
    description: "Create new API key credentials for a user.",
    func: async (values: any[]) => {
      const res = await Client.client.ethPrivate.createApiKey(configAddress());
      return res;
    },
  },
};

export const PrivateCallers: CallersMapping = {
  CreateUser: {
    params: {
      starkKey: {
        type: ParamType.string,
        optional: false,
        options: undefined,
      },
      starkKeyYCoordinate: {
        type: ParamType.string,
        optional: false,
        options: undefined,
      },
    },
    description: "This is used by the frontend app to derive the STARK key pair in a way that is recoverable",
    func: async (values: any[]) => {
      const res = await Client.client.onboarding.createUser(
        {
          starkKey: values[0],
          starkKeyYCoordinate: values[1],
        },
        configAddress()
      );
      return res;
    },
  },
  DeriveStarkKey: {
    params: {},
    description: "This is used by the frontend app to derive the STARK key pair in a way that is recoverable",
    func: async (values: any[]) => {
      const res = await Client.client.onboarding.deriveStarkKey(configAddress());
      return res;
    },
  },
  GetRegistration: {
    params: {},
    description:
      "Gets the dYdX provided Ethereum signature required to send a registration transaction to the Starkware smart contract.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getRegistration();
      return res;
    },
  },
  GetUser: {
    params: {},
    description: "return the user and user information.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getUser();
      return res;
    },
  },
};
