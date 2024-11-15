import cors from "cors";
import express from "express";
import morgan from "morgan";
import apiRutaSala from "../../app/salas/route/SalaRuta";
import apiRutaCargos from "../../app/cargos/route/CargosRuta";
import apiRutaCarteleras from "../../app/carteleras/route/CartelerasRuta";
import apiRutaHorario from "../../app/horarios/route/HorarioRuta";
import apiRutaPersonas from "../../app/personas/route/PersonasRuta";
import apiRutaCartelerasCines from "../../app/cartelerasCines/route/CartelerasCinesRuta";
import apiRutaUbicacion from "../../app/ubicaciones/route/UbicacionRuta";
import apiRutaCine from "../../app/cines/Route/CineRuta";
import apiRutaComidaCine from "../../app/comidaCine/route/ComidaCineRuta";
import apiRutaUsuarios from "../../app/Usuarios/Route/UsuariosRuta";

class Servidor {
    public app:express.Application;

    constructor(){
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }

    public cargarConfiguracion():void {
        this.app.set("PORT", 3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        //tamaño maximo de archivo
        this.app.use(express.json({limit:"50mb"}));
        //para que soporte la cantidad de cracateres de url
        this.app.use(express.urlencoded({extended:true})); //para que soporte la cantidad de caract
    }

    public exponerEndPoint():void {
        this.app.use("/room", apiRutaSala);
        this.app.use("/charge", apiRutaCargos);
        this.app.use("/cartelera", apiRutaCarteleras);
        this.app.use("/schedule", apiRutaHorario);
        this.app.use("/person", apiRutaPersonas);
        this.app.use("/cinemaBillbord", apiRutaCartelerasCines);
        this.app.use("/location", apiRutaUbicacion);
        this.app.use("/cinema", apiRutaCine);
        this.app.use("/menu", apiRutaComidaCine);
        this.app.use("/users", apiRutaUsuarios);
    }

    public iniciar():void{
        this.app.listen(this.app.get("PORT"),()=>{
            console.log("Listo me fui", this.app.get("PORT"));
        });
    }
}

export default Servidor;