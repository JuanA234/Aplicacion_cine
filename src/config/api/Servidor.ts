import cors from "cors";
import express from "express";
import morgan from "morgan";
import apiRutaSala from "../../app/salas/route/SalaRuta";
import apiRutaButaca from "../../app/butacas/route/ButacaRuta";
import apiRutaGenero from "../../app/generos/route/GeneroRuta";
import apiRutaFuncion from "../../app/funciones/route/FuncionRuta";
import apiRutaReservacion from "../../app/reservaciones/route/ReservacionRuta";
import apiRutaUsuarios from "../../app/Usuarios/route/UsuariosRuta";
import apiRutaCarteleras from "../../app/carteleras/route/CartelerasRuta";
import apiRutaComidaCine from "../../app/comidaCine/route/ComidaCineRuta";
import apiRutaPeliculas from "../../app/peliculas/route/PeliculasRuta";
import apiRutaCine from "../../app/cines/Route/CineRuta";
import apiRutaUbicacion from "../../app/ubicaciones/route/UbicacionRuta";
import apiRutaPersonas from "../../app/personas/route/PersonasRuta";


class Servidor {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();

    }
    public exponerEndPoint(): void {
        this.app.use("/rooms", apiRutaSala);
        this.app.use("/butacas", apiRutaButaca);
        this.app.use("/genders", apiRutaGenero);
        this.app.use("/functions", apiRutaFuncion);
        this.app.use("/bookings", apiRutaReservacion);
        this.app.use("/users", apiRutaUsuarios);
        this.app.use("/billboards", apiRutaCarteleras);
        this.app.use("/menu", apiRutaComidaCine);
        this.app.use("/movies", apiRutaPeliculas);
        this.app.use("/cinemas", apiRutaCine);
        this.app.use("/locations", apiRutaUbicacion);
        this.app.use("/person", apiRutaPersonas);
    }

    public cargarConfiguracion(): void {
        this.app.set("PORT", 3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(express.urlencoded({ extended: true }));
    }

    public iniciar(): void {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo me fui", this.app.get("PORT"));
        });
    }
}

export default Servidor;

