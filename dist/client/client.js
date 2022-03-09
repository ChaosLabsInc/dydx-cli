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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSingleton = void 0;
const v3_client_1 = require("@dydxprotocol/v3-client");
const web3_1 = __importDefault(require("web3"));
const HTTP_HOST = "https://api.dydx.exchange";
const STAGING_HTTP_HOST = "https://api.stage.dydx.exchange";
const INFURA_NODE_URL = "https://mainnet.infura.io/v3/7b6391c3ea66406e83d69e9934fda70c";
const INFURA_ROPSTEN_NODE_URL = "https://ropsten.infura.io/v3/7b6391c3ea66406e83d69e9934fda70c";
class ClientSingleton {
    constructor() {
        this.client = BaseClient({});
    }
    OverWriteClientOptions(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const newC = yield OverwriteClient(this.client, options);
            this.client = newC;
        });
    }
}
exports.ClientSingleton = ClientSingleton;
function BaseClient(options) {
    var _a;
    const nodeUrl = process.env.STAGING ? INFURA_ROPSTEN_NODE_URL : INFURA_NODE_URL;
    const clientUrl = process.env.STAGING ? STAGING_HTTP_HOST : HTTP_HOST;
    return new v3_client_1.DydxClient(clientUrl, {
        apiTimeout: 15000,
        apiKeyCredentials: options.apiKeyCredentials,
        web3: (_a = options.web3) !== null && _a !== void 0 ? _a : new web3_1.default(new web3_1.default.providers.HttpProvider(nodeUrl)),
        starkPrivateKey: options.starkPrivateKey,
    });
}
function OverwriteClient(c, options) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        return BaseClient({
            apiTimeout: (_a = options.apiTimeout) !== null && _a !== void 0 ? _a : c.apiTimeout,
            web3: (_b = options.web3) !== null && _b !== void 0 ? _b : c.web3,
            starkPrivateKey: (_c = options.starkPrivateKey) !== null && _c !== void 0 ? _c : c.starkPrivateKey,
            apiKeyCredentials: (_d = options.apiKeyCredentials) !== null && _d !== void 0 ? _d : c.apiKeyCredentials,
        });
    });
}
//# sourceMappingURL=client.js.map