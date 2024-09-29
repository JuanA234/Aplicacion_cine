import { Router } from "express";
import FuncionControlador from "../controller/FuncionesControlador";

class FuncionRuta {
    public apiRutaFuncion: Router;
    
    constructor() {
        this.apiRutaFuncion = Router();
        this.apiRutaFuncion.get("/getall", FuncionControlador.dameFunciones);
        this.apiRutaFuncion.post("/addicto", FuncionControlador.cogeTuFuncion);
        this.apiRutaFuncion.delete("/delete/:idFuncion", FuncionControlador.borraTuFuncion);
        this.apiRutaFuncion.put("/update", FuncionControlador.actualizaTuFuncion);
    }
}

const rutaFuncion = new FuncionRuta();

export default rutaFuncion.apiRutaFuncion;