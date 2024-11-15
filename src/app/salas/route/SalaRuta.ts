import { Router } from "express";
import salaControlador from "../controller/SalaControlador";

class SalaRuta{
<<<<<<< HEAD
<<<<<<< HEAD
    public apiRutaSala:Router
=======
    public apiRutaSala:Router;
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
    public apiRutaSala:Router;
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586

    constructor(){
        this.apiRutaSala = Router();
        this.apiRutaSala.get("/getall", salaControlador.dameSalas);
<<<<<<< HEAD
<<<<<<< HEAD
        this.apiRutaSala.post("/addcito", salaControlador.cogeTuSala);
        /*
        this. apiRutaSala.delete("/delete/: idSala", SalaControlador. borraTuSala);
        this.apiRutaSala.put("/update", SalaControlador. actualizaTuSala);*/
=======
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        this.apiRutaSala.get("/getPage", salaControlador.salasPaginadas);
        this.apiRutaSala.post("/addicto", salaControlador.cogeTusala);
        this.apiRutaSala.delete("/delete/:idSala", salaControlador.borraTuSala);
        this.apiRutaSala.put("/update", salaControlador.actualizaTuTAbla);
        this.apiRutaSala.put("/changeRoomCapacity", salaControlador.actualizarCapacidadDeSalas);
<<<<<<< HEAD
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
    }
}

const salaRuta = new SalaRuta();
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
export default salaRuta.apiRutaSala;