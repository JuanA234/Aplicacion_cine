import { Response, Request } from "express";
import CartelerasDAO from "../dao/CartelerasDAO";
import Carteleras from "../entity/Carteleras";

class CartelerasControlador extends CartelerasDAO {

    
    public dameCarteleras(req: Request, res: Response) {
        CartelerasDAO.obtenerTodo([], res);  
    }

    
    public obtenerCartelera(req: Request, res: Response): void {
<<<<<<< HEAD
<<<<<<< HEAD
        const objCartelera: Carteleras = new Carteleras(0, 0);
        objCartelera.idCartelera = Number(req.body.idCartelera);
=======
        const objCartelera: Carteleras = new Carteleras(0,0);
        //objCartelera.idCartelera = Number(req.body.idCartelera);
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
        const objCartelera: Carteleras = new Carteleras(0,0);
        //objCartelera.idCartelera = Number(req.body.idCartelera);
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        objCartelera.idCine = Number(req.body.idCine);
    
        CartelerasDAO.grabeloYa(objCartelera, res);  
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
    public cartelerasPaginadas(req: Request, res: Response) : void {
        CartelerasDAO.vistaPaginada(req, res); 
    }

<<<<<<< HEAD
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
    
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
