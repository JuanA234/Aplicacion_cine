import { Router } from "express";
import salaControlador from "../controller/SalaControlador";

class SalaRuta{
    public apiRutaSala:Router;

    constructor(){
        this.apiRutaSala = Router();
        this.apiRutaSala.get("/getall", salaControlador.dameSalas);
        this.apiRutaSala.get("/getPage", salaControlador.salasPaginadas);
        this.apiRutaSala.post("/addicto", salaControlador.cogeTusala);
        this.apiRutaSala.delete("/delete/:idSala", salaControlador.borraTuSala);
        this.apiRutaSala.put("/update", salaControlador.actualizaTuTAbla);
        this.apiRutaSala.put("/changeRoomCapacity", salaControlador.actualizarCapacidadDeSalas);
    }
}

const salaRuta = new SalaRuta();
export default salaRuta.apiRutaSala;