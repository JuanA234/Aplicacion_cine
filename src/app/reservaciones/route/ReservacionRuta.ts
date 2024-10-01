import { Router } from "express";
import reservacionControlador from "../controller/ReservacionesControlador";

class ReservacionRuta{
    public apiRutaReservacion:Router;

    constructor(){
        this.apiRutaReservacion = Router();
        this.apiRutaReservacion.get("/getall", reservacionControlador.dameReservaciones);
        this.apiRutaReservacion.get("/getPage", reservacionControlador.funcionesPaginadas);
        this.apiRutaReservacion.post("/addicto", reservacionControlador.cogeTuReservacion);
        this.apiRutaReservacion.delete("/delete/:idReservacion", reservacionControlador.borraTuReservacion);
        this.apiRutaReservacion.put("/update", reservacionControlador.actualizaTuTAbla);
        this.apiRutaReservacion.put("/changeAllBookings", reservacionControlador.reservarTodo);
    }
}

const reservacionRuta = new ReservacionRuta();
export default reservacionRuta.apiRutaReservacion;