import { Router } from "express";
import cargosControlador from "../controller/CargosControlador";

class CargosRuta{
    public apiRutaCargos:Router

    constructor(){
        this.apiRutaCargos = Router();
        this.apiRutaCargos.get("/getall", cargosControlador.dameCargos);
        this.apiRutaCargos.post("/addcito", cargosControlador.obtenerCargo);
        this.apiRutaCargos.delete("/delete/:idCargo", cargosControlador.borrarCargo);
        this.apiRutaCargos.put("/update", cargosControlador.actualizarCargo);
    }
}

const cargosRuta = new CargosRuta();

export default cargosRuta.apiRutaCargos;