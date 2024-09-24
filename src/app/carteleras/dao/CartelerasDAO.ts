import { Response } from "express";
import {SQL_CARTELERAS } from "../repository/sql_carteleras";
import pool from "../../../config/connection/dbConnection";
import Carteleras from "../entity/Carteleras";

class CartelerasDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_CARTELERAS.GET_ALL).then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "No funciona"
            });
        });
    };

    protected static async grabeloYa(datos: Carteleras, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CARTELERAS.HOW_MANY, [datos.idCartelera]);
            if (cubi.existe == 0) {
                queHacer = 2;
                respuBase = await consulta.one(SQL_CARTELERAS.ADD, [datos.idCartelera, datos.idCine]);
            }
            return { queHacer, respuBase };
        }).then( ({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "El cargo ya existe" });
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        }).catch((miError: any) => {
            console.log(miError);
            res.status(400).json({ respuesta: "Ocurrio un error" });
        });
    };
     
    protected static async borreloYa(datos: Carteleras, res: Response): Promise<any> {
        pool.task((consulta) => {
            return consulta.result(SQL_CARTELERAS.DELETE, [datos.idCartelera]);
        }).then((respuesta) => {
            res.status (200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch( (miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
        });
    };

    protected static async actualiceloYa(datos: Carteleras, res: Response): Promise<any> {
        try {
            const result = await pool.task(async (consulta) => {
                const cubi = await consulta.one(SQL_CARTELERAS.HOW_MANY, [datos.idCartelera]);
                if (cubi.existe == 0) {
                    // Si no existe, actualizamos
                    await consulta.none(SQL_CARTELERAS.UPDATE, [datos.idCartelera, datos.idCine]);
                    return { queHacer: 2 };
                }
                return { queHacer: 1 }; // Ya existe
            });
    
            switch (result.queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita ya existe" });
                    break;
                case 2:
                    res.status(200).json({ actualizado: "ok" });
                    break;
            }
        } catch (miErrorcito) {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
        }
    }
}

export default CartelerasDAO;