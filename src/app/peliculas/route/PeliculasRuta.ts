import { Router } from "express";
import peliculasControlador from "../controller/PeliculasControlador";

class PeliculasRuta{
    public apiRutaPeliculas:Router

    constructor(){
        this.apiRutaPeliculas = Router();
        this.apiRutaPeliculas.get("/getall", peliculasControlador.damePeliculas);
        this.apiRutaPeliculas.get("/getPage", peliculasControlador.peliculasPaginadas);
        this.apiRutaPeliculas.post("/addcito", peliculasControlador.cogeTuPelicula);
        this.apiRutaPeliculas.delete("/delete/:id_pelicula", peliculasControlador.borraTuPelicula);
        this.apiRutaPeliculas.put("/update", peliculasControlador.actualizaTuPelicula);
    }


}

const peliculasRuta = new PeliculasRuta();

export default peliculasRuta.apiRutaPeliculas;