import { AccountAction, AccountLeaderboardPnlPeriod, Market, PositionStatus } from "@dydxprotocol/v3-client";
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

export const PrviateOnboardingCallers: CallersMapping = {
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
};

export const PrivateCallers: CallersMapping = {
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
  GetAccount: {
    params: {},
    description:
      "Get an account for a user by id. Using the client, the id will be generated with client information and an Ethereum address.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getAccount(configAddress());
      return res;
    },
  },
  GetAccounts: {
    params: {},
    description: "Get all accounts for a user.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getAccounts();
      return res;
    },
  },
  AccountLeaderboardPNLs: {
    params: {
      period: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(AccountLeaderboardPnlPeriod),
      },
      startingBeforeOrAt: {
        type: ParamType.time,
        optional: true,
        options: undefined,
        description: "ISO formatted time. empty string for default",
      },
    },
    description: "Get an account's personal leaderboard pnls.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getAccountLeaderboardPnl(values[0], OptinalValue(values[1]));
      return res;
    },
  },
  GetPositions: {
    params: {
      market: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(Market),
      },
      status: {
        type: ParamType.choice,
        optional: true,
        options: Object.values(PositionStatus),
      },
      limit: {
        type: ParamType.number,
        optional: true,
        options: undefined,
        description: "Up to 100.",
      },
      createdBeforeOrAt: {
        type: ParamType.time,
        optional: true,
        options: undefined,
        description: "ISO formatted time. empty string for default",
      },
    },
    description: "Get all current positions for a user by specified query parameters.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getPositions({
        market: values[0],
        status: OptinalValue(values[1]),
        limit: OptinalValue(values[2]),
        createdBeforeOrAt: OptinalValue(values[3]),
      });
      return res;
    },
  },
  GetTransfers: {
    params: {
      type: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(AccountAction),
      },
      limit: {
        type: ParamType.number,
        optional: true,
        options: undefined,
        description: "Up to 100.",
      },
      createdBeforeOrAt: {
        type: ParamType.time,
        optional: true,
        options: undefined,
        description: "ISO formatted time. empty string for default",
      },
    },
    description: "Get all current positions for a user by specified query parameters.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getTransfers({
        type: OptinalValue(values[0]),
        limit: OptinalValue(values[1]),
        createdBeforeOrAt: OptinalValue(values[2]),
      });
      return res;
    },
  },
};
