import { Router } from "express";
import salaControlador from "../controller/SalaControlador";

class SalaRuta{
<<<<<<< HEAD
    public apiRutaSala:Router
=======
    public apiRutaSala:Router;
>>>>>>> aad73346a56658c710226d091211dadaf994c603

    constructor(){
        this.apiRutaSala = Router();
        this.apiRutaSala.get("/getall", salaControlador.dameSalas);
<<<<<<< HEAD
        this.apiRutaSala.post("/addcito", salaControlador.cogeTuSala);
        /*
        this. apiRutaSala.delete("/delete/: idSala", SalaControlador. borraTuSala);
        this.apiRutaSala.put("/update", SalaControlador. actualizaTuSala);*/
=======
        this.apiRutaSala.get("/getPage", salaControlador.salasPaginadas);
        this.apiRutaSala.post("/addicto", salaControlador.cogeTusala);
        this.apiRutaSala.delete("/delete/:idSala", salaControlador.borraTuSala);
        this.apiRutaSala.put("/update", salaControlador.actualizaTuTAbla);
        this.apiRutaSala.put("/changeRoomCapacity", salaControlador.actualizarCapacidadDeSalas);
>>>>>>> aad73346a56658c710226d091211dadaf994c603
    }
}

const salaRuta = new SalaRuta();
<<<<<<< HEAD

=======
>>>>>>> aad73346a56658c710226d091211dadaf994c603
export default salaRuta.apiRutaSala;