import { Response, Request } from "express";
import CartelerasCinesDAO from "../dao/CartelerasCinesDAO";
import CartelerasCines from "../entity/CartelerasCines";
import cartelerasControlador from "../../carteleras/controller/CartelerasControlador";

class CartelerasCinesControlador extends CartelerasCinesDAO{

    public dameCartelerasCines(req:Request, res:Response){
        CartelerasCinesDAO.obtenerTodo([], res);
    }

    public cartelerasCinesPaginadas(req: Request, res: Response) : void {
        CartelerasCinesDAO.vistaPaginada(req, res); 
    }

    public obtenerCartelerasCines(req: Request, res: Response): void {
        const objCubi: CartelerasCines = new CartelerasCines(0, 0, new Date(0), new Date(0), 0);
        objCubi.idCartelera = req.body.idCartelera;
        objCubi.idPelicula = Number(req.body.idPelicula);
        objCubi.fechaDesde = req.body.fechaDesde;
        objCubi.fechaHasta = req.body.fechaHasta;
        objCubi.idCine = req.body.idCine;
        CartelerasCinesDAO.grabeloYa(objCubi, res);
    }
    
    public borrarCartelerasCines(req: Request, res: Response): void {
        const idCartelera = Number(req.params.idCartelera);
        const idPelicula = Number(req.params.idPelicula);

        if (isNaN(idCartelera) || isNaN(idPelicula)) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        } else {
            const objcubi: CartelerasCines = new CartelerasCines(idCartelera, idPelicula, new Date(0), new Date(0), 0);
            CartelerasCinesDAO.borreloYa(objcubi, res);
        }
    }

    public actualizarCartelerasCines(req: Request, res: Response): void {
        const objCubi: CartelerasCines = new CartelerasCines(0, 0, new Date(0), new Date(0), 0 );
        objCubi.idCartelera = req.body.idCartelera;
        objCubi.idPelicula = Number(req.body.idPelicula);
        objCubi.fechaDesde = req.body.fechaDesde;
        objCubi.fechaHasta = req.body.fechaHasta;
        objCubi.idCine = req.body.idCine;
        CartelerasCinesDAO.actualiceloYa(objCubi, res);
    }
    
}

const cartelerasCinesControlador = new CartelerasCinesControlador();
export default cartelerasCinesControlador;