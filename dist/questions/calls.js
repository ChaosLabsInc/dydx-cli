"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamQuestions = exports.CallQuestion = void 0;
const client_1 = require("../client");
function CallQuestion(type) {
    return [
        {
            type: "rawlist",
            name: "Calls",
            message: "Select DyDx call",
            choices: (0, client_1.Calls)(type),
            default: [],
        },
    ];
}
exports.CallQuestion = CallQuestion;
function ParamQuestions(call, callType) {
    const inquiries = [];
    for (const param of (0, client_1.ParamsKeys)(call, callType)) {
        const { options, type, description, optional } = (0, client_1.ParamFromKey)(call, param, callType);
        let message = "";
        const optionalM = optional ? "[Optional] " : "";
        const paramM = `${optionalM}${param}`;
        switch (type) {
            case client_1.ParamType.choice:
                message = description
                    ? `Select param value for ${paramM} - ${description}`
                    : `Select param value for ${paramM}.`;
                inquiries.push([
                    {
                        type: "rawlist",
                        name: param,
                        message: message,
                        choices: options,
                        default: [],
                    },
                ]);
                break;
            case client_1.ParamType.number:
                message = description
                    ? `Insert param value for ${paramM} - ${description}`
                    : `Insert param value for ${paramM}.`;
                inquiries.push([
                    {
                        type: "number",
                        name: param,
                        message: message,
                        default: optional ? -1 : 0,
                    },
                ]);
                break;
            case client_1.ParamType.string:
                message = description
                    ? `Insert param value for ${paramM} - ${description}`
                    : `Insert param value for ${paramM}.`;
                inquiries.push([
                    {
                        type: "string",
                        name: param,
                        message: message,
                        default: optional ? undefined : "",
                    },
                ]);
                break;
            case client_1.ParamType.time:
                message = `Insert param value for ${paramM} in ISO format (2022-01-13T18:46:01) or leave empty for current time.`;
                inquiries.push([
                    {
                        type: "string",
                        name: param,
                        message: message,
                        default: optional ? undefined : "",
                    },
                ]);
                break;
            default:
                throw new Error("Param type invalid");
        }
    }
    return inquiries;
}
exports.ParamQuestions = ParamQuestions;
//# sourceMappingURL=calls.js.map