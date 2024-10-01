import { Response, Request } from "express";
import CargosDAO from "../dao/CargosDAO";
import Cargos from "../entity/Cargos";

class CargosControlador extends CargosDAO{

    public dameCargos(req:Request, res:Response){
        CargosDAO.obtenerTodo([], res);
    }

    public funcionesPaginadas(req: Request, res: Response) : void {
        CargosDAO.vistaPaginada(req, res); 
    }


    public obtenerCargo(req: Request, res: Response): void {
        const objCubi: Cargos = new Cargos(0, "", "");
        objCubi.idCargo = req.body.idCargo;
        objCubi.nombreCargo = String(req.body.nombreCargo);
        objCubi.descripcionCargo = req.body.descripcionCargo;
        CargosDAO.grabeloYa(objCubi, res);
    }
    
    public borrarCargo(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idCargo))) {
            res.status(400).json({ respuesta: "Y el código mi vale?"});
        } else {
            const codiguito = Number(req.params.idCargo);
            const objcubi: Cargos = new Cargos(codiguito, "", "");
            CargosDAO.borreloYa(objcubi, res);
        }
    }

    public actualizarCargo(req: Request, res: Response): void {
        const objCubi: Cargos = new Cargos(0, "", "");
        objCubi.idCargo = Number(req.body.idCargo);
        objCubi.nombreCargo = String(req.body.nombreCargo);
        objCubi.descripcionCargo = String(req.body.descripcionCargo)
        CargosDAO.actualiceloYa(objCubi, res);
    }
    
    public actualizacionMasiva(req: Request, res: Response): void {
        const textoAReemplazar: string = req.body.textoAReemplazar; // Este sería el nombre_cargo
        const nuevoTexto: string = req.body.nuevoTexto; // Este sería la descripción   
        console.log(nuevoTexto, textoAReemplazar)
        if (!textoAReemplazar || !nuevoTexto) {
            res.status(400).json({ respuesta: "Faltan parámetros para la actualización masiva" });
        } else {
            // Crear el objeto `Cargos` con los datos del request
            const objCubi: Cargos = new Cargos(0, textoAReemplazar, nuevoTexto);           
            // Llamar al método de DAO para realizar la actualización masiva
            CargosDAO.actualizacionMasiva(objCubi, res);
        }
    }
    
}

const cargosControlador = new CargosControlador();
export default cargosControlador;