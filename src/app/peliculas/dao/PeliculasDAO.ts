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
            const cubi = await consulta.one(SQL_PELICULAS.HOW_MANY, [datos.id_pelicula]);
            if (cubi.existe == 0) {
                queHacer = 2;
                respuBase = await consulta.one(SQL_PELICULAS.ADD, [datos.nombre_pelicula, datos.duracion_pelicula, datos.id_genero]);
            }
            return { queHacer, respuBase };
        }).then( ({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita ya existe la sala" });
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        }).catch((miError: any) => {
            console.log(miError);
            res.status(400).json({ respuesta: "Se totió mano" });
        });
    };

    protected static async borreloYa(datos: Peliculas, res: Response): Promise<any> {
        console.log("hola");
        pool.task((consulta) => {
            return consulta.result(SQL_PELICULAS.DELETE, [datos.id_pelicula]);
        }).then((respuesta) => {
            res.status (200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch( (miErrorcito) => {
            res.status(400).json({ respuesta: miErrorcito.detail});
        });
    };

    protected static async actualiceloYa(datos: Peliculas, res: Response): Promise<any>{
        pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_PELICULAS.HOW_MANY, [datos.id_pelicula]);
            if (cubi.existe != 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_PELICULAS. UPDATE, [datos.nombre_pelicula, datos.duracion_pelicula, datos.id_genero, datos.id_pelicula]);
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
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
    }



}

export default PeliculasDAO;