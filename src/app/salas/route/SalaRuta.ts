import { Router } from "express";
import salaControlador from "../controller/SalaControlador";

class SalaRuta{
    public apiRutaSala:Router

    constructor(){
        this.apiRutaSala = Router();
        this.apiRutaSala.get("/getall", salaControlador.dameSalas);
        this.apiRutaSala.post("/addcito", salaControlador.cogeTuSala);
        /*
        this. apiRutaSala.delete("/delete/: idSala", SalaControlador. borraTuSala);
        this.apiRutaSala.put("/update", SalaControlador. actualizaTuSala);*/
    }
}

const salaRuta = new SalaRuta();

export default salaRuta.apiRutaSala;