"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendOptionalAll = exports.OptinalValue = void 0;
const OPTIONAL_CHOICE = "<<ALL>>";
function OptinalValue(v) {
    if (v === OPTIONAL_CHOICE) {
        return undefined;
    }
    if (v)
        return v !== undefined && v !== "" && v !== -1 ? v : undefined;
}
exports.OptinalValue = OptinalValue;
function AppendOptionalAll(arr) {
    arr.unshift(OPTIONAL_CHOICE);
    return arr;
}
exports.AppendOptionalAll = AppendOptionalAll;
//# sourceMappingURL=helpers.js.map