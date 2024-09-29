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
        objCubi.id_pelicula = req.body.id_pelicula;
        objCubi.nombre_pelicula = req.body.nombre_pelicula;
        objCubi.duracion_pelicula = req.body.duracion_pelicula;
        objCubi.id_genero = req.body.id_genero;
        PeliculasDAO.grabeloYa(objCubi, res);
    }

    public borraTuPelicula(req: Request, res: Response): void {
        if (isNaN(Number(req.params.id_pelicula))) {
        res.status(400).json({ respuesta: "Y el código mi vale?"});
        } else {
        const codiguito = Number(req.params.id_pelicula);
        const objcubi: Peliculas = new Peliculas(codiguito, "", "", 0);
        PeliculasDAO.borreloYa(objcubi, res);
        }
    }


    public actualizaTuPelicula(req: Request, res: Response): void {
        const objCubi: Peliculas = new Peliculas(0, "", "", 0);
        objCubi.id_pelicula = Number(req.body.id_pelicula);
        objCubi.nombre_pelicula = String(req.body.nombre_pelicula);
        objCubi.duracion_pelicula = String(req.body.duracion_pelicula)
        objCubi.id_genero = Number(req.body.id_genero);
        PeliculasDAO.actualiceloYa(objCubi, res);
    }




}

const peliculasControlador = new PeliculasControlador();
export default peliculasControlador;