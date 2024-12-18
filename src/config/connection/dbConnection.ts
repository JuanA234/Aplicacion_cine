
import dotenv from "dotenv"; //imports anonimos
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config({ path: "variables.env" });

const pgp = pgPromise(optionsPG);

const nombre = String(process.env.NOMBRE_BASE_DE_DATOS);
const usuario = String(process.env.EL_USUARIO);
const puerto = Number(process.env.EL_PUERTO);
const servidor = String(process.env.EL_SERVIDOR);
const clave = String(process.env.LA_CLAVE);


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