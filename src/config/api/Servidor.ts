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

import apiRutaUsuarios from "../../app/Usuarios/Route/UsuariosRuta";
import apiRutaButaca from "../../app/butacas/route/ButacaRuta";
import apiRutaGenero from "../../app/generos/route/GeneroRuta";
import apiRutaFuncion from "../../app/funciones/route/FuncionRuta";
import apiRutaReservacion from "../../app/reservaciones/route/ReservacionRuta";
import apiRutaComidaCine from "../../app/comidaCine/route/ComidaCineRuta";

class Servidor{
    public app:express.Application;

    constructor(){
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();

    }
    public exponerEndPoint() :void{
       this.app.use("/rooms", apiRutaSala);
       this.app.use("/butacas", apiRutaButaca);
       this.app.use("/genders", apiRutaGenero);
       this.app.use("/functions", apiRutaFuncion);
       this.app.use("/bookings", apiRutaReservacion);
       this.app.use("/users", apiRutaUsuarios);
       this.app.use("/billboards", apiRutaCarteleras);
       this.app.use("/menu", apiRutaComidaCine);
    }

    public cargarConfiguracion() :void{
        this.app.set("PORT", 3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({limit: "50mb"}));     
        this.app.use(express.urlencoded({extended:true}));         
    }

    public iniciar():void{
        this.app.listen(this.app.get("PORT"),()=>{
            console.log("Listo me fui", this.app.get("PORT"));
        });
    }
}

export default Servidor;

