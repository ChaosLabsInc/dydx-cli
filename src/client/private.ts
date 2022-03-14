import {
  AccountAction,
  AccountLeaderboardPnlPeriod,
  Market,
  OrderSide,
  OrderStatus,
  OrderType,
  PositionStatus,
} from "@dydxprotocol/v3-client";
import { CallersMapping, ParamType } from "./types";
import { Client } from "./utils";
import { configAddress } from "./auth";
import { AppendOptionalAll, OptinalValue } from "./helpers";

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
  GetAPIKeys: {
    params: {},
    description: "Get all api keys associated with an Ethereum address.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getApiKeys();
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
        optional: true,
        options: AppendOptionalAll(Object.values(Market)),
      },
      status: {
        type: ParamType.choice,
        optional: true,
        options: AppendOptionalAll(Object.values(PositionStatus)),
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
        market: OptinalValue(values[0]),
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
        optional: true,
        options: AppendOptionalAll(Object.values(AccountAction)),
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
  GetOrders: {
    params: {
      market: {
        type: ParamType.choice,
        optional: true,
        options: AppendOptionalAll(Object.values(Market)),
      },
      status: {
        type: ParamType.choice,
        optional: true,
        options: AppendOptionalAll(Object.values(OrderStatus)),
      },
      side: {
        type: ParamType.choice,
        optional: true,
        options: AppendOptionalAll(Object.values(OrderSide)),
      },
      type: {
        type: ParamType.choice,
        optional: true,
        options: AppendOptionalAll(Object.values(OrderType)),
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
    description: "Get orders for a user by specified parameters",
    func: async (values: any[]) => {
      const res = await Client.client.private.getOrders({
        market: OptinalValue(values[0]),
        status: OptinalValue(values[1]),
        side: OptinalValue(values[2]),
        type: OptinalValue(values[3]),
        limit: OptinalValue(values[4]),
        createdBeforeOrAt: OptinalValue(values[5]),
      });
      return res;
    },
  },
  GetActiveOrders: {
    params: {
      market: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(Market),
      },
      side: {
        type: ParamType.choice,
        optional: true,
        options: AppendOptionalAll(Object.values(OrderSide)),
      },
    },
    description: "Get active (not filled or canceled) orders for a user by specified parameters",
    func: async (values: any[]) => {
      const res = await Client.client.private.getActiveOrders(values[0], OptinalValue(values[1]));
      return res;
    },
  },
  GetOrderById: {
    params: {
      id: {
        type: ParamType.string,
        optional: false,
        options: undefined,
      },
    },
    description: "Get an order by id from the active orderbook and order history.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getOrderById(values[0]);
      return res;
    },
  },
  GetFills: {
    params: {
      market: {
        type: ParamType.choice,
        optional: true,
        options: AppendOptionalAll(Object.values(Market)),
      },
      orderId: {
        type: ParamType.string,
        optional: true,
        options: undefined,
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
    description: "Get Fills for a user by specified parameters.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getFills({
        market: OptinalValue(values[0]),
        orderId: OptinalValue(values[1]),
        limit: OptinalValue(values[2]),
        createdBeforeOrAt: OptinalValue(values[3]),
      });
      return res;
    },
  },
  GetFundingPayments: {
    params: {
      market: {
        type: ParamType.choice,
        optional: true,
        options: AppendOptionalAll(Object.values(Market)),
      },
      limit: {
        type: ParamType.number,
        optional: true,
        options: undefined,
        description: "Up to 100.",
      },
      effectiveBeforeOrAt: {
        type: ParamType.time,
        optional: true,
        options: undefined,
        description: "ISO formatted time. empty string for default",
      },
    },
    description: "Get Funding Payments made to an account.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getFundingPayments({
        market: OptinalValue(values[0]),
        limit: OptinalValue(values[1]),
        effectiveBeforeOrAt: OptinalValue(values[2]),
      });
      return res;
    },
  },
  GetHistoricalPNLTicks: {
    params: {
      effectiveBeforeOrAt: {
        type: ParamType.time,
        optional: true,
        options: undefined,
        description: "ISO formatted time. empty string for default",
      },
      effectiveAtOrAfter: {
        type: ParamType.time,
        optional: true,
        options: undefined,
        description: "ISO formatted time. empty string for default",
      },
    },
    description: "Get Historical PNL for an account during an interval.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getHistoricalPnl({
        createdBeforeOrAt: OptinalValue(values[0]),
        createdOnOrAfter: OptinalValue(values[1]),
      });
      return res;
    },
  },
  GetTradingRewards: {
    params: {
      epoch: {
        type: ParamType.number,
        optional: true,
        options: undefined,
      },
    },
    description: "Get the rewards weight of a given epoch.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getTradingRewards({
        epoch: OptinalValue(values[0]),
      });
      return res;
    },
  },
  GetLiquidityProviderRewards: {
    params: {
      epoch: {
        type: ParamType.number,
        optional: true,
        options: undefined,
      },
    },
    description: "Get the liquidity rewards of a given epoch.",
    func: async (values: any[]) => {
      const res = await Client.client.private.getLiquidityProviderRewards({
        epoch: OptinalValue(values[0]),
      });
      return res;
    },
  },
};

/*

-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
 
* Below Callers are not being used yet because of lack of support by non-MetaMask web3 node providers.

       These include the onboarding, ethPrivate sub-sections of the dYdX client.
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------

*/

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
  Recovery: {
    params: {},
    description: "Create new API key credentials for a user.",
    func: async (values: any[]) => {
      const res = await Client.client.ethPrivate.recovery(configAddress());
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
