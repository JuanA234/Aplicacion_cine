import { Response, Request } from "express";
import TipoComida from "../Entity/TipoComidas";
import TipoComidaDAO from "../DAO/TipoComidasDAO";

class TipoComidaControlador extends TipoComidaDAO{

    public dameTipoComidas(req:Request, res:Response){
        let {tamPag, page} = req.query;
        TipoComidaDAO.obtenerTodo(tamPag, page,res);
    }

    public cogeTuTipoComida(req: Request, res: Response): void{
        const objCubi: TipoComida = new TipoComida(0,"","");
        objCubi.descripcion = req.body.descripcion;
        objCubi.nombreTipoComida = req.body.nombreTipoComida;
        TipoComidaDAO.grabeloYa(objCubi, res);
    }

    public borraTuTipoComida(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idTipoComida))){
            res.status(400).json({respuesta: "Y el codigo mi vale"});
        }else{
            const codiguito = Number(req.params.idTipoComida);
            const objCubi: TipoComida = new TipoComida(codiguito,"","");
            TipoComidaDAO.borreloYa(objCubi,res);
        }

        
    }

    public actualizaTuTipoComida(req: Request, res:Response): void{
        const objCubi: TipoComida = new TipoComida(0,"","");
        objCubi.idTipoComida = Number(req.body.idTipoComida);
        objCubi.descripcion = String(req.body.descripcion);
        objCubi.nombreTipoComida = String(req.body.nombreTipoComida);
        TipoComidaDAO.actualiceUno(objCubi, res);
    }

}

const tipoComidaControlador = new TipoComidaControlador();

export default tipoComidaControlador;