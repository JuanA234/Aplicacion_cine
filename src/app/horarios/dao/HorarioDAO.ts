import { Response } from "express";
import { SQL_HORARIOS } from "../repository/sql_horario";
import pool from "../../../config/connection/dbConnection";
import Horario from "../entity/Horario";

class HorarioDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_HORARIOS.GET_ALL).then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "Ay no sirve"
            });
        });
    };

    protected static async grabeloYa(datos: Horario, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_HORARIOS.HOW_MANY, [datos.idHorario]);
            if (cubi.existe == 0) {
                queHacer = 2;
                
                const validacion = await consulta.one(SQL_HORARIOS.GET_REPEATED, [datos.fecha, datos.hora, datos.idPelicula]);
                if(validacion.total_repetidos == 0){
                    queHacer = 3;
                    respuBase = await consulta.one(SQL_HORARIOS.ADD, [datos.fecha, datos.hora, datos.idPelicula]);
                }
            }
            return { queHacer, respuBase };
        }).then( ({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita ya existe el horario" });
                    break;
                case 2:
                    res.status(400).json({ respuesta : "El mismo horario ya fue creado" });
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

    protected static async borreloYa(datos: Horario, res: Response): Promise<any> {
        pool.task((consulta) => {
            return consulta.result(SQL_HORARIOS.DELETE, [datos.idHorario]);
        }).then((respuesta) => {
            res.status (200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch( (miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "No se puede borrar ese horario." });
        });
    };

    protected static async actualiceloYa(datos: Horario, res: Response): Promise<any>{
        pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_HORARIOS.VERIFY_EXISTENCE_DATE, [datos.fecha]);
            if (cubi.existe != 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_HORARIOS.UPDATE_DATES, [datos.fecha]);
            }
            return { queHacer, respuBase };
            }).then( ({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "No existen horarios con la fecha mencionada" });
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

}

export default HorarioDAO;