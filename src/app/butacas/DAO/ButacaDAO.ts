import {Response } from "express";
import { SQL_BUTACAS } from "../repository/sql_butacas";
import pool from "../../../config/connection/dbConnection";
import Butaca from "../entity/Butacas";
import { errors, queryResult } from "pg-promise";
import { SQL_SALAS } from "../../salas/repository/sql_sala";


class ButacaDAO {

    protected static async obtenerTodo(tamPag: any, page: any, res: Response) {
        await pool
        .task(async(consulta)=>{
            const offset = (page-1)*tamPag;
            const resultado = await consulta.result(SQL_BUTACAS.GET_ALL, [tamPag, offset]);
            const cubi = await consulta.manyOrNone(SQL_BUTACAS.TOTAL);
            const totalButacas = cubi[0].count;
        return{resultado, totalButacas};
        })
        .then(({resultado, totalButacas})=>{
            res.status(200).json({
                butacas: resultado.rows,
                totalButacas: totalButacas,
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
            let creado:boolean = false;
            const cubi = await consulta.oneOrNone(SQL_BUTACAS.HOW_MANY, [datos.idButaca, datos.fila, datos.columna]);
            if(cubi.existe == 0){
                queHacer = 2;
                respuBase = await consulta.one(SQL_BUTACAS.ADD, [datos.fila, datos.columna, datos.idSala]);
                creado = true;
            }

            return {queHacer, respuBase, creado};
        })
        .then(({queHacer, respuBase, creado})=>{
            switch(queHacer){
                case 1: 
                    res.status(200).json({
                        respuesta: "Compita ya existe la butaca",
                        creado:creado});
                    break;
                default:
                    res.status(200).json({
                        respuBase ,
                        respuesta:"Agregado con éxito",
                        creado:creado
                    });
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
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuesta:any;
            let borradoSinMiedo:boolean = false;
            const existe = await consulta.one(SQL_BUTACAS.EXISTE_OTRA_TABLA, [datos.idButaca]);
            if(existe.existe == 0){
                queHacer = 2;
                respuesta = consulta. result(SQL_SALAS.DELETE, [datos.idButaca]);
                borradoSinMiedo = true;
            }
             return {queHacer, respuesta, borradoSinMiedo};
        })
        .then(({queHacer, respuesta, borradoSinMiedo})=>{
            switch(queHacer){
                case 1: 
                    res.status(200).json({
                        respuesta: "Compita no puedes borrarlo, existe en otra tabla",
                        borradoSinMiedo: borradoSinMiedo,
                    });
                    
                    break;
                default:
                    res.status(200).json({
                        respuesta: "Lo borre sin miedo",
                        info: respuesta.rowCount,
                        borradoSinMiedo: borradoSinMiedo,
                    });
                    break;
            }
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
    
    protected static async actualiceVarios(datos:Butaca, res:Response): Promise<any>{
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

    protected static async actualiceUno(datos:Butaca, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            let actualizado:boolean = false;
            const cubi = await consulta.one(SQL_BUTACAS.HOW_MANY, [datos.idButaca, datos.fila, datos.columna])
            if(cubi.existe != 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_BUTACAS.UPDATE,[datos.fila, datos.columna, datos.idSala, datos.idButaca]);
                actualizado = true;
            }
            return {queHacer, respuBase, actualizado};
        })
        .then(({queHacer, respuBase, actualizado})=>{
            switch(queHacer){
                case 1: 
                    res.status(200).json({respuesta: "Compita no existe",
                        actualizado:actualizado,
                    });
                    break;
                default:
                    res.status(200).json({respuesta: "Actualizado",
                        actualizado: actualizado
                    });
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