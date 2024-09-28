import { Response, Request } from "express";
import Cine from "../entity/Cine";
import CineDAO from "../DAO/CineDAO";

class CineControlador extends CineDAO{

    public dameCines(req:Request, res:Response){
        let {tamPag, page} = req.query;
        CineDAO.obtenerTodo(tamPag,page,res);
    }

    public cogeTuCine(req: Request, res: Response): void{
        const objCubi: Cine = new Cine(0,"",0);
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.nombreCine = req.body.nombreCine;
        CineDAO.grabeloYa(objCubi, res);
    }

    public borraTuCine(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idCine))){
            res.status(400).json({respuesta: "Y el codigo mi vale"});
        }else{
            const codiguito = Number(req.params.idCine);
            const objCubi: Cine = new Cine(codiguito,"",0);
            CineDAO.borreloYa(objCubi,res);
        }

        
    }

    public actualizaTuCine(req: Request, res:Response): void{
        const objCubi: Cine = new Cine(0,"",0);
        objCubi.idCine = Number(req.body.idCine);
        objCubi.idUbicacion = Number(req.body.idUbicacion);
        objCubi.nombreCine = String(req.body.nombreCine);
        CineDAO.actualiceloYa(objCubi, res);
    }

}

const cineControlador = new CineControlador();

export default cineControlador;
