import {Response } from "express";
import { SQL_BUTACAS } from "../repository/sql_butacas";
import pool from "../../../config/connection/dbConnection";
import Butaca from "../entity/Butacas";


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
        }).catch((miError) => {
            console.log("mi error");
            res.status(400).json({
                "respuesta": "ay no sirve"
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
            console.log(miError);
            res.status(400).json({respuesta: "Se totio mano"});
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
        .catch((miErrorcito)=>{
            res.status(400).json({mensaje: miErrorcito});
        });
    }
    
    protected static async actualiceloYa(datos:Butaca, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_BUTACAS.HOW_MANY, [datos.idButaca])
            if(cubi.existe != 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_BUTACAS.UPDATE, [datos.fila, datos.columna, datos.idSala, datos.idButaca]);
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
            console.log(miError);
            res.status(400).json({respuesta: "Pailas, sql totiado"});
        });
    }

}

export default ButacaDAO;