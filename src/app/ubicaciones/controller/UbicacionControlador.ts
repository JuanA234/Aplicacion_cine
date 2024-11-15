import { Response, Request } from "express";
import UbicacionDAO from "../dao/UbicacionDAO";
import Ubicacion from "../entity/Ubicacion";

class UbicacionControlador extends UbicacionDAO{

    public dameUbicacion(req:Request, res:Response){
        UbicacionDAO.obtenerTodo([], res);
    }

    public cogeTuUbicacion(req: Request, res: Response): void {
        const objCubi: Ubicacion = new Ubicacion(0, "", 0);
        objCubi.idUbicacion = req.body.idHorario;
        objCubi.nombreUbicacion = req.body.nombreUbicacion;
        objCubi.idPadre = req.body.idPadre;
        UbicacionDAO.grabeloYa(objCubi, res);
    }

    public borraTuUbicacion(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idHorario))) {
        res.status(400).json({ respuesta: "Y el código mi vale?"});
        } else {
        const codiguito = Number(req.params.idHorario);
        const objcubi: Ubicacion = new Ubicacion(codiguito, "", 0);
        UbicacionDAO.borreloYa(objcubi, res);
        }
    }

    public actualizaTuUbicacion(req: Request, res: Response): void {
        const objCubi: Ubicacion = new Ubicacion(0, "", 0);
        UbicacionDAO.actualiceloYa(objCubi, res);
    }

}

const ubicacionControlador = new UbicacionControlador();
export default ubicacionControlador;