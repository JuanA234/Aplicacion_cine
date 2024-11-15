import { Response, Request } from "express";
<<<<<<< HEAD
import Personas from "../entity/Personas";
import PersonasDAO from "../dao/PersonasDAO";
=======
import PersonasDAO from "../dao/PersonasDAO";
import Personas from "../entity/Personas";
>>>>>>> 98d3aaf4ec96a6e2ee6cdc2f30fce0ef85f31d54

class PersonasControlador extends PersonasDAO{

    public damePersonas(req:Request, res:Response){
        PersonasDAO.obtenerTodo([], res);
    }

    public obtenerPersona(req: Request, res: Response): void {
        const objCubi: Personas = new Personas(0, "", new Date(0), 0, 0, 0,0);
        objCubi.idPersona = req.body.idPersona;
        objCubi.nombrePersona = String(req.body.nombrePersona);
        objCubi.fechaNacimientoPersona = req.body.fechaNacimientoPersona;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idCine = req.body.idCine;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUsuario = req.body.idUsuario; 
        PersonasDAO.grabeloYa(objCubi, res);
    }
    
    public borrarPersona(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idPersona))) {
            res.status(400).json({ respuesta: "Y el código mi vale?"});
        } else {
            const codiguito = Number(req.params.idPersona);
            const objcubi: Personas = new Personas(codiguito,"", new Date(0), 0, 0, 0,0);
            PersonasDAO.borreloYa(objcubi, res);
        }
    }

    public actualizarPersona(req: Request, res: Response): void {
        const objCubi: Personas = new Personas(0, "", new Date(0), 0, 0, 0,0);
        objCubi.idPersona = req.body.idPersona;
        objCubi.nombrePersona = String(req.body.nombrePersona);
        objCubi.fechaNacimientoPersona = req.body.fechaNacimientoPersona;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idCine = req.body.idCine;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUsuario = req.body.idUsuario; 
        PersonasDAO.actualiceloYa(objCubi, res);
    }

    public personasPaginadas(req: Request, res: Response) : void {
        PersonasDAO.vistaPaginada(req, res); 
    }

}

const personasControlador = new PersonasControlador();
export default personasControlador;