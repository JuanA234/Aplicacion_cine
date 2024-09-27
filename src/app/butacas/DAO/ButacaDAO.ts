import {Response } from "express";
import { SQL_BUTACAS } from "../repository/sql_butacas";
import pool from "../../../config/connection/dbConnection";
import Butaca from "../entity/Butacas";
import { errors, queryResult } from "pg-promise";


class ButacaDAO {

    protected static async obtenerTodo(tamPag: any, page: any, res: Response) {
        await pool
        .task(async(consulta)=>{
            const cubi = await consulta.many(SQL_BUTACAS.TOTAL);
            const rows = cubi[0].count;
            const offset = (page-1)*tamPag;
            const resultado = await consulta.result(SQL_BUTACAS.GET_ALL, [tamPag, offset]);
        return{resultado, rows};
        })
        .then(({resultado, rows})=>{
            res.status(200).json({
                butacas: resultado.rows,
                totalButacas: rows
                
            });
            res.status(200).json({
                totalButacas: rows,
                butacas: resultado.rows
                
            });
        }).catch((miError:any) => {
            res.status(400).json({
                "respuesta": "ay no sirve",
                mensaje: miError.message,
                Error: miError,
                NombreError: miError.name,
            });
        });
    }

    protected static async grabeloYa(datos:Butaca, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.oneOrNone(SQL_BUTACAS.HOW_MANY, [datos.idButaca, datos.fila, datos.columna]);
            if(cubi.existe == 0){
                queHacer = 2;
                respuBase = await consulta.one(SQL_BUTACAS.ADD, [datos.fila, datos.columna, datos.idSala]);
            }

            return {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 1: 
                    res.status(400).json({respuesta: "Compita ya existe la butaca"});
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        })
        .catch((miError:any)=>{
            res.status(400).json({respuesta: "Se totio mano",
                mensaje: miError.message,
                Error: miError,
                NombreError: miError.name,
            });
        });
    }

    protected static async borreloYa(datos: Butaca, res: Response): Promise<any>{
        pool
        .task((consulta)=>{
            return consulta.result(SQL_BUTACAS.DELETE, [datos.idButaca]);
        })
        .then((respuesta)=>{
            res.status(200).json({
                respuesta: "Lo borre sin miedo",
                info: respuesta.rowCount,
            });
        })
        .catch((miErrorcito:any)=>{
            res.status(400).json({
                resultado: "Pailas, sql totiao",
                mensaje: miErrorcito.message,
                Error: miErrorcito,
                //NombreError: miErrorcito.name,
                //stackError: miErrorcito.stack
            });
        });
    }
    
    protected static async actualiceloYa(datos:Butaca, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_BUTACAS.HOW_MANY, [datos.idButaca, datos.fila, datos.columna])
            if(cubi.existe != 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_BUTACAS.UPDATE_MASIVO,[datos.fila, datos.columna, datos.idSala, datos.fila]);
            }
            return {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 1: 
                    res.status(400).json({respuesta: "Compita no existe"});
                    break;
                default:
                    res.status(200).json({acualizado: "Ok"});
                    break;
            }
        })
        .catch((miError:any)=>{
            res.status(400).json({respuesta: "pailas, sql totiao",
                mensaje: miError.message,
                NombreError: miError.name,
                Error: miError,
                //stackError: miError.stack
            });
        });
    }

}

export default ButacaDAO;