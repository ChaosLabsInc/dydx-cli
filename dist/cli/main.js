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
exports.AuthSelector = exports.CallSelector = exports.MainSelector = exports.Welcome = void 0;
const figlet_1 = __importDefault(require("figlet"));
const clear_1 = __importDefault(require("clear"));
const inquirer_1 = __importDefault(require("inquirer"));
const questions_1 = require("../questions/");
const client_1 = require("../client");
const utils_1 = require("../utils");
const process_1 = require("process");
const cli_table3_1 = __importDefault(require("cli-table3"));
const YOU_SELECTED = "You selected ";
const { prompt } = inquirer_1.default;
function Welcome() {
    (0, clear_1.default)();
    (0, utils_1.logGreen)("🎉 ✨ 🔥 DyDX Public CLI by: 🎉 ✨ 🔥");
    (0, utils_1.logBlue)(figlet_1.default.textSync("Chaos Labs"));
    logAccountDetails();
}
exports.Welcome = Welcome;
function MainSelector() {
    return __awaiter(this, void 0, void 0, function* () {
        const inquiry = (0, questions_1.MainQuestion)();
        const answered = yield prompt(inquiry);
        const choice = answered[inquiry[0].name];
        switch (choice) {
            case questions_1.MainChoices.PublicCall:
                return yield CallSelector(client_1.CallType.public);
            case questions_1.MainChoices.PrivateCall:
                return yield CallSelector(client_1.CallType.private);
            case questions_1.MainChoices.Auth:
                return yield AuthSelector();
            case questions_1.MainChoices.PublicDesciptions:
                consoleDescriptions((0, client_1.Desciptions)(client_1.CallType.public));
                return yield MainSelector();
            case questions_1.MainChoices.PrivateDesciptions:
                consoleDescriptions((0, client_1.Desciptions)(client_1.CallType.private));
                return yield MainSelector();
            case questions_1.MainChoices.Quit:
                (0, process_1.exit)(0);
        }
    });
}
exports.MainSelector = MainSelector;
function CallSelector(type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (type === client_1.CallType.private && !(0, client_1.isAuthed)()) {
            (0, utils_1.logYellow)(`You must authenticate first - Go to ${questions_1.MainChoices.Auth}`);
            return MainSelector();
        }
        const call = yield selectCall(type);
        const params = yield fillParams(call, type);
        console.log(call, params);
        const res = yield (0, client_1.ExecuteCall)(call, params, type);
        console.log(res);
        return yield MainSelector();
    });
}
exports.CallSelector = CallSelector;
function AuthSelector() {
    return __awaiter(this, void 0, void 0, function* () {
        const inquiry = (0, questions_1.AuthMainQuestion)();
        const answered = yield prompt(inquiry);
        const choice = answered[inquiry[0].name];
        switch (choice) {
            case questions_1.AuthChoices.Login:
                yield LoginSelector();
                break;
            // case AuthChoices.Stark:
            //   await StarkLoginSelector();
            //   break;
            case questions_1.AuthChoices.Reset:
                yield ResetAuthSelector();
                break;
            case questions_1.AuthChoices.Back:
                return MainSelector();
        }
    });
}
exports.AuthSelector = AuthSelector;
function logAccountDetails() {
    const account = (0, client_1.configAddress)();
    const accountState = account !== "" ? `${account}` : `Logged Out`;
    const authed = (0, client_1.isAuthed)();
    const authState = authed ? `Authenticated` : `Logged Out`;
    const accountLog = `* Account: <${accountState}>`;
    const authLog = `* API: <${authState}>`;
    (0, utils_1.logGreen)(accountLog);
    (0, utils_1.logGreen)(authLog);
}
function StarkLoginSelector() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const inquiries = (0, questions_1.StarkCredentialQuestions)();
        const choices = new Map();
        for (const inquiry of inquiries) {
            const answered = yield prompt(inquiry);
            const choice = answered[inquiry[0].name];
            (0, utils_1.logBlue)(YOU_SELECTED + choice);
            choices.set(inquiry[0].name, choice);
        }
        if (!choices.has("publicKey") || !choices.get("publicKeyYCoordinate") || !choices.get("privateKey")) {
            (0, utils_1.logYellow)("Invalid input for Stark credentials");
            (0, process_1.exit)(0);
        }
        const credentials = {
            publicKey: (_a = choices.get("publicKey")) !== null && _a !== void 0 ? _a : "",
            publicKeyYCoordinate: (_b = choices.get("publicKeyYCoordinate")) !== null && _b !== void 0 ? _b : "",
            privateKey: (_c = choices.get("privateKey")) !== null && _c !== void 0 ? _c : "",
        };
        yield (0, client_1.StarkAuthOrLogin)(credentials);
        (0, utils_1.logBlue)("Logged in successfully.");
        return MainSelector();
    });
}
function LoginSelector() {
    return __awaiter(this, void 0, void 0, function* () {
        let address = (0, client_1.configAddress)();
        if (address === "") {
            const inquiry = (0, questions_1.AddressQuestion)();
            const answered = yield prompt(inquiry);
            address = answered[inquiry[0].name];
        }
        (0, utils_1.logBlue)(YOU_SELECTED + address);
        let key = "";
        if (!(0, client_1.isPrivateKeyInEnv)()) {
            const keyInquiry = (0, questions_1.PrivateKeyQuestion)();
            const answered2 = yield prompt(keyInquiry);
            key = answered2[keyInquiry[0].name];
            if ((key = "")) {
                (0, utils_1.logYellow)("Expected private key in env (ETHEREUM_PRIVATE_KEY). Try again.");
                (0, process_1.exit)(0);
            }
        }
        yield (0, client_1.APIAuthOrLogin)(address, key);
        (0, utils_1.logBlue)("Logged in successfully.");
        return MainSelector();
    });
}
function ResetAuthSelector() {
    return __awaiter(this, void 0, void 0, function* () {
        const inquiry = (0, questions_1.AreYouSureQuestion)();
        const answered = yield prompt(inquiry);
        const choice = answered[inquiry[0].name];
        (0, utils_1.logBlue)(YOU_SELECTED + choice);
        (0, client_1.ResetAuth)();
        return MainSelector();
    });
}
function selectCall(type) {
    return __awaiter(this, void 0, void 0, function* () {
        const inquiry = (0, questions_1.CallQuestion)(type);
        const answered = yield prompt(inquiry);
        const choice = answered[inquiry[0].name];
        (0, utils_1.logBlue)(YOU_SELECTED + choice);
        return choice;
    });
}
function fillParams(call, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const inquiries = (0, questions_1.ParamQuestions)(call, type);
        const choices = [];
        for (const inquiry of inquiries) {
            const answered = yield prompt(inquiry);
            const choice = answered[inquiry[0].name];
            (0, utils_1.logBlue)(YOU_SELECTED + choice);
            choices.push(choice);
        }
        return choices;
    });
}
function consoleDescriptions(data) {
    const table = new cli_table3_1.default({
        head: ["Method", "Descriptions"],
    });
    for (const d of data) {
        table.push(d);
    }
    console.log(table.toString());
}
//# sourceMappingURL=main.js.map