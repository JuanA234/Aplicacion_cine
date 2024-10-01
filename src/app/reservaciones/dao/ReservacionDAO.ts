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
                const cubi = await consulta.one(SQL_RESERVACIONES.HOW_MANY_ESPECIFIC, [datos.idPersona, datos.idButaca, datos.idFuncion]);

                if (cubi.existe == 0) {
                    queHacer = 2;
                    console.log(datos);
                    respuBase = await consulta.one(SQL_RESERVACIONES.ADD, [datos.idPersona, datos.idButaca, datos.idFuncion]);
                }
                return { queHacer, respuBase };
            })
            .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe la Reservacion" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
            .catch((miError: any) => {
                res.status(400).json({ respuesta: miError.detail });
            });
    }

    protected static async vistaPaginada(params: any, res: Response){
        await pool.task(async (consulta) => {
            const page = parseInt(params.query.page as string) || 1; // Valor por defecto a 1
            const limit = parseInt(params.query.limit as string) || 10; // Valor por defecto a 10
            if(page > limit && page <= 0)
                return res.status(400).json({respuesta: "Pagina invalida"});
            const desde = (page - 1) * limit;
            const salas = await consulta.manyOrNone(SQL_RESERVACIONES.GET_PAGE, [Number(limit), Number(desde)]);
            return salas;
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
                res.status(400).json({ respuesta: miErrorcito.detail });
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
                res.status(400).json({ respuesta: miError.detail });
            });
    }

}

export default ReservacionDAO;