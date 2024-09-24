import { Response } from "express";
import { SQL_COMIDAS } from "../repository/sql_comidas";
import pool from "../../../config/connection/dbConnection";
import Comida from "../entity/Comidas";


class ComidaDAO {

    protected static async obtenerTodo(params: any, res: Response) {
        await pool
        .result(SQL_COMIDAS.GET_ALL, params)
        .then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log("mi error");
            res.status(400).json({
                "respuesta": "ay no sirve"
            });
        });
    }

    protected static async grabeloYa(datos:Comida, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_COMIDAS.HOW_MANY, [datos.idComida])
            if(cubi.existe == 0){
                queHacer = 2;
                respuBase = await consulta.one(SQL_COMIDAS.ADD, [datos.nombreComida, datos.idTipoComida]);
            }
            return {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 1: 
                    res.status(400).json({respuesta: "Compita ya existe el Comida"});
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

    protected static async borreloYa(datos: Comida, res: Response): Promise<any>{
        pool
        .task((consulta)=>{
            return consulta. result(SQL_COMIDAS.DELETE, [datos.idComida]);
        })
        .then((respuesta)=>{
            res.status(200).json({
                respuesta: "Lo borre sin miedo",
                info: respuesta.rowCount,
            });
        })
        .catch((miErrorcito)=>{
            console.log(miErrorcito );
            res.status(400).json({respuesta: "Pailas, sql totiado"});
        });
    }
    
    protected static async actualiceloYa(datos:Comida, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_COMIDAS.HOW_MANY, [datos.idComida])
            if(cubi.existe != 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_COMIDAS.UPDATE, [datos.nombreComida, datos.idTipoComida, datos.idComida]);
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

export default ComidaDAO;