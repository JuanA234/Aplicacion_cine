import { Router } from "express";
import comidaCineControlador from "../controller/ComidaCineControlador";
class ComidaCineRuta{
    public apiRutaComidaCine:Router;

    constructor(){
        this.apiRutaComidaCine = Router();
        this.apiRutaComidaCine.get("/getall", comidaCineControlador.dameComidasCines);
        this.apiRutaComidaCine.post("/add", comidaCineControlador.cogeTuComidaCine);
        this.apiRutaComidaCine.delete("/delete/:idMenu", comidaCineControlador.borraTuComidaCine);
        this.apiRutaComidaCine.put("/update", comidaCineControlador.actualizaTuComidaCine);
        this.apiRutaComidaCine.put("/updateMassive", comidaCineControlador.actualizaTuComidaMasivoCine);
        this.apiRutaComidaCine.delete("/deleteMassive", comidaCineControlador.massiveDelete)
    }
}

const comidaCineRuta = new ComidaCineRuta();
export default comidaCineRuta.apiRutaComidaCine;