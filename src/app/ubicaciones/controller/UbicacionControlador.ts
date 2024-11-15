import { Response, Request } from "express";
import UbicacionDAO from "../dao/UbicacionDAO";
import Ubicacion from "../entity/Ubicacion";

class UbicacionControlador extends UbicacionDAO{

<<<<<<< HEAD
    public dameUbicacion(req:Request, res:Response){
        UbicacionDAO.obtenerTodo([], res);
    }

    public cogeTuUbicacion(req: Request, res: Response): void {
=======
    public dameHorarios(req:Request, res:Response){
        let {tamPag, page} = req.query;
        UbicacionDAO.obtenerTodo(tamPag, page, res);
    }

    public cogeTuHorario(req: Request, res: Response): void {
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        const objCubi: Ubicacion = new Ubicacion(0, "", 0);
        objCubi.idUbicacion = req.body.idHorario;
        objCubi.nombreUbicacion = req.body.nombreUbicacion;
        objCubi.idPadre = req.body.idPadre;
        UbicacionDAO.grabeloYa(objCubi, res);
    }

<<<<<<< HEAD
    public borraTuUbicacion(req: Request, res: Response): void {
=======
    public borraTuHorario(req: Request, res: Response): void {
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        if (isNaN(Number(req.params.idHorario))) {
        res.status(400).json({ respuesta: "Y el código mi vale?"});
        } else {
        const codiguito = Number(req.params.idHorario);
        const objcubi: Ubicacion = new Ubicacion(codiguito, "", 0);
        UbicacionDAO.borreloYa(objcubi, res);
        }
    }

<<<<<<< HEAD
    public actualizaTuUbicacion(req: Request, res: Response): void {
=======
    public actualizaTuHorario(req: Request, res: Response): void {
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        const objCubi: Ubicacion = new Ubicacion(0, "", 0);
        objCubi.idUbicacion = Number(req.body.idUbicacion);
        objCubi.nombreUbicacion = String(req.body.nombreUbicacion);
        objCubi.idPadre = Number(req.body.idPadre);
        UbicacionDAO.actualiceloYa(objCubi, res);
    }

}

const ubicacionControlador = new UbicacionControlador();
export default ubicacionControlador;