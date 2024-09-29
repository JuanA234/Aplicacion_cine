import { Response, Request } from "express";
import ReservacionDAO from "../dao/ReservacionDAO";
import Reservacion from "../entity/Reservacion";


class ReservacionControlador extends ReservacionDAO{

    public dameReservaciones(req:Request, res:Response){
        ReservacionDAO.obtenerTodo([],res);
    }

    public cogeTuReservacion(req: Request, res: Response): void{
        const objCubi: Reservacion = new Reservacion(0, 0, 0, 0);
        objCubi.idReservacion = req.body.idReservacion;
        objCubi.idPersona = req.body.idPersona;
        objCubi.idFuncion = req.body.idFuncion;
        objCubi.idButaca = req.body.idButaca;
        ReservacionDAO.grabeloYa(objCubi, res);
    }

    public borraTuReservacion(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idReservacion))){
            res.status(400).json({respuesta: "Y el codigo mi vale"});
        }else{
            const codiguito = Number(req.params.idReservacion);
            const objCubi: Reservacion = new Reservacion(codiguito, 0, 0, 0);
            ReservacionDAO.borreloYa(objCubi,res);
        }
    }

    public actualizaTuTAbla(req: Request, res:Response): void{
        const objCubi: Reservacion = new Reservacion(0, 0, 0, 0);
        objCubi.idReservacion = Number(req.body.idReservacion)
        objCubi.idPersona = Number(req.body.idPersona);
        objCubi.idFuncion = Number(req.body.idFuncion);
        objCubi.idButaca = Number(req.body.idButaca);
        ReservacionDAO.actualiceloYa(objCubi, res);
    }

}

const reservacionControlador = new ReservacionControlador();

export default reservacionControlador;
