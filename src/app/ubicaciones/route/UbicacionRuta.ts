import { Router } from "express";
import ubicacionControlador from "../controller/UbicacionControlador";
import Ubicacion from "../entity/Ubicacion";

class UbicacionRuta{
    public apiRutaUbicacion:Router

    constructor(){
        this.apiRutaUbicacion = Router();
        this.apiRutaUbicacion.get("/getall", ubicacionControlador.dameUbicacion);
        this.apiRutaUbicacion.post("/addcito", ubicacionControlador.cogeTuUbicacion);
        this. apiRutaUbicacion.delete("/delete/: idSala", ubicacionControlador.borraTuUbicacion);
        this.apiRutaUbicacion.put("/update", ubicacionControlador.actualizaTuUbicacion);
    }
}

const ubicacion = new UbicacionRuta();

export default ubicacion.apiRutaUbicacion;