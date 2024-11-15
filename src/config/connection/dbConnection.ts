import dotenv from "dotenv"; //imports anonimos
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config({ path: "variables.env" });

const nombre = String(process.env.DATABASE_NAME);
const usuario = String(process.env.DATABASE_USUARIO);
const puerto = Number(process.env.DATABASE_PORT);
const servidor = String(process.env.DATABASE_SERVER);
const clave = String(process.env.DATABASE_PASSWORD);

const pgp = pgPromise(optionsPG);
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

export default pool;