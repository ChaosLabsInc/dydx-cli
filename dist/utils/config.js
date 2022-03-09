"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeConfig = exports.readConfig = exports.EmptyConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const path = "../../config/config.json";
exports.EmptyConfig = {
    EthAddress: "",
};
function readConfig() {
    try {
        const rawData = fs_1.default.readFileSync((0, path_1.resolve)(__dirname, path));
        return JSON.parse(rawData.toString());
    }
    catch (e) {
        writeConfig(exports.EmptyConfig);
        return exports.EmptyConfig;
    }
}
exports.readConfig = readConfig;
function writeConfig(confing) {
    fs_1.default.writeFile((0, path_1.resolve)(__dirname, path), JSON.stringify(confing), function (err) {
        if (err) {
            console.log(err);
        }
    });
}
exports.writeConfig = writeConfig;
//# sourceMappingURL=config.js.map