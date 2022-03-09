"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetKey = exports.logYellow = exports.logGreen = exports.logBlue = exports.logTable = void 0;
const cli_table_1 = __importDefault(require("cli-table"));
const chalk_1 = __importDefault(require("chalk"));
function logTable(headers, data) {
    let table = new cli_table_1.default({
        head: headers,
        colWidths: headers.map((h) => 45),
    });
    table.push(data);
    console.log(table.toString());
}
exports.logTable = logTable;
function logBlue(data) {
    console.log(chalk_1.default.blue(data));
}
exports.logBlue = logBlue;
function logGreen(data) {
    console.log(chalk_1.default.green(data));
}
exports.logGreen = logGreen;
function logYellow(data) {
    console.log(chalk_1.default.yellow(data));
}
exports.logYellow = logYellow;
function targetKey(pairSelectionParsed) {
    return pairSelectionParsed.split(".")[0];
}
exports.targetKey = targetKey;
//# sourceMappingURL=loggers.js.map