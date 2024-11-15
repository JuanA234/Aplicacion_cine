import cors from "cors";
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
import  express  from "express";
import morgan from "morgan";
import apiSalaRuta from "../../app/salas/route/SalaRuta";
import apiRutaButaca from "../../app/butacas/route/ButacaRuta";
import apiRutaGenero from "../../app/generos/route/GeneroRuta";
import apiRutaFunctions from "../../app/funciones/route/FuncionRuta";
import apiRutaReservacion from "../../app/reservaciones/route/ReservacionRuta";
import apiRutaPelicula from "../../app/peliculas/route/PeliculasRuta"
import apiRutaUsuarios from "../../app/usuarios/route/UsuariosRuta";
import apiRutaCarteleras from "../../app/carteleras/route/CartelerasRuta"
<<<<<<< HEAD

class Servidor{
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
import apiRutaComidaCine from "../../app/comidaCine/route/ComidaCineRuta";

class Servidor{
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
    public app:express.Application;

    constructor(){
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586

    }
    public exponerEndPoint() :void{
       this.app.use("/rooms", apiSalaRuta);
       this.app.use("/butacas", apiRutaButaca);
       this.app.use("/genders", apiRutaGenero);
       this.app.use("/functions", apiRutaFunctions);
       this.app.use("/bookings", apiRutaReservacion);
       this.app.use("/movies", apiRutaPelicula);
       this.app.use("/users", apiRutaUsuarios);
       this.app.use("/billboards", apiRutaCarteleras);
<<<<<<< HEAD
=======
       this.app.use("/menu", apiRutaComidaCine);
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
    }
    public cargarConfiguracion() :void{
        this.app.set("PORT", 3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({limit: "50mb"}));     
        this.app.use(express.urlencoded({extended:true}));         
<<<<<<< HEAD
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
    }

    public iniciar():void{
        this.app.listen(this.app.get("PORT"),()=>{
<<<<<<< HEAD
<<<<<<< HEAD
            console.log("Listo me fui", this.app.get("PORT"));
=======
            console.log("Listo me fui", this.app.get("PORT"))
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
            console.log("Listo me fui", this.app.get("PORT"))
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        });
    }
}

<<<<<<< HEAD
<<<<<<< HEAD
export default Servidor;
=======

export default Servidor;
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======

export default Servidor;
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
