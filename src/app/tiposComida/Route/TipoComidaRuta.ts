import { Router } from "express";
import tipoComidaControlador from "../Controller/TipoComidaControlador";

class TipoComidaRuta{
    public apiRutaTipoComida:Router;

    constructor(){
        this.apiRutaTipoComida = Router();
        this.apiRutaTipoComida.get("/getall", tipoComidaControlador.dameTipoComidas);
        this.apiRutaTipoComida.post("/add", tipoComidaControlador.cogeTuTipoComida);
        this.apiRutaTipoComida.delete("/delete/:idTipoComida", tipoComidaControlador.borraTuTipoComida);
        this.apiRutaTipoComida.put("/update", tipoComidaControlador.actualizaTuTipoComida);
    }
}

const salaRuta = new TipoComidaRuta();
export default salaRuta.apiRutaTipoComida;