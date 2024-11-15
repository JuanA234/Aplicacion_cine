import { Router } from "express";
import horarioControlador from "../controller/HorarioControlador";

class HorarioRuta{
    public apiRutaHorario:Router

    constructor(){
        this.apiRutaHorario = Router();
        this.apiRutaHorario.get("/getall", horarioControlador.dameHorarios);
        this.apiRutaHorario.post("/addcito", horarioControlador.cogeTuHorario);
<<<<<<< HEAD
        this.apiRutaHorario.delete("/delete", horarioControlador.borraTuHorario);
        this.apiRutaHorario.put("update", horarioControlador.actualizaTuSala);
=======
        this.apiRutaHorario.delete("/delete/:idHorario", horarioControlador.borraTuHorario);
        this.apiRutaHorario.put("/update", horarioControlador.actualizaTuHorario);
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
    }


}

const horarioRuta = new HorarioRuta();

export default horarioRuta.apiRutaHorario;