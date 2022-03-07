import { Market, CandleResolution, LeaderboardPnlPeriod, LeaderboardPnlSortBy } from "@dydxprotocol/v3-client";
import { CallersMapping, ParamType } from "./types";
import { OptinalValue, Client } from "./utils";

export const PublicCallers: CallersMapping = {
  GetMarkets: {
    params: {
      market: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(Market),
      },
    },
    description: "Get one or all markets as well as metadata about each retrieved market.",
    func: async (values: any[]) => {
      const markets = await Client.public.getMarkets(values[0]);
      return markets.markets;
    },
  },
  GetOrderbook: {
    params: {
      market: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(Market),
      },
    },
    description: "Returns bids and asks which are each Orderbook order arrays (price and size)",
    func: async (values: any[]) => {
      const res = await Client.public.getOrderBook(values[0]);
      return res;
    },
  },
  GetTrades: {
    params: {
      market: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(Market),
      },
    },
    description: "Get Trades, up to 100 records",
    func: async (values: any[]) => {
      const res = await Client.public.getTrades({ market: values[0] });
      return res;
    },
  },
  GetFastWithdrawal: {
    params: {},
    description: "Returns a map of all LP provider accounts that have available funds for fast withdrawals",
    func: async (values: any[]) => {
      const res = await Client.public.getFastWithdrawals({});
      return res;
    },
  },
  GetMarketStats: {
    params: {
      market: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(Market),
      },
      days: {
        type: ParamType.choice,
        optional: false,
        options: [1, 7, 30],
      },
    },
    description: "Get an individual market's statistics over a set period of time or all available periods of time.",
    func: async (values: any[]) => {
      const res = await Client.public.getStats({ market: values[0], days: values[1] });
      return res;
    },
  },
  GetHistoricalFunding: {
    params: {
      market: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(Market),
      },
      effectiveBeforeOrAt: {
        type: ParamType.time,
        optional: true,
        options: undefined,
        description: "ISO formatted time. empty string for default",
      },
    },
    description: "Get the historical funding rates for a market.",
    func: async (values: any[]) => {
      const res = await Client.public.getHistoricalFunding({
        market: values[0],
        effectiveBeforeOrAt: OptinalValue(values[1]),
      });
      return res;
    },
  },
  CandlesforMarket: {
    params: {
      market: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(Market),
      },
      resolution: {
        type: ParamType.choice,
        optional: true,
        options: Object.values(CandleResolution),
      },
      limit: {
        type: ParamType.number,
        optional: true,
        options: undefined,
        description: "Up to 100.",
      },
    },
    description: "Get the candle statistics for a market.",
    func: async (values: any[]) => {
      const res = await Client.public.getCandles({
        market: values[0],
        resolution: OptinalValue(values[1]),
        limit: OptinalValue(values[2]),
      });
      return res;
    },
  },
  GetConfig: {
    params: {},
    description: "Get the candle statistics for a market.",
    func: async (values: any[]) => {
      const res = await Client.public.getConfig();
      return res;
    },
  },
  CheckIfUserExistsByAddress: {
    params: {
      userAddress: {
        type: ParamType.string,
        optional: false,
        options: undefined,
      },
    },
    description: "Check if a user exists for a given Ethereum address.",
    func: async (values: any[]) => {
      const res = await Client.public.doesUserExistWithAddress(values[0]);
      return res;
    },
  },
  CheckIfUserExistsByName: {
    params: {
      userName: {
        type: ParamType.string,
        optional: false,
        options: undefined,
      },
    },
    description: "Check if a username has been taken by a user.",
    func: async (values: any[]) => {
      const res = await Client.public.doesUserExistWithUsername(values[0]);
      return res;
    },
  },
  GetTime: {
    params: {},
    description: "Get the current time of the API server.",
    func: async (values: any[]) => {
      const res = await Client.public.getTime();
      return res;
    },
  },
  GetLeaderboardPNLs: {
    params: {
      period: {
        type: ParamType.choice,
        optional: false,
        options: Object.values(LeaderboardPnlPeriod),
      },
      sortBy: {
        type: ParamType.choice,
        optional: true,
        options: Object.values(LeaderboardPnlSortBy),
      },
      startingBeforeOrAt: {
        type: ParamType.time,
        optional: true,
        options: undefined,
        description: "ISO formatted time. empty string for default",
      },
      limit: {
        type: ParamType.number,
        optional: true,
        options: undefined,
        description: "Up to 100.",
      },
    },
    description: "Get the top PNLs for a specified period and how they rank against each other.",
    func: async (values: any[]) => {
      const res = await Client.public.getLeaderboardPnls({
        period: values[0],
        sortBy: OptinalValue(values[1]),
        startingBeforeOrAt: OptinalValue(values[2]),
        limit: OptinalValue(values[3]),
      });
      return res;
    },
  },
  GetPublicRetroactiveMiningRewards: {
    params: {
      address: {
        type: ParamType.string,
        optional: false,
        options: undefined,
      },
    },
    description: "Get the retroactive mining rewards for an ethereum address.",
    func: async (values: any[]) => {
      const res = await Client.public.getPublicRetroactiveMiningRewards(values[0]);
      return res;
    },
  },
  VerifyanEmailAddress: {
    params: {
      token: {
        type: ParamType.string,
        optional: false,
        options: undefined,
      },
    },
    description: "Verify an email address by providing the verification token sent to the email address.",
    func: async (values: any[]) => {
      const res = await Client.public.verifyEmail(values[0]);
      return res;
    },
  },
  GetCurrentlyRevealedHedgies: {
    params: {},
    description: "Get the currently revealed Hedgies for competition distribution.",
    func: async (values: any[]) => {
      const res = await Client.public.getCurrentlyRevealedHedgies();
      return res;
    },
  },
  GetHistoricallyRevealedHedgies: {
    params: {
      NFTRevealType: {
        type: ParamType.choice,
        optional: false,
        options: ["daily", "weekly"], //Object.values(NftRevealType),
      },
    },
    description: "Get the historically revealed Hedgies from competition distributions.",
    func: async (values: any[]) => {
      const res = await Client.public.getHistoricallyRevealedHedgies({
        nftRevealType: values[0],
      });
      return res;
    },
  },
};
