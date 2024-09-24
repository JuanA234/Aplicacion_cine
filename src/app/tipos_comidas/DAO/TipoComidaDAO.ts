import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_TIPOS_COMIDAS } from "../repository/sql_tipo_comidas";
import TipoComida from "../entity/TipoComida";



class TipoComidaDAO {

    protected static async obtenerTodo(params: any, res: Response) {
        await pool
        .result(SQL_TIPOS_COMIDAS.GET_ALL, params)
        .then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log("mi error");
            res.status(400).json({
                "respuesta": "ay no sirve"
            });
        });
    }

    protected static async grabeloYa(datos:TipoComida, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_TIPOS_COMIDAS.HOW_MANY, [datos.idTipoComida])
            if(cubi.existe == 0){
                queHacer = 2;
                respuBase = await consulta.one(SQL_TIPOS_COMIDAS.ADD, [datos.nombreTipoComida, datos.descripcion]);
            }
            return {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 1: 
                    res.status(400).json({respuesta: "Compita ya existe el TipoComida"});
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

    protected static async borreloYa(datos: TipoComida, res: Response): Promise<any>{
        pool
        .task((consulta)=>{
            return consulta. result(SQL_TIPOS_COMIDAS.DELETE, [datos.idTipoComida]);
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
    
    protected static async actualiceloYa(datos:TipoComida, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_TIPOS_COMIDAS.HOW_MANY, [datos.idTipoComida])
            if(cubi.existe != 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_TIPOS_COMIDAS.UPDATE, [datos.nombreTipoComida, datos.descripcion, datos.idTipoComida]);
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

export default TipoComidaDAO;