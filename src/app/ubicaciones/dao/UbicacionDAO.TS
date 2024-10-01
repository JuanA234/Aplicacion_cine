import { Response } from "express";
import { SQL_UBICACIONES } from "../repository/sql_ubicaciones";
import pool from "../../../config/connection/dbConnection";
import Ubicacion from "../entity/Ubicacion";

class UbicacionDAO {
    protected static async obtenerTodo(tamPag: any, page: any, res: Response){
        await pool
        .task(async(consulta)=>{
            const cubi = await consulta.many(SQL_UBICACIONES.TOTAL);
            const rows = cubi[0].count;
            const offset = (page-1)*tamPag;
            const resultado = await consulta.result(SQL_UBICACIONES.GET_ALL, [tamPag, offset]);
            return{resultado, rows};
        })
        .then(({resultado, rows}) =>{
            res.status(200).json({
                menus : resultado.rows,
                totalMenus : rows
            });
            res.status(200).json({
                totalMenus : rows,
                menus : resultado.rows
            });
        }).catch((miError:any) => {
            res.status(400).json({
                "respuesta" : "ay no sirve",
                mensaje : miError.message,
                Error : miError,
                NombreError: miError.name
            });
        });
    }

    protected static async grabeloYa(datos: Ubicacion, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_UBICACIONES.HOW_MANY, [datos.idUbicacion]);
            if (cubi.existe == 0) {
                queHacer = 2;
                
                const validacion = await consulta.one(SQL_UBICACIONES.GET_REPEATED, [datos.nombreUbicacion, datos.idPadre]);
                if(validacion.total_repetidos == 0){
                    queHacer = 3;
                    respuBase = await consulta.one(SQL_UBICACIONES.ADD, [datos.nombreUbicacion, datos.idPadre]);
                }
            }
            return { queHacer, respuBase };
        }).then( ({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita ya existe la ubicación" });
                    break;
                case 2:
                    res.status(400).json({ respuesta : "La misma ubicación ya fue creada" });
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        }).catch((miError: any) => {
            console.log(miError);
            res.status(400).json({ respuesta: "Se totió mano" });
        });
    };

    protected static async borreloYa(datos: Ubicacion, res: Response): Promise<any> {
        pool.task((consulta) => {
            return consulta.result(SQL_UBICACIONES.DELETE, [datos.idUbicacion]);
        }).then((respuesta) => {
            res.status (200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch( (miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "No se puede borrar esa ubicacion." });
        });
    };

    protected static async actualiceloYa(datos:Ubicacion, res:Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_UBICACIONES.HOW_MANY, [datos.idUbicacion]);
            if(cubi.existe != 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_UBICACIONES.UPDATE, [datos.nombreUbicacion, datos.idPadre]);
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

export default UbicacionDAO;