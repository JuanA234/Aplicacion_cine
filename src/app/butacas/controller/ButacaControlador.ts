import { Response, Request } from "express";
import ButacaDAO from "../DAO/ButacaDAO";
import Butaca from "../entity/Butacas";


class ButacaControlador extends ButacaDAO{

    public dameButacas(req:Request, res:Response){
        let {tamPag, page} = req.query;
        ButacaDAO.obtenerTodo(tamPag,page,res);
    }

    public cogeTuButaca(req: Request, res: Response): void{
        const objCubi: Butaca = new Butaca(0,"" ,0,0);
        objCubi.columna = req.body.columna;
        objCubi.fila = req.body.fila;
        objCubi.idSala = req.body.idSala;
        ButacaDAO.grabeloYa(objCubi, res);
    }

    public borraTuButaca(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idButaca))){
            res.status(400).json({respuesta: "Y el codigo mi vale"});
        }else{
            const codiguito = Number(req.params.idButaca);
            const objCubi: Butaca = new Butaca(codiguito,"", 0, 0);
            ButacaDAO.borreloYa(objCubi,res);
        }

        
    }

    public actualizaTuButaca(req: Request, res:Response): void{
        const objCubi: Butaca = new Butaca(0,"",0,0);
        objCubi.idButaca = Number(req.body.idButaca);
        objCubi.columna = Number(req.body.columna);
        objCubi.fila = String(req.body.fila);
        objCubi.idSala = Number(req.body.idSala);
        ButacaDAO.actualiceloYa(objCubi, res);
    }

}

const butacaControlador = new ButacaControlador();

export default butacaControlador;
