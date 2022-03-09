"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateKeyQuestion = exports.StarkCredentialQuestions = exports.AddressQuestion = exports.AreYouSureQuestion = exports.AuthMainQuestion = exports.AuthChoices = void 0;
var AuthChoices;
(function (AuthChoices) {
    AuthChoices["Reset"] = "Reset Credentials";
    AuthChoices["Login"] = "Login Using Ethereum Private Key";
    // Stark = "Login Using Stark Credentials",
    AuthChoices["Back"] = "Back";
})(AuthChoices = exports.AuthChoices || (exports.AuthChoices = {}));
function AuthMainQuestion() {
    return [
        {
            type: "rawlist",
            name: "Main",
            message: "Select Option",
            choices: Object.values(AuthChoices),
            default: [AuthChoices.Login],
        },
    ];
}
exports.AuthMainQuestion = AuthMainQuestion;
function AreYouSureQuestion() {
    return [
        {
            type: "rawlist",
            name: "AreYouSure",
            message: "Are you sure you want to continue?",
            choices: ["yes", "no"],
            default: "yes",
        },
    ];
}
exports.AreYouSureQuestion = AreYouSureQuestion;
function AddressQuestion() {
    return [
        {
            type: "string",
            name: "Address",
            message: "Insert account Ethereum address",
            default: "",
        },
    ];
}
exports.AddressQuestion = AddressQuestion;
function StarkCredentialQuestions() {
    return [
        [
            {
                type: "string",
                name: "publicKey",
                message: "Insert account Stark publicKey",
                default: "",
            },
        ],
        [
            {
                type: "string",
                name: "publicKeyYCoordinate",
                message: "Insert account Stark publicKeyYCoordinate",
                default: "",
            },
        ],
        [
            {
                type: "string",
                name: "privateKey",
                message: "Insert account Stark privateKey",
                default: "",
            },
        ],
    ];
}
exports.StarkCredentialQuestions = StarkCredentialQuestions;
function PrivateKeyQuestion() {
    return [
        {
            type: "string",
            name: "private key",
            message: "Insert account private key or make sure it is set using `export ETHEREUM_PRIVATE_KEY=<key>` (and press enter). It will not be stored.",
            default: "",
        },
    ];
}
exports.PrivateKeyQuestion = PrivateKeyQuestion;
//# sourceMappingURL=auth.js.map