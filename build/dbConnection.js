"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv")); //imports anonimos
const pg_promise_1 = __importDefault(require("pg-promise"));
const optionsPG_1 = require("./optionsPG");
dotenv_1.default.config({ path: "variables.env" });
const nombre = String(process.env.DATABASE_NAME);
const usuario = String(process.env.DATABASE_USUARIO);
const puerto = Number(process.env.DATABASE_PORT);
const servidor = String(process.env.DATABASE_SERVER);
const clave = String(process.env.DATABASE_PASSWORD);
const pgp = (0, pg_promise_1.default)(optionsPG_1.optionsPG);
const pool = pgp({
    user: usuario,
    password: clave,
    port: puerto,
    database: nombre,
    host: servidor
});
//programación en cadena o chain
pool.connect().then((miCone) => {
    console.log("dios mio sirve", nombre);
    miCone.done();
}).catch((miError) => {
    console.log(miError);
});
exports.default = pool;
