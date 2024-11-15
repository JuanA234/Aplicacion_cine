import { Response } from "express";
import { SQL_HORARIOS } from "../repository/sql_horario";
import pool from "../../../config/connection/dbConnection";
import Horario from "../entity/Horario";

class HorarioDAO {
<<<<<<< HEAD
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
=======
    protected static async obtenerTodo(tamPag: any, page: any, res: Response){
        await pool
        .task(async(consulta)=>{
            const cubi = await consulta.many(SQL_HORARIOS.TOTAL);
            const rows = cubi[0].count;
            const offset = (page-1)*tamPag;
            const resultado = await consulta.result(SQL_HORARIOS.GET_ALL, [tamPag, offset]);
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
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586

    protected static async grabeloYa(datos: Horario, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_HORARIOS.HOW_MANY, [datos.idHorario]);
            if (cubi.existe == 0) {
                queHacer = 2;
<<<<<<< HEAD
                respuBase = await consulta.one(SQL_HORARIOS.ADD, [datos.idHorario, datos.fecha, datos.hora, datos.idPelicula]);
=======
                
                const validacion = await consulta.one(SQL_HORARIOS.GET_REPEATED, [datos.fecha, datos.hora, datos.idPelicula]);
                if(validacion.total_repetidos == 0){
                    queHacer = 3;
                    respuBase = await consulta.one(SQL_HORARIOS.ADD, [datos.fecha, datos.hora, datos.idPelicula]);
                }
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
            }
            return { queHacer, respuBase };
        }).then( ({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
<<<<<<< HEAD
                    res.status(400).json({ respuesta: "Compita ya existe la sala" });
=======
                    res.status(400).json({ respuesta: "Compita ya existe el horario" });
                    break;
                case 2:
                    res.status(400).json({ respuesta : "El mismo horario ya fue creado" });
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
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
<<<<<<< HEAD
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
=======
            res.status(400).json({ respuesta: "No se puede borrar ese horario." });
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        });
    };

    protected static async actualiceloYa(datos: Horario, res: Response): Promise<any>{
        pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
<<<<<<< HEAD
            const cubi = await consulta.one(SQL_HORARIOS.HOW_MANY, [datos.idHorario]);
            if (cubi.existe == 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_HORARIOS. UPDATE, [datos.fecha, datos.hora, datos.idPelicula]);
=======
            const cubi = await consulta.one(SQL_HORARIOS.VERIFY_EXISTENCE_DATE, [datos.fecha]);
            if (cubi.existe != 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_HORARIOS.UPDATE_DATES, [datos.fecha]);
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
            }
            return { queHacer, respuBase };
            }).then( ({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
<<<<<<< HEAD
                        res.status(400).json({ respuesta: "Compita ya existe" });
=======
                        res.status(400).json({ respuesta: "No existen horarios con la fecha mencionada" });
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
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