import { Response, Request } from "express";
import CartelerasDAO from "../dao/CartelerasDAO";
import Carteleras from "../entity/Carteleras";

class CartelerasControlador extends CartelerasDAO {

    
    public dameCarteleras(req: Request, res: Response) {
        CartelerasDAO.obtenerTodo([], res);  
    }

    
    public obtenerCartelera(req: Request, res: Response): void {
        const objCartelera: Carteleras = new Carteleras(0,0);
        //objCartelera.idCartelera = Number(req.body.idCartelera);
        objCartelera.idCine = Number(req.body.idCine);
    
        CartelerasDAO.grabeloYa(objCartelera, res);  
    }

    public cartelerasPaginadas(req: Request, res: Response) : void {
        CartelerasDAO.vistaPaginada(req, res); 
    }

    
    public borrarCartelera(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idCartelera))) {
            res.status(400).json({ respuesta: "Y el código de la cartelera?"});
        } else {
            const idCartelera = Number(req.params.idCartelera);
            const objCartelera: Carteleras = new Carteleras(idCartelera, 0);
            CartelerasDAO.borreloYa(objCartelera, res);  
        }
    }

    
    public actualizarCartelera(req: Request, res: Response): void {
        const objCartelera: Carteleras = new Carteleras(0, 0);
        objCartelera.idCartelera = Number(req.body.idCartelera);
        objCartelera.idCine = Number(req.body.idCine);
        CartelerasDAO.actualiceloYa(objCartelera, res);  
    }
}

const cartelerasControlador = new CartelerasControlador();
export default cartelerasControlador;
