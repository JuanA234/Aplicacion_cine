import { Router } from "express";
import PersonasControlador from "../controller/PersonasControlador";

class PersonasRuta{
    public apiRutaPersonas:Router

    constructor(){
        this.apiRutaPersonas = Router();
        this.apiRutaPersonas.get("/getall", PersonasControlador.damePersonas);
        this.apiRutaPersonas.get("/getPage", PersonasControlador.personasPaginadas);
        this.apiRutaPersonas.post("/create", PersonasControlador.obtenerPersona);
        this.apiRutaPersonas.delete("/delete/:idPersona", PersonasControlador.borrarPersona);
        this.apiRutaPersonas.put("/update", PersonasControlador.actualizarPersona);
    }
}

const personasRuta = new PersonasRuta();

export default personasRuta.apiRutaPersonas;