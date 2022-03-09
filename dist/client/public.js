"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicCallers = void 0;
const v3_client_1 = require("@dydxprotocol/v3-client");
const types_1 = require("./types");
const utils_1 = require("./utils");
const helpers_1 = require("./helpers");
exports.PublicCallers = {
    GetMarkets: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: false,
                options: Object.values(v3_client_1.Market),
            },
        },
        description: "Get one or all markets as well as metadata about each retrieved market.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const markets = yield utils_1.Client.client.public.getMarkets(values[0]);
            return markets.markets;
        }),
    },
    GetOrderbook: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: false,
                options: Object.values(v3_client_1.Market),
            },
        },
        description: "Returns bids and asks which are each Orderbook order arrays (price and size)",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getOrderBook(values[0]);
            return res;
        }),
    },
    GetTrades: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: false,
                options: Object.values(v3_client_1.Market),
            },
        },
        description: "Get Trades, up to 100 records",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getTrades({ market: values[0] });
            return res;
        }),
    },
    GetFastWithdrawal: {
        params: {},
        description: "Returns a map of all LP provider accounts that have available funds for fast withdrawals",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getFastWithdrawals({});
            return res;
        }),
    },
    GetMarketStats: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.Market)),
            },
            days: {
                type: types_1.ParamType.choice,
                optional: false,
                options: [1, 7, 30],
            },
        },
        description: "Get an individual market's statistics over a set period of time or all available periods of time.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getStats({ market: (0, helpers_1.OptinalValue)(values[0]), days: values[1] });
            return res;
        }),
    },
    GetHistoricalFunding: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: false,
                options: Object.values(v3_client_1.Market),
            },
            effectiveBeforeOrAt: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
        },
        description: "Get the historical funding rates for a market.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getHistoricalFunding({
                market: values[0],
                effectiveBeforeOrAt: (0, helpers_1.OptinalValue)(values[1]),
            });
            return res;
        }),
    },
    CandlesforMarket: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: false,
                options: Object.values(v3_client_1.Market),
            },
            resolution: {
                type: types_1.ParamType.choice,
                optional: true,
                options: Object.values(v3_client_1.CandleResolution),
            },
            limit: {
                type: types_1.ParamType.number,
                optional: true,
                options: undefined,
                description: "Up to 100.",
            },
        },
        description: "Get the candle statistics for a market.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getCandles({
                market: values[0],
                resolution: (0, helpers_1.OptinalValue)(values[1]),
                limit: (0, helpers_1.OptinalValue)(values[2]),
            });
            return res;
        }),
    },
    GetConfig: {
        params: {},
        description: "Get the candle statistics for a market.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getConfig();
            return res;
        }),
    },
    CheckIfUserExistsByAddress: {
        params: {
            userAddress: {
                type: types_1.ParamType.string,
                optional: false,
                options: undefined,
            },
        },
        description: "Check if a user exists for a given Ethereum address.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.doesUserExistWithAddress(values[0]);
            return res;
        }),
    },
    CheckIfUserExistsByName: {
        params: {
            userName: {
                type: types_1.ParamType.string,
                optional: false,
                options: undefined,
            },
        },
        description: "Check if a username has been taken by a user.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.doesUserExistWithUsername(values[0]);
            return res;
        }),
    },
    GetTime: {
        params: {},
        description: "Get the current time of the API server.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getTime();
            return res;
        }),
    },
    GetLeaderboardPNLs: {
        params: {
            period: {
                type: types_1.ParamType.choice,
                optional: false,
                options: Object.values(v3_client_1.LeaderboardPnlPeriod),
            },
            sortBy: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.LeaderboardPnlSortBy)),
            },
            startingBeforeOrAt: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
            limit: {
                type: types_1.ParamType.number,
                optional: true,
                options: undefined,
                description: "Up to 100.",
            },
        },
        description: "Get the top PNLs for a specified period and how they rank against each other.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getLeaderboardPnls({
                period: values[0],
                sortBy: (0, helpers_1.OptinalValue)(values[1]),
                startingBeforeOrAt: (0, helpers_1.OptinalValue)(values[2]),
                limit: (0, helpers_1.OptinalValue)(values[3]),
            });
            return res;
        }),
    },
    GetPublicRetroactiveMiningRewards: {
        params: {
            address: {
                type: types_1.ParamType.string,
                optional: false,
                options: undefined,
            },
        },
        description: "Get the retroactive mining rewards for an ethereum address.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getPublicRetroactiveMiningRewards(values[0]);
            return res;
        }),
    },
    VerifyanEmailAddress: {
        params: {
            token: {
                type: types_1.ParamType.string,
                optional: false,
                options: undefined,
            },
        },
        description: "Verify an email address by providing the verification token sent to the email address.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.verifyEmail(values[0]);
            return res;
        }),
    },
    GetCurrentlyRevealedHedgies: {
        params: {},
        description: "Get the currently revealed Hedgies for competition distribution.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getCurrentlyRevealedHedgies();
            return res;
        }),
    },
    GetHistoricallyRevealedHedgies: {
        params: {
            NFTRevealType: {
                type: types_1.ParamType.choice,
                optional: false,
                options: ["daily", "weekly"], //Object.values(NftRevealType),
            },
        },
        description: "Get the historically revealed Hedgies from competition distributions.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.public.getHistoricallyRevealedHedgies({
                nftRevealType: values[0],
            });
            return res;
        }),
    },
};
//# sourceMappingURL=public.js.map