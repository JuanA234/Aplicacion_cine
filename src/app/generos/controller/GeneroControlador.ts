import { Response, Request } from "express";
import GeneroDAO from "../DAO/GeneroDAO";
import Genero from "../entity/Genero";

class GeneroControlador extends GeneroDAO {
    public dameGeneros(req: Request, res: Response) {
        GeneroDAO.obtenerTodo([], res);
    }

    public cogeTuGenero(req: Request, res: Response): void {
        const objCubi: Genero = new Genero(0, "");
        objCubi.nombreGenero = req.body.nombreGenero;
        GeneroDAO.grabeloYa(objCubi, res);
    }

    public funcionesPaginadas(req: Request, res: Response) : void {
        GeneroDAO.vistaPaginada(req, res); 
    }

    public borraTuGenero(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idGenero))){
            res.status(400).json({respuesta: "Y el codigo mi vale"});
        }else{
            const codiguito = Number(req.params.idGenero);
            const objCubi: Genero = new Genero(codiguito, "");
            GeneroDAO.borreloYa(objCubi,res);
        }
    }

    public actualizaTuGenero(req: Request, res: Response): void{
        const objCubi: Genero = new Genero(0, "");
        objCubi.idGenero = Number(req.body.idGenero);
        objCubi.nombreGenero = req.body.nombreGenero;
        GeneroDAO.actualizaloYa(objCubi, res);
    }
}

const generoControlador = new GeneroControlador();

export default generoControlador;