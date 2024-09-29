import { Response } from "express";
import { SQL_RESERVACIONES } from "../repository/sql_reservaciones";
import pool from "../../../config/connection/dbConnection";
import Reservacion from "../entity/Reservacion";

class ReservacionDAO {

    protected static async obtenerTodo(params: any, res: Response) {
        await pool
            .result(SQL_RESERVACIONES.GET_ALL, params)
            .then((resultado) => {
                res.status(200).json(resultado.rows);
            }).catch((miError) => {
                console.log("mi error");
                res.status(400).json({
                    "respuesta": "ay no sirve"
                });
            });
    }

    protected static async grabeloYa(datos: Reservacion, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_RESERVACIONES.HOW_MANY, [datos.idReservacion]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = await consulta.one(SQL_RESERVACIONES.ADD, [datos.idPersona, datos.idButaca, datos.idFuncion]);
                }
                return { queHacer, respuBase };
            })
            .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe la sala" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
            .catch((miError: any) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Se totio mano" });
            });
    }

    protected static async borreloYa(datos: Reservacion, res: Response): Promise<any> {
        pool
            .task((consulta) => {
                return consulta.result(SQL_RESERVACIONES.DELETE, [datos.idReservacion]);
            })
            .then((respuesta) => {
                res.status(200).json({
                    respuesta: "Lo borre sin miedo",
                    info: respuesta.rowCount,
                });
            })
            .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
    }

    protected static async actualiceloYa(datos: Reservacion, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_RESERVACIONES.HOW_MANY, [datos.idReservacion]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = await consulta.none(SQL_RESERVACIONES.UPDATE, [datos.idPersona, datos.idButaca, datos.idFuncion, datos.idReservacion]);
                }
                return { queHacer, respuBase };
            })
            .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita no existe" });
                        break;
                    default:
                        res.status(200).json({ acualizado: "Ok" });
                        break;
                }
            })
            .catch((miError: any) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
    }

}

export default ReservacionDAO;