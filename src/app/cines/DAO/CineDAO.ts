import { Response } from "express";
import { SQL_CINES } from "../repository/sql_cine";
import pool from "../../../config/connection/dbConnection";
import Cine from "../entity/Cine";


class CineDAO {

    protected static async obtenerTodo(params: any, res: Response) {
        await pool
        .result(SQL_CINES.GET_ALL, params)
        .then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log("mi error");
            res.status(400).json({
                "respuesta": "ay no sirve"
            });
        });
    }

    protected static async grabeloYa(datos:Cine, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CINES.HOW_MANY, [datos.idCine])
            if(cubi.existe == 0){
                queHacer = 2;
                respuBase = await consulta.one(SQL_CINES.ADD, [datos.nombreCine, datos.idUbicacion]);
            }
            return {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 1: 
                    res.status(400).json({respuesta: "Compita ya existe el cine"});
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

    protected static async borreloYa(datos: Cine, res: Response): Promise<any>{
        pool
        .task((consulta)=>{
            return consulta. result(SQL_CINES.DELETE, [datos.idCine]);
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
    
    protected static async actualiceloYa(datos:Cine, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CINES.HOW_MANY, [datos.idCine])
            if(cubi.existe == 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_CINES.UPDATE, [datos.idUbicacion, datos.idUbicacion, datos.idCine]);
            }
            return {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 2: 
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

export default CineDAO;