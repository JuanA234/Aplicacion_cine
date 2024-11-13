import { Router } from "express";
import TipoComidaControlador from "../controller/TipoComidaControlador";

class TipoComidaRuta{
    public apiRutaTipoComida:Router;

    constructor(){
        this.apiRutaTipoComida = Router();
        this.apiRutaTipoComida.get("/getall", TipoComidaControlador.dameTipoComidas);
        this.apiRutaTipoComida.post("/add", TipoComidaControlador.cogeTuTipoComida);
        this.apiRutaTipoComida.delete("/delete/:idTipoComida", TipoComidaControlador.borraTuTipoComida);
        this.apiRutaTipoComida.put("/update", TipoComidaControlador.actualizaTuTipoComida);
    }
}

const salaRuta = new TipoComidaRuta();
export default salaRuta.apiRutaTipoComida;