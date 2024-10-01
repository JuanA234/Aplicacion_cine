import { Response, Request } from "express";
import SalaDAO from "../DAO/SalaDAO";
import Sala from "../entity/Sala";


class SalaControlador extends SalaDAO{

    public dameSalas(req:Request, res:Response){
        SalaDAO.obtenerTodo([],res);
    }

    public cogeTusala(req: Request, res: Response): void{
        const objCubi: Sala = new Sala(0, 0, 0);
        objCubi.salaCapacidad = req.body.salaCapacidad;
        objCubi.idCine = req.body.idCine;
        SalaDAO.grabeloYa(objCubi, res);
    }

    public salasPaginadas(req: Request, res: Response) : void {
        SalaDAO.vistaPaginada(req, res); 
    }

    public borraTuSala(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idSala))){
            res.status(400).json({respuesta: "Y el codigo mi vale"});
        }else{
            const codiguito = Number(req.params.idSala);
            const objCubi: Sala = new Sala(codiguito, 0, 0);
            SalaDAO.borreloYa(objCubi,res);
        }
    }

    public actualizaTuTAbla(req: Request, res:Response): void{
        const objCubi: Sala = new Sala(0, 0, 0);
        objCubi.idSala = Number(req.body.idSala)
        objCubi.salaCapacidad = Number(req.body.salaCapacidad);
        objCubi.idCine = Number(req.body.idCine);
        SalaDAO.actualiceloYa(objCubi, res);
    }

    public actualizarCapacidadDeSalas(req: Request, res:Response): void{
        /*
            Este metodo actualiza la capacidad de todas las salas de un cine
        */
        const objCubi: Sala = new Sala(0, 0, 0);
        objCubi.salaCapacidad = Number(req.body.salaCapacidad);
        objCubi.idCine = Number(req.body.idCine);
        SalaDAO.actualizarCapacidadDeSalas(objCubi, res);
    }
}

const salaControlador = new SalaControlador();

export default salaControlador;
