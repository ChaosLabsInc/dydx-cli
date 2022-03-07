import { Market, LeaderboardPnlPeriod, LeaderboardPnlSortBy } from "@dydxprotocol/v3-client";
import { CallersMapping, ParamType } from "./types";
import { OptinalValue, Client } from "./utils";

export const PrivateCallers: CallersMapping = {
  Example: {
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
};
