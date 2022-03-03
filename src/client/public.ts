import {
  DydxClient,
  Market,
  CandleResolution,
  LeaderboardPnlPeriod,
  LeaderboardPnlSortBy,
  NftRevealType,
} from "@dydxprotocol/v3-client";
import { CallersMapping, Params } from "./utils";

const HTTP_HOST = "https://api.dydx.exchange";

const PubicClient: DydxClient = new DydxClient(HTTP_HOST, {
  apiTimeout: 15000,
});

export const PublicCallers: CallersMapping = {
  GetMarkets: {
    params: {
      market: Object.values(Market),
    },
    description: "Get one or all markets as well as metadata about each retrieved market.",
    func: async (values: any[]) => {
      const markets = await PubicClient.public.getMarkets(values[0]);
      return markets.markets;
    },
  },
  GetOrderbook: {
    params: {
      market: Object.values(Market),
    },
    description: "Returns bids and asks which are each Orderbook order arrays (price and size)",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getOrderBook(values[0]);
      return res;
    },
  },
  GetTrades: {
    params: {
      market: Object.values(Market),
    },
    description: "Get Trades, up to 100 records",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getTrades({ market: values[0] });
      return res;
    },
  },
  GetFastWithdrawal: {
    params: {},
    description: "Returns a map of all LP provider accounts that have available funds for fast withdrawals",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getFastWithdrawals({});
      return res;
    },
  },
  GetMarketStats: {
    params: {
      market: Object.values(Market),
      days: [1, 7, 30],
    },
    description: "Get an individual market's statistics over a set period of time or all available periods of time.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getStats({ market: values[0], days: values[1] });
      return res;
    },
  },
  GetHistoricalFunding: {
    params: {
      market: Object.values(Market),
    },
    description: "Get the historical funding rates for a market.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getHistoricalFunding({ market: values[0] });
      return res;
    },
  },
  CandlesforMarket: {
    params: {
      market: Object.values(Market),
      resolution: Object.values(CandleResolution),
      limit: Array.from(Array(100).keys()),
    },
    description: "Get the candle statistics for a market.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getCandles({ market: values[0], resolution: values[1], limit: values[2] });
      return res;
    },
  },
  GetConfig: {
    params: {},
    description: "Get the candle statistics for a market.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getConfig();
      return res;
    },
  },
  CheckIfUserExistsByAddress: {
    params: {
      userAddress: undefined,
    },
    description: "Check if a user exists for a given Ethereum address.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.doesUserExistWithAddress(values[0]);
      return res;
    },
  },
  CheckIfUserExistsByName: {
    params: {
      userName: undefined,
    },
    description: "Check if a username has been taken by a user.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.doesUserExistWithUsername(values[0]);
      return res;
    },
  },
  GetTime: {
    params: {},
    description: "Get the current time of the API server.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getTime();
      return res;
    },
  },
  GetLeaderboardPNLs: {
    params: {
      period: Object.values(LeaderboardPnlPeriod),
      sortBy: Object.values(LeaderboardPnlSortBy),
      limit: Array.from(Array(100).keys()),
    },
    description: "Get the top PNLs for a specified period and how they rank against each other.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getLeaderboardPnls({
        period: values[0],
        sortBy: values[1],
        limit: values[2],
      });
      return res;
    },
  },
  GetPublicRetroactiveMiningRewards: {
    params: {
      address: undefined,
    },
    description: "Get the retroactive mining rewards for an ethereum address.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getPublicRetroactiveMiningRewards(values[0]);
      return res;
    },
  },
  VerifyanEmailAddress: {
    params: {
      token: undefined,
    },
    description: "Verify an email address by providing the verification token sent to the email address.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.verifyEmail(values[0]);
      return res;
    },
  },
  GetCurrentlyRevealedHedgies: {
    params: {},
    description: "Get the currently revealed Hedgies for competition distribution.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getCurrentlyRevealedHedgies();
      return res;
    },
  },
  GetHistoricallyRevealedHedgies: {
    params: {
      NFTRevealType: ["daily", "weekly"], //Object.values(NftRevealType),
    },
    description: "Get the historically revealed Hedgies from competition distributions.",
    func: async (values: any[]) => {
      const res = await PubicClient.public.getHistoricallyRevealedHedgies({
        nftRevealType: values[0],
      });
      return res;
    },
  },
};

export async function ExecuteCall(call: string, values: any[]): Promise<any> {
  return await PublicCallers[call].func(values);
}
