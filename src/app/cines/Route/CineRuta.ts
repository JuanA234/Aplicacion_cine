import { Router } from "express";
import cineControlador from "../Controller/ControladorCines";


class CineRuta{
    public apiRutaCine:Router;

    constructor(){
        this.apiRutaCine = Router();
        this.apiRutaCine.get("/getall", cineControlador.dameCine);
        this.apiRutaCine.post("/addcito", cineControlador.cogeTuCine);
        this.apiRutaCine.delete("/delete/:idCine", cineControlador.borraTuCine);
        this.apiRutaCine.put("/update", cineControlador.actualizaTuCine);
    }
}

const salaRuta = new CineRuta();
export default salaRuta.apiRutaCine;