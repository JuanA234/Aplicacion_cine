import { Response } from "express";
import { SQL_SALAS } from "../repository/sql_sala";
import pool from "../../../config/connection/dbConnection";
import Sala from "../entity/Sala";

class SalaDAO {

    protected static async obtenerTodo(params: any, res: Response) {
        await pool
        .result(SQL_SALAS.GET_ALL, params)
        .then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            res.status(400).json({
                "respuesta": miError
            });
        });
    }
    
    protected static async vistaPaginada(params: any, res: Response){
        await pool.task(async (consulta) => {
            const page = parseInt(params.query.page as string) || 1; // Valor por defecto a 1
            const limit = parseInt(params.query.limit as string) || 10; // Valor por defecto a 10

            if(page > limit && page <= 0)
                return res.status(400).json({respuesta: "Pagina invalida"});
            const desde = (page - 1) * limit;
            const salas = await consulta.manyOrNone(SQL_SALAS.GET_PAGE, [Number(limit), Number(desde)]);
            return salas
        }).then((salas) => {
            res.status(200).json(salas);
        })
        .catch(err => {
            res.status(400).json({
                "respuesta": err
                });
            }
        );
    }

    protected static async grabeloYa(datos:Sala, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_SALAS.HOW_MANY_CINE, [datos.idCine]);
            if(cubi.existe == 0){
                queHacer = 2;
                respuBase = await consulta.one(SQL_SALAS.ADD, [datos.salaCapacidad, datos.idCine]);
            }
            return {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 1: 
                    res.status(400).json({respuesta: "Compita ya existe la sala"});
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        })
        .catch((miError:any)=>{
            res.status(400).json({respuesta: miError});
        });
    }

    protected static async borreloYa(datos: Sala, res: Response): Promise<any>{
        try{
            pool
            .task((consulta)=>{
                return consulta. result(SQL_SALAS.DELETE, [datos.idSala]);
            })
            .then((respuesta)=>{
                res.status(200).json({
                    respuesta: "Lo borre sin miedo",
                    info: respuesta.rowCount,
                });
            })
            .catch((miErrorcito)=>{
                res.status(400).json({respuesta: "Pailas, sql totiado"});
            });
        } catch (e) {
            res.status(400).json({respuesta: e});
        }
    }

    protected static async actualizarCapacidadDeSalas(datos:Sala, res:Response): Promise<any>  {
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_SALAS.HOW_MANY_CINE, [datos.idCine]);
            if(cubi.existe != 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_SALAS.MASSIVE_UPDATE, [datos.salaCapacidad, datos.idCine]);
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
            res.status(400).json({respuesta: miError});
        });
    }

    protected static async actualiceloYa(datos:Sala, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_SALAS.HOW_MANY, [datos.idSala]);
            if(cubi.existe != 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_SALAS.UPDATE, [datos.salaCapacidad, datos.idCine, datos.idSala]);
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
            res.status(400).json({respuesta: miError});
        });
    }
}

export default SalaDAO;