import { Response, Request } from "express";
import HorarioDAO from "../dao/HorarioDAO";
import Horario from "../entity/Horario";

class HorarioControlador extends HorarioDAO{

    public dameHorarios(req:Request, res:Response){
        HorarioDAO.obtenerTodo([], res);
    }

    public cogeTuHorario(req: Request, res: Response): void {
        const objCubi: Horario = new Horario(0, "", "", 0);
        objCubi.idHorario = req.body.idHorario;
        objCubi.fecha = req.body.fecha;
        objCubi.hora = req.body.hora;
        objCubi.idPelicula = req.body.idPelicula;
        HorarioDAO.grabeloYa(objCubi, res);
    }

    public borraTuHorario(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idSala))) {
        res.status(400).json({ respuesta: "Y el código mi vale?"});
        } else {
        const codiguito = Number(req.params.idHorario);
        const objcubi: Horario = new Horario(codiguito, "", "", 0);
        HorarioDAO.borreloYa(objcubi, res);
        }
    }

    public actualizaTuSala(req: Request, res: Response): void {
        const objCubi: Horario = new Horario(0, "", "", 0);
        objCubi.idHorario = Number(req.body.idHorario);
        objCubi.fecha = String(req.body.fecha);
        objCubi.hora = String(req.body.hora)
        objCubi.idPelicula = Number(req.body.idPelicula);
        HorarioDAO.actualiceloYa(objCubi, res);
    }

}

const horarioControlador = new HorarioControlador();
export default horarioControlador;