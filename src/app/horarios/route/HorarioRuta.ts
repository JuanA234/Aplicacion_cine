import { Router } from "express";
import horarioControlador from "../controller/HorarioControlador";

class HorarioRuta{
    public apiRutaHorario:Router

    constructor(){
        this.apiRutaHorario = Router();
        this.apiRutaHorario.get("/getall", horarioControlador.dameHorarios);
        this.apiRutaHorario.post("/addcito", horarioControlador.cogeTuHorario);
        this.apiRutaHorario.delete("/delete/:idHorario", horarioControlador.borraTuHorario);
        this.apiRutaHorario.put("/update", horarioControlador.actualizaTuHorario);
    }


}

const horarioRuta = new HorarioRuta();

export default horarioRuta.apiRutaHorario;