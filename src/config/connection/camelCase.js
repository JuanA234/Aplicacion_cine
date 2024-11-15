"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelizeColums = camelizeColums;
var pg_promise_1 = require("pg-promise");
function camelizeColums(data) {
    var tmp = data[0];
    for (var prop in tmp) {
        var camel = pg_promise_1.default.utils.camelize(prop);
        if (!(camel in tmp)) {
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                d[camel] = d[prop];
                delete d[prop];
            }
        }
    }
}
