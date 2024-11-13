import { Router } from "express";
import ComidaControlador from "../controller/ComidaControlador";

class ComidaRuta{
    public apiRutaComida:Router;

    constructor(){
        this.apiRutaComida = Router();
        this.apiRutaComida.get("/getall", ComidaControlador.dameComidas);
        this.apiRutaComida.post("/add", ComidaControlador.cogeTuComida);
        this.apiRutaComida.delete("/delete/:idComida", ComidaControlador.borraTuComida);
        this.apiRutaComida.put("/update", ComidaControlador.actualizaTuComida);
    }
}

const salaRuta = new ComidaRuta();
export default salaRuta.apiRutaComida;