import { Response } from "express";
import {SQL_CARGOS } from "../repository/sql_cargos";
import pool from "../../../config/connection/dbConnection";
import Cargos from "../entity/Cargos";

class CargosDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_CARGOS.GET_ALL).then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "No funciona"
            });
        });
    };

    protected static async grabeloYa(datos: Cargos, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CARGOS.HOW_MANY, [datos.idCargo]);
            if (cubi.existe == 0) {
                queHacer = 2;
                respuBase = await consulta.one(SQL_CARGOS.ADD, [datos.nombreCargo, datos.descripcionCargo]);
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
     
    protected static async borreloYa(datos: Cargos, res: Response): Promise<any> {
        pool.task((consulta) => {
            return consulta.result(SQL_CARGOS.DELETE, [datos.idCargo]);
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

    protected static async actualiceloYa(datos: Cargos, res: Response): Promise<any>{
        pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CARGOS.HOW_MANY, [datos.idCargo]);
            if (cubi.existe != 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_CARGOS.UPDATE, [datos.nombreCargo, datos.descripcionCargo, datos.idCargo]);
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

    protected static async vistaPaginada(params: any, res: Response){
        await pool.task(async (consulta) => {
            const page = parseInt(params.query.page as string) || 1; // Valor por defecto a 1
            const limit = parseInt(params.query.limit as string) || 10; // Valor por defecto a 10
            if(page > limit && page <= 0)
                return res.status(400).json({respuesta: "Pagina invalida"});
            const desde = (page - 1) * limit;
            const cargos = await consulta.manyOrNone(SQL_CARGOS.GET_PAGE, [Number(limit), Number(desde)]);
            return cargos;
        }).then((cargos) => {
            res.status(200).json(cargos);
        })
        .catch(err => {
            res.status(400).json({
                "respuesta": err
                });
            }
        );
    }
}

export default CargosDAO;
