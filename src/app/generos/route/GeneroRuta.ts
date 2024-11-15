import { Router } from "express";
import GeneroControlador from "../controller/GeneroControlador";

class GeneroRuta {
    public apiRutaGenero: Router;
    
    constructor() {
        this.apiRutaGenero = Router();
        this.apiRutaGenero.get("/getall", GeneroControlador.dameGeneros);
        this.apiRutaGenero.post("/addicto", GeneroControlador.cogeTuGenero);
        this.apiRutaGenero.delete("/delete/:idGenero", GeneroControlador.borraTuGenero);
        this.apiRutaGenero.put("/update", GeneroControlador.actualizaTuGenero);
        this.apiRutaGenero.get("/getPage", GeneroControlador.funcionesPaginadas);
    }
}

const generoRuta = new GeneroRuta();

export default generoRuta.apiRutaGenero;