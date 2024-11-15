<<<<<<< HEAD
import dotenv from "dotenv"; //imports anonimos
=======
import dotenv from "dotenv";
>>>>>>> aad73346a56658c710226d091211dadaf994c603
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config({ path: "variables.env" });

<<<<<<< HEAD
const nombre = String(process.env.DATABASE_NAME);
const usuario = String(process.env.DATABASE_USUARIO);
const puerto = Number(process.env.DATABASE_PORT);
const servidor = String(process.env.DATABASE_SERVER);
const clave = String(process.env.DATABASE_PASSWORD);

const pgp = pgPromise(optionsPG);
=======
const nombre = String(process.env.NOMBRE_BASE_DE_DATOS);
const usuario = String(process.env.EL_USUARIO);
const puerto = Number(process.env.EL_PUERTO);
const servidor = String(process.env.EL_SERVIDOR);
const clave = String(process.env.LA_CLAVE);

const pgp = pgPromise(optionsPG);

>>>>>>> aad73346a56658c710226d091211dadaf994c603
const pool = pgp({
    user: usuario,
    password: clave,
    port: puerto,
    database: nombre,
    host: servidor
});

<<<<<<< HEAD
//programación en cadena o chain
pool.connect().then((miCone) => {
    console.log("dios mio sirve", nombre);
    miCone.done();
}).catch((miError) => {
    console.log(miError);

=======
pool.connect().then((miConn)=>{
    console.log("dios mio sirve", nombre);
    miConn.done();
})
.catch((miError) => {
    console.log(miError);
>>>>>>> aad73346a56658c710226d091211dadaf994c603
});

export default pool;