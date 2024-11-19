import { Router } from "express";
import FuncionControlador from "../controller/FuncionesControlador";

class FuncionRuta {
    public apiRutaFuncion: Router;
    
    constructor() {
        this.apiRutaFuncion = Router();
        this.apiRutaFuncion.get("/getall", FuncionControlador.dameFunciones);
        this.apiRutaFuncion.get("/getPage", FuncionControlador.funcionesPaginadas);
        this.apiRutaFuncion.post("/addcito", FuncionControlador.cogeTuFuncion);
        this.apiRutaFuncion.delete("/delete/:idFuncion", FuncionControlador.borraTuFuncion);
        this.apiRutaFuncion.put("/update", FuncionControlador.actualizaTuFuncion);
        this.apiRutaFuncion.put("/changeRoomSchedule", FuncionControlador.cambiarHorariosDeSalas);
    }
}

const rutaFuncion = new FuncionRuta();

export default rutaFuncion.apiRutaFuncion;