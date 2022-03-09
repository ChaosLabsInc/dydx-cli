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
exports.ResetAuth = exports.StarkAuthOrLogin = exports.APIAuthOrLogin = exports.MasterAuthOrLogin = exports.isPrivateKeyInEnv = exports.configAddress = exports.isStarkAuthed = exports.isAuthed = void 0;
const utils_1 = require("../utils");
const utils_2 = require("./utils");
function isAuthed(conf) {
    conf = conf !== null && conf !== void 0 ? conf : (0, utils_1.readConfig)();
    if (conf.apiCredentials !== undefined && conf.apiCredentials.key !== "" && conf.apiCredentials.key !== undefined) {
        return true;
    }
    return false;
}
exports.isAuthed = isAuthed;
function isStarkAuthed(conf) {
    conf = conf !== null && conf !== void 0 ? conf : (0, utils_1.readConfig)();
    if (conf.starkCredentials !== undefined &&
        conf.starkCredentials.publicKey !== "" &&
        conf.starkCredentials.publicKey !== undefined) {
        return true;
    }
    return false;
}
exports.isStarkAuthed = isStarkAuthed;
function configAddress() {
    const conf = (0, utils_1.readConfig)();
    return conf.EthAddress;
}
exports.configAddress = configAddress;
function isPrivateKeyInEnv() {
    const ethKey = process.env.ETHEREUM_PRIVATE_KEY;
    if (ethKey === undefined) {
        return false;
    }
    return true;
}
exports.isPrivateKeyInEnv = isPrivateKeyInEnv;
function MasterAuthOrLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        yield APIAuthOrLogin();
        // await StarkAuthOrLogin();
    });
}
exports.MasterAuthOrLogin = MasterAuthOrLogin;
function APIAuthOrLogin(address, inputPrivateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const conf = (0, utils_1.readConfig)();
        if (!address && !conf.EthAddress) {
            throw new Error("Eth Address not provided.");
        }
        if (address !== conf.EthAddress && address) {
            conf.EthAddress = address;
            (0, utils_1.writeConfig)(conf);
        }
        if (!isAuthed(conf)) {
            const credentials = yield Auth(conf.EthAddress, inputPrivateKey);
            conf.apiCredentials = credentials;
            (0, utils_1.writeConfig)(conf);
        }
        utils_2.Client.client.apiKeyCredentials = conf.apiCredentials;
        return;
    });
}
exports.APIAuthOrLogin = APIAuthOrLogin;
function StarkAuthOrLogin(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const conf = (0, utils_1.readConfig)();
        if (!isStarkAuthed(conf)) {
            if (!credentials) {
                throw new Error("Stark login required.");
            }
            conf.starkCredentials = credentials;
            (0, utils_1.writeConfig)(conf);
        }
        yield utils_2.Client.OverWriteClientOptions({
            starkPrivateKey: conf.starkCredentials,
        });
        return;
    });
}
exports.StarkAuthOrLogin = StarkAuthOrLogin;
//Auth - require ETHEREUM_PRIVATE_KEY in the env variable.
function Auth(address, inputPrivateKey) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let ethKey = inputPrivateKey;
        if (!ethKey) {
            ethKey = process.env.ETHEREUM_PRIVATE_KEY;
            if (ethKey === undefined) {
                throw new Error("Need to provide eth private through env: 'export ETHEREUM_PRIVATE_KEY=<key>`");
            }
        }
        (_a = utils_2.Client.client.web3) === null || _a === void 0 ? void 0 : _a.eth.accounts.wallet.add(ethKey);
        const credentials = yield utils_2.Client.client.onboarding.recoverDefaultApiCredentials(address);
        return credentials;
    });
}
function ResetAuth() {
    (0, utils_1.writeConfig)(utils_1.EmptyConfig);
}
exports.ResetAuth = ResetAuth;
//# sourceMappingURL=auth.js.map