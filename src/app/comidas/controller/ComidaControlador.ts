import { Response, Request } from "express";
import Comida from "../entity/Comidas";
import ComidaDAO from "../DAO/ComidaDAO";

class ComidaControlador extends ComidaDAO{

    public dameComidas(req:Request, res:Response){
        let {tamPag, page} = req.query;
        ComidaDAO.obtenerTodo(tamPag,page,res);
    }

    public cogeTuComida(req: Request, res: Response): void{
        const objCubi: Comida = new Comida(0,"",0);
        objCubi.idTipoComida = req.body.idTipoComida;
        objCubi.nombreComida = req.body.nombreComida;
        ComidaDAO.grabeloYa(objCubi, res);
    }

    public borraTuComida(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idComida))){
            res.status(400).json({respuesta: "Y el codigo mi vale"});
        }else{
            const codiguito = Number(req.params.idComida);
            const objCubi: Comida = new Comida(codiguito,"",0);
            ComidaDAO.borreloYa(objCubi,res);
        }

        
    }

    public actualizaTuComida(req: Request, res:Response): void{
        const objCubi: Comida = new Comida(0,"",0);
        objCubi.idComida = Number(req.body.idComida);
        objCubi.idTipoComida = Number(req.body.idTipoComida);
        objCubi.nombreComida = String(req.body.nombreComida);
        ComidaDAO.actualiceloYa(objCubi, res);
    }

}

const comidaControlador = new ComidaControlador();

export default comidaControlador;