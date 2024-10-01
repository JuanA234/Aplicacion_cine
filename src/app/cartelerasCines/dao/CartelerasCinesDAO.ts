import { Response } from "express";
import {SQL_CARTELERAS_CINES } from "../repository/sql_cartelerasCines";
import pool from "../../../config/connection/dbConnection";
import CartelerasCines from "../entity/CartelerasCines";

class CartelerasCinesDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_CARTELERAS_CINES.GET_ALL).then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "No funciona"
            });
        });
    };

    protected static async vistaPaginada(params: any, res: Response){
        await pool.task(async (consulta) => {
            const page = parseInt(params.query.page as string) || 1; // Valor por defecto a 1
            const limit = parseInt(params.query.limit as string) || 10; // Valor por defecto a 10
            if(page > limit && page <= 0)
                return res.status(400).json({respuesta: "Pagina invalida"});
            const desde = (page - 1) * limit;
            const cartelerasCines = await consulta.manyOrNone(SQL_CARTELERAS_CINES.GET_PAGE, [Number(limit), Number(desde)]);
            return cartelerasCines;
        }).then((cartelerasCines) => {
            res.status(200).json(cartelerasCines);
        })
        .catch(err => {
            res.status(400).json({
                "respuesta": err
                });
            }
        );
    }

    protected static async grabeloYa(datos: CartelerasCines, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CARTELERAS_CINES.HOW_MANY, [datos.idCartelera, datos.idPelicula]);
            if (cubi.existe == 0) {
                queHacer = 2;
                respuBase = await consulta.one(SQL_CARTELERAS_CINES.ADD, [datos.idCartelera, datos.idPelicula,
                    datos.fechaDesde, datos.fechaHasta, datos.idCine]);
            }
            return { queHacer, respuBase };
        }).then( ({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "La cartelera_cine que intentas añadir ya existe" });
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        }).catch((miError: any) => {
            console.log(miError);
            res.status(400).json({ respuesta: "Ocurrio un error",
                error: miError.detail
             });
        });
    };
     
    protected static async borreloYa(datos: CartelerasCines, res: Response): Promise<any> {
        pool.task((consulta) => {
            return consulta.result(SQL_CARTELERAS_CINES.DELETE, [datos.idCartelera, datos.idPelicula]);
        }).then((respuesta) => {
            res.status (200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch( (miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: miErrorcito.detail });
        });
    };

    protected static async actualiceloYa(datos: CartelerasCines, res: Response): Promise<any>{
        pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CARTELERAS_CINES.HOW_MANY, [datos.idCartelera, datos.idPelicula]);
            if (cubi.existe != 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_CARTELERAS_CINES.UPDATE, [datos.idCartelera, datos.idPelicula,
                    datos.fechaDesde, datos.fechaHasta, datos.idCine]);
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

export default CartelerasCinesDAO;
