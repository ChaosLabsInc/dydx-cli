import { DydxClient, Market, MarketsResponseObject, HistoricalFundingResponseObject } from "@dydxprotocol/v3-client";
import { CallersMapping, Params } from "./utils";

const HTTP_HOST = "https://api.dydx.exchange";

const PubicClient: DydxClient = new DydxClient(HTTP_HOST, {
  apiTimeout: 15000,
});

export const PublicCallers: CallersMapping = {
  markets: {
    params: {
      market: Object.values(Market),
    },
    description: "Get one or all markets as well as metadata about each retrieved market.",
    func: async (values: any[]) => {
      const markets = await PubicClient.public.getMarkets(values[0]);
      return markets.markets;
    },
  },
};

export async function ExecuteCall(call: string, values: any[]): Promise<any> {
  return await PublicCallers[call].func(values);
}
