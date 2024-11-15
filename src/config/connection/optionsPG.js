"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsPG = void 0;
var camelCase_1 = require("./camelCase");
exports.optionsPG = {
    receive: function (e) {
        (0, camelCase_1.camelizeColums)(e.data);
    },
};
