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
exports.PrviateOnboardingCallers = exports.EthPrivateCallers = exports.PrivateCallers = void 0;
const v3_client_1 = require("@dydxprotocol/v3-client");
const types_1 = require("./types");
const utils_1 = require("./utils");
const auth_1 = require("./auth");
const helpers_1 = require("./helpers");
exports.PrivateCallers = {
    GetRegistration: {
        params: {},
        description: "Gets the dYdX provided Ethereum signature required to send a registration transaction to the Starkware smart contract.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getRegistration();
            return res;
        }),
    },
    GetAPIKeys: {
        params: {},
        description: "Get all api keys associated with an Ethereum address.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getApiKeys();
            return res;
        }),
    },
    GetUser: {
        params: {},
        description: "return the user and user information.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getUser();
            return res;
        }),
    },
    GetAccount: {
        params: {},
        description: "Get an account for a user by id. Using the client, the id will be generated with client information and an Ethereum address.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getAccount((0, auth_1.configAddress)());
            return res;
        }),
    },
    GetAccounts: {
        params: {},
        description: "Get all accounts for a user.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getAccounts();
            return res;
        }),
    },
    AccountLeaderboardPNLs: {
        params: {
            period: {
                type: types_1.ParamType.choice,
                optional: false,
                options: Object.values(v3_client_1.AccountLeaderboardPnlPeriod),
            },
            startingBeforeOrAt: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
        },
        description: "Get an account's personal leaderboard pnls.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getAccountLeaderboardPnl(values[0], (0, helpers_1.OptinalValue)(values[1]));
            return res;
        }),
    },
    GetPositions: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.Market)),
            },
            status: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.PositionStatus)),
            },
            limit: {
                type: types_1.ParamType.number,
                optional: true,
                options: undefined,
                description: "Up to 100.",
            },
            createdBeforeOrAt: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
        },
        description: "Get all current positions for a user by specified query parameters.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getPositions({
                market: (0, helpers_1.OptinalValue)(values[0]),
                status: (0, helpers_1.OptinalValue)(values[1]),
                limit: (0, helpers_1.OptinalValue)(values[2]),
                createdBeforeOrAt: (0, helpers_1.OptinalValue)(values[3]),
            });
            return res;
        }),
    },
    GetTransfers: {
        params: {
            type: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.AccountAction)),
            },
            limit: {
                type: types_1.ParamType.number,
                optional: true,
                options: undefined,
                description: "Up to 100.",
            },
            createdBeforeOrAt: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
        },
        description: "Get all current positions for a user by specified query parameters.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getTransfers({
                type: (0, helpers_1.OptinalValue)(values[0]),
                limit: (0, helpers_1.OptinalValue)(values[1]),
                createdBeforeOrAt: (0, helpers_1.OptinalValue)(values[2]),
            });
            return res;
        }),
    },
    GetOrders: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.Market)),
            },
            status: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.OrderStatus)),
            },
            side: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.OrderSide)),
            },
            type: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.OrderType)),
            },
            limit: {
                type: types_1.ParamType.number,
                optional: true,
                options: undefined,
                description: "Up to 100.",
            },
            createdBeforeOrAt: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
        },
        description: "Get orders for a user by specified parameters",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getOrders({
                market: (0, helpers_1.OptinalValue)(values[0]),
                status: (0, helpers_1.OptinalValue)(values[1]),
                side: (0, helpers_1.OptinalValue)(values[2]),
                type: (0, helpers_1.OptinalValue)(values[3]),
                limit: (0, helpers_1.OptinalValue)(values[4]),
                createdBeforeOrAt: (0, helpers_1.OptinalValue)(values[5]),
            });
            return res;
        }),
    },
    GetActiveOrders: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: false,
                options: Object.values(v3_client_1.Market),
            },
            side: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.OrderSide)),
            },
        },
        description: "Get active (not filled or canceled) orders for a user by specified parameters",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getActiveOrders(values[0], (0, helpers_1.OptinalValue)(values[1]));
            return res;
        }),
    },
    GetOrderById: {
        params: {
            id: {
                type: types_1.ParamType.string,
                optional: false,
                options: undefined,
            },
        },
        description: "Get an order by id from the active orderbook and order history.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getOrderById(values[0]);
            return res;
        }),
    },
    GetFills: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.Market)),
            },
            orderId: {
                type: types_1.ParamType.string,
                optional: true,
                options: undefined,
            },
            limit: {
                type: types_1.ParamType.number,
                optional: true,
                options: undefined,
                description: "Up to 100.",
            },
            createdBeforeOrAt: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
        },
        description: "Get Fills for a user by specified parameters.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getFills({
                market: (0, helpers_1.OptinalValue)(values[0]),
                orderId: (0, helpers_1.OptinalValue)(values[1]),
                limit: (0, helpers_1.OptinalValue)(values[2]),
                createdBeforeOrAt: (0, helpers_1.OptinalValue)(values[3]),
            });
            return res;
        }),
    },
    GetFundingPayments: {
        params: {
            market: {
                type: types_1.ParamType.choice,
                optional: true,
                options: (0, helpers_1.AppendOptionalAll)(Object.values(v3_client_1.Market)),
            },
            limit: {
                type: types_1.ParamType.number,
                optional: true,
                options: undefined,
                description: "Up to 100.",
            },
            effectiveBeforeOrAt: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
        },
        description: "Get Funding Payments made to an account.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getFundingPayments({
                market: (0, helpers_1.OptinalValue)(values[0]),
                limit: (0, helpers_1.OptinalValue)(values[1]),
                effectiveBeforeOrAt: (0, helpers_1.OptinalValue)(values[2]),
            });
            return res;
        }),
    },
    GetHistoricalPNLTicks: {
        params: {
            effectiveBeforeOrAt: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
            effectiveAtOrAfter: {
                type: types_1.ParamType.time,
                optional: true,
                options: undefined,
                description: "ISO formatted time. empty string for default",
            },
        },
        description: "Get Historical PNL for an account during an interval.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getHistoricalPnl({
                createdBeforeOrAt: (0, helpers_1.OptinalValue)(values[0]),
                createdOnOrAfter: (0, helpers_1.OptinalValue)(values[1]),
            });
            return res;
        }),
    },
    GetTradingRewards: {
        params: {
            epoch: {
                type: types_1.ParamType.number,
                optional: true,
                options: undefined,
            },
        },
        description: "Get the rewards weight of a given epoch.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getTradingRewards({
                epoch: (0, helpers_1.OptinalValue)(values[0]),
            });
            return res;
        }),
    },
    GetLiquidityProviderRewards: {
        params: {
            epoch: {
                type: types_1.ParamType.number,
                optional: true,
                options: undefined,
            },
        },
        description: "Get the liquidity rewards of a given epoch.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.private.getLiquidityProviderRewards({
                epoch: (0, helpers_1.OptinalValue)(values[0]),
            });
            return res;
        }),
    },
};
/*

-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
 
* Below Callers are not being used yet because of lack of support by non-MetaMask web3 node providers.

       These include the onboarding, ethPrivate sub-sections of the DyDx client.
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------

*/
exports.EthPrivateCallers = {
    RegisterAPIKey: {
        //https://github.com/dydxprotocol/v3-client/issues/126
        params: {},
        description: "Create new API key credentials for a user.",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.ethPrivate.createApiKey((0, auth_1.configAddress)());
            return res;
        }),
    },
};
exports.PrviateOnboardingCallers = {
    CreateUser: {
        params: {
            starkKey: {
                type: types_1.ParamType.string,
                optional: false,
                options: undefined,
            },
            starkKeyYCoordinate: {
                type: types_1.ParamType.string,
                optional: false,
                options: undefined,
            },
        },
        description: "This is used by the frontend app to derive the STARK key pair in a way that is recoverable",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.onboarding.createUser({
                starkKey: values[0],
                starkKeyYCoordinate: values[1],
            }, (0, auth_1.configAddress)());
            return res;
        }),
    },
    DeriveStarkKey: {
        params: {},
        description: "This is used by the frontend app to derive the STARK key pair in a way that is recoverable",
        func: (values) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield utils_1.Client.client.onboarding.deriveStarkKey((0, auth_1.configAddress)());
            return res;
        }),
    },
};
//# sourceMappingURL=private.js.map