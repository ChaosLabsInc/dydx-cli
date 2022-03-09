"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainQuestion = exports.MainChoices = void 0;
var MainChoices;
(function (MainChoices) {
    MainChoices["PublicCall"] = "Call Public Methods";
    MainChoices["PrivateCall"] = "Call Private Methods";
    MainChoices["Auth"] = "Authentication Options";
    MainChoices["PublicDesciptions"] = "See Public Method Descriptions";
    MainChoices["PrivateDesciptions"] = "See Private Method Descriptions";
    MainChoices["Quit"] = "Quit";
})(MainChoices = exports.MainChoices || (exports.MainChoices = {}));
function MainQuestion() {
    return [
        {
            type: "rawlist",
            name: "Main",
            message: "Select Option",
            choices: Object.values(MainChoices),
            default: [MainChoices.PublicCall],
        },
    ];
}
exports.MainQuestion = MainQuestion;
//# sourceMappingURL=main.js.map