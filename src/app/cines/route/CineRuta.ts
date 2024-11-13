import { Router } from "express";
import cineControlador from "../controller/CineControlador";

class CineRuta{
    public apiRutaCine:Router;

    constructor(){
        this.apiRutaCine = Router();
        this.apiRutaCine.get("/getall", cineControlador.dameCines);
        this.apiRutaCine.post("/addcito", cineControlador.cogeTuCine);
        this.apiRutaCine.delete("/delete/:idCine", cineControlador.borraTuCine);
        this.apiRutaCine.put("/update", cineControlador.actualizaTuCine);
    }
}

const salaRuta = new CineRuta();
export default salaRuta.apiRutaCine;