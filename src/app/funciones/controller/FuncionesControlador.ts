import { Response, Request } from "express";
import FuncionDAO from "../DAO/FuncionDAO";
import Funcion from "../entity/Funcion";

class FuncionControlador extends FuncionDAO {
    public dameFunciones(req: Request, res: Response) {
        FuncionDAO.obtenerTodo([], res);
    }

    public cogeTuFuncion(req: Request, res: Response): void {
        console.log(req.body);
        const objCubi: Funcion = new Funcion(0,0,0);
        objCubi.idHorario = Number(req.body.idHorario);
        objCubi.idSala = Number(req.body.idSala);
        console.log(objCubi);
        FuncionDAO.grabeloYa(objCubi, res);
    }

    public borraTuFuncion(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idFuncion))){
            res.status(400).json({respuesta: "Y el codigo mi vale"});
        }else{
            const codiguito = Number(req.params.idFuncion);
            const objCubi: Funcion = new Funcion(codiguito, 0,0);
            FuncionDAO.borreloYa(objCubi,res);
        }
    }

    public actualizaTuFuncion(req: Request, res: Response): void{
        const objCubi: Funcion = new Funcion(0, 0,0);
        objCubi.idFuncion = Number(req.body.idFuncion);
        objCubi.idHorario = Number(req.body.idHorario);
        objCubi.idSala = Number(req.body.idSala);
        FuncionDAO.actualizaloYa(objCubi, res);
    }
}

const funcionControlador = new FuncionControlador();

export default funcionControlador;