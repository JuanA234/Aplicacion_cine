import { Router } from "express";
import butacaControlador from "../controller/ButacaControlador";

class ButacaRuta{
    public apiRutaButaca:Router;

    constructor(){
        this.apiRutaButaca = Router();
        this.apiRutaButaca.get("/getall", butacaControlador.dameButacas);
        this.apiRutaButaca.post("/add", butacaControlador.cogeTuButaca);
        this.apiRutaButaca.delete("/delete/:idButaca", butacaControlador.borraTuButaca);
        this.apiRutaButaca.put("/update", butacaControlador.actualizaTuButaca);
    }
}

const salaRuta = new ButacaRuta();
export default salaRuta.apiRutaButaca;