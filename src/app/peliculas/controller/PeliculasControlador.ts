import { Response, Request } from "express";
import PeliculasDAO from "../dao/PeliculasDAO";
import Peliculas from "../entity/Peliculas";

class PeliculasControlador extends PeliculasDAO{

    public damePeliculas(req:Request, res:Response){
        PeliculasDAO.obtenerTodo([], res);
    }

    public cogeTuPelicula(req: Request, res: Response): void {
        console.log(req.body);
        const objCubi: Peliculas = new Peliculas(0, "", "", 0);
        objCubi.idPelicula = req.body.idPelicula;
        objCubi.nombrePelicula = req.body.nombrePelicula;
        objCubi.duracionPelicula = req.body.duracionPelicula;
        objCubi.idGenero = req.body.idGenero;
        PeliculasDAO.grabeloYa(objCubi, res);
    }

    public peliculasPaginadas(req: Request, res: Response) : void {
        PeliculasDAO.vistaPaginada(req, res); 
    }

    public borraTuPelicula(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idPelicula))) {
        res.status(400).json({ respuesta: "Y el código mi vale?"});
        } else {
        const codiguito = Number(req.params.idPelicula);
        const objcubi: Peliculas = new Peliculas(codiguito, "", "", 0);
        PeliculasDAO.borreloYa(objcubi, res);
        }
    }


    public actualizaTuPelicula(req: Request, res: Response): void {
        const objCubi: Peliculas = new Peliculas(0, "", "", 0);
        objCubi.idPelicula = Number(req.body.idPelicula);
        objCubi.nombrePelicula = String(req.body.nombrePelicula);
        objCubi.duracionPelicula = String(req.body.duracionPelicula)
        objCubi.idGenero = Number(req.body.idGenero);
        PeliculasDAO.actualiceloYa(objCubi, res);
    }




}

const peliculasControlador = new PeliculasControlador();
export default peliculasControlador;