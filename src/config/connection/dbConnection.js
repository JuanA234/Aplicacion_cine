"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var pg_promise_1 = require("pg-promise");
var optionsPG_1 = require("./optionsPG");
dotenv_1.default.config({ path: "variables.env" });
var nombre = String(process.env.NOMBRE_BASE_DE_DATOS);
var usuario = String(process.env.EL_USUARIO);
var puerto = Number(process.env.EL_PUERTO);
var servidor = String(process.env.EL_SERVIDOR);
var clave = String(process.env.LA_CLAVE);
var pgp = (0, pg_promise_1.default)(optionsPG_1.optionsPG);
var pool = pgp({
    user: usuario,
    password: clave,
    port: puerto,
    database: nombre,
    host: servidor
});
pool.connect().then(function (miConn) {
    console.log("dios mio sirve", nombre);
    miConn.done();
})
    .catch(function (miError) {
    console.log(miError);
});
exports.default = pool;
