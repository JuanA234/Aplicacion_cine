import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_TIPOS_COMIDAS } from "../repository/sql_tipo_comidas";
import TipoComida from "../entity/TipoComida";



class TipoComidaDAO {

    protected static async obtenerTodo(tamPag:any, page:any,  res: Response) {
        await pool
        .task(async(consulta)=>{
            const offset = (page-1)*tamPag;
            const resultado = await consulta.result(SQL_TIPOS_COMIDAS.GET_ALL, [tamPag, offset]);

            const cubi = await consulta.manyOrNone(SQL_TIPOS_COMIDAS.TOTAL);
            const totalTiposComidas = cubi[0].count;

        return{resultado, totalTiposComidas};
        })
        .then(({resultado, totalTiposComidas})=>{
            res.status(200).json({
                resultado: resultado.rows,
                totalComidas: totalTiposComidas,
            });
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
            const cubi = await consulta.one(SQL_TIPOS_COMIDAS.HOW_MANY, [datos.idTipoComida, datos.nombreTipoComida])
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
            res.status(400).json({respuesta: "Se totio mano",
                mensaje: miError.message,
                error: miError
            });
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
            res.status(400).json({respuesta: "Pailas, sql totiado",
                mensaje: miErrorcito.message,
                error: miErrorcito
            });
        });
    }
    
    protected static async actualiceloYa(datos:TipoComida, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_TIPOS_COMIDAS.HOW_MANY, [datos.idTipoComida, datos.nombreTipoComida])
            if(cubi.existe != 0){
                queHacer = 2;
                const like = datos.nombreTipoComida + "%";
                respuBase = await consulta.none(SQL_TIPOS_COMIDAS.UPDATE_MASIVO, [datos.descripcion, like]);
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
            res.status(400).json({respuesta: "Pailas, sql totiado",
                mensaje: miError.message,
                error: miError
            });
        });
    }

}

export default TipoComidaDAO;