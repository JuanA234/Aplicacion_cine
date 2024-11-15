import { Response } from "express";
import { SQL_PELICULAS } from "../repository/sql_peliculas";
import pool from "../../../config/connection/dbConnection";
import Peliculas from "../entity/Peliculas";

class PeliculasDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_PELICULAS.GET_ALL).then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "Ay no sirve"
            });
        });
    };

    protected static async grabeloYa(datos: Peliculas, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_PELICULAS.HOW_MANY, [datos.idPelicula, datos.nombrePelicula]);
            if (cubi.existe == 0) {
                queHacer = 2;
                respuBase = await consulta.one(SQL_PELICULAS.ADD, [datos.nombrePelicula, datos.duracionPelicula, datos.idGenero]);
            }
            return { queHacer, respuBase };
        }).then( ({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita ya existe la pelicula" });
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        }).catch((miError: any) => {
            res.status(400).json({ respuesta: miError.detail });
        });
    };

    protected static async borreloYa(datos: Peliculas, res: Response): Promise<any> {
        pool.task((consulta) => {
            return consulta.result(SQL_PELICULAS.DELETE, [datos.idPelicula]);
        }).then((respuesta) => {
            res.status (200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch( (miErrorcito) => {
            console.log(miErrorcito.detail);
            res.status(400).json({ respuesta: miErrorcito.detail});
        });
    };

    protected static async vistaPaginada(params: any, res: Response){
        await pool.task(async (consulta) => {
            const page = parseInt(params.query.page as string) || 1; // Valor por defecto a 1
            const limit = parseInt(params.query.limit as string) || 10; // Valor por defecto a 10

            if(page > limit && page <= 0)
                return res.status(400).json({respuesta: "Pagina invalida"});
            const desde = (page - 1) * limit;  
            const salas = await consulta.manyOrNone(SQL_PELICULAS.GET_PAGE, [Number(limit), Number(desde)]);
            return salas
        }).then((salas) => {
            res.status(200).json(salas);
        })
        .catch(err => {
            console.log("mi error");
            res.status(400).json({
                "respuesta": "Se estalló"
                });
            }
        );
    }

    protected static async actualiceloYa(datos: Peliculas, res: Response): Promise<any>{
        pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_PELICULAS.HOW_MANY, [datos.idPelicula]);
            if (cubi.existe != 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_PELICULAS. UPDATE, [datos.nombrePelicula, datos.duracionPelicula, datos.idGenero, datos.idPelicula]);
            }
            return { queHacer, respuBase };
            }).then( ({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe" });
                        break;
                    default:
                        res.status(200).json({ actualizado: "ok" });
                        break;
                }
            }).catch( (miErrorcito) => {
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
    }



}

export default PeliculasDAO;