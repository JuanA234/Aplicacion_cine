import { Response, Request } from "express";
import HorarioDAO from "../dao/HorarioDAO";
import Horario from "../entity/Horario";

class HorarioControlador extends HorarioDAO{

    public dameHorarios(req:Request, res:Response){
<<<<<<< HEAD
        HorarioDAO.obtenerTodo([], res);
=======
        let {tamPag, page} = req.query;
        HorarioDAO.obtenerTodo(tamPag, page, res);
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
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
<<<<<<< HEAD
        if (isNaN(Number(req.params.idSala))) {
=======
        if (isNaN(Number(req.params.idHorario))) {
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        res.status(400).json({ respuesta: "Y el código mi vale?"});
        } else {
        const codiguito = Number(req.params.idHorario);
        const objcubi: Horario = new Horario(codiguito, "", "", 0);
        HorarioDAO.borreloYa(objcubi, res);
        }
    }

<<<<<<< HEAD
    public actualizaTuSala(req: Request, res: Response): void {
=======
    public actualizaTuHorario(req: Request, res: Response): void {
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
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