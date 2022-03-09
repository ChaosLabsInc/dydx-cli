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
exports.ExecuteCall = exports.ParamFromKey = exports.ParamsKeys = exports.Desciptions = exports.Calls = exports.Client = void 0;
const public_1 = require("./public");
const private_1 = require("./private");
const types_1 = require("./types");
const auth_1 = require("./auth");
const client_1 = require("./client");
exports.Client = new client_1.ClientSingleton();
function Caller(type) {
    switch (type) {
        case types_1.CallType.private:
            return private_1.PrivateCallers;
            break;
        case types_1.CallType.public:
            return public_1.PublicCallers;
        default:
            throw new Error("type not found");
    }
}
function Calls(type) {
    return Object.entries(Caller(type)).map(([k, v]) => {
        return k;
    });
}
exports.Calls = Calls;
function Desciptions(type) {
    return Object.entries(Caller(type)).map(([k, v]) => {
        return [k, v.description];
        // return `${k} - ${v.description}`;
    });
}
exports.Desciptions = Desciptions;
function ParamsKeys(call, type) {
    const caller = Caller(type);
    return caller[call] ? Object.keys(caller[call].params) : [];
}
exports.ParamsKeys = ParamsKeys;
function ParamFromKey(call, key, type) {
    const caller = Caller(type);
    if (caller[call] && caller[call].params[key]) {
        return caller[call].params[key];
    }
    throw new Error("invalid call and param key.");
}
exports.ParamFromKey = ParamFromKey;
function ExecuteCall(call, values, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (type === types_1.CallType.private) {
            yield (0, auth_1.MasterAuthOrLogin)();
        }
        const caller = Caller(type);
        return yield caller[call].func(values);
    });
}
exports.ExecuteCall = ExecuteCall;
//# sourceMappingURL=utils.js.map