import { Router } from "express";

import comidaControlador from "../Controller/ComidaControlador";

class ComidaRuta{
    public apiRutaComida:Router;

    constructor(){
        this.apiRutaComida = Router();
        this.apiRutaComida.get("/getall", comidaControlador.dameComidas);
        this.apiRutaComida.post("/add", comidaControlador.cogeTuComida);
        this.apiRutaComida.delete("/delete/:idComida", comidaControlador.borraTuComida);
        this.apiRutaComida.put("/update", comidaControlador.actualizaTuComida);
    }
}

const salaRuta = new ComidaRuta();
export default salaRuta.apiRutaComida;