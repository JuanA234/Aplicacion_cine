import { Response } from "express";
import { SQL_CARGOS } from "../repository/sql_cargos";
import pool from "../../../config/connection/dbConnection";
import Cargos from "../entity/Cargos";

class CargosDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_CARGOS.GET_ALL, params).then((resultado) => {
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "No funciona"
            });
        });
    };

    protected static async vistaPaginada(params: any, res: Response) {
        await pool.task(async (consulta) => {
            const page = parseInt(params.query.page as string) || 1; // Valor por defecto a 1
            const limit = parseInt(params.query.limit as string) || 10; // Valor por defecto a 10
            if (page > limit && page <= 0)
                return res.status(400).json({ respuesta: "Pagina invalida" });
            const desde = (page - 1) * limit;
            const cargos = await consulta.manyOrNone(SQL_CARGOS.GET_PAGE, [Number(limit), Number(desde)]);
            return cargos;
        }).then((cargos) => {
            res.status(200).json(cargos);
        })
            .catch(err => {
                res.status(400).json({
                    "respuesta": err
                });
            }
            );
    }

    /** Metodo para actulizar todo */
    protected static async actualizarTodo(datos: Cargos, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let respuBase: any;
            let queHacer = 1;

            const cubi = await consulta.one(SQL_CARGOS.HOW_MANY, [datos.idCargo, datos.nombreCargo]);
            if (cubi.existe == 0) {

                if (datos.descripcionCargo != undefined) {
                    queHacer = 2;
                    respuBase = await consulta.none(SQL_CARGOS.UPDATE_ALL_DESC, [datos.descripcionCargo]);
                }
                if (datos.nombreCargo != undefined) {
                    queHacer = 3;
                }
            }

            return { queHacer, respuBase }
        }).then(({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Ya existe un cargo con ese nombre" });
                    break;
    
                case 2:
                    res.status(200).json({ respuesta: "ok" });
                    break;

                default:
                    res.status(400).json({respuesta: "Cada cargo debe tener un nombre unico"})
            }
        }).catch((miError: any) => {
            console.log(miError);
            res.status(400).json({ respuesta: "Ocurrio un error" });
        });
    };

    protected static async grabeloYa(datos: Cargos, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CARGOS.HOW_MANY, [datos.idCargo, datos.nombreCargo]);
            if (cubi.existe == 0) {
                queHacer = 2;
                respuBase = await consulta.one(SQL_CARGOS.ADD, [datos.nombreCargo, datos.descripcionCargo]);
            }
            return { queHacer, respuBase };
        }).then(({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "El cargo ya existe" });
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        }).catch((miError: any) => {
            console.log(miError);
            res.status(400).json({ respuesta: "Ocurrio un error" });
        });
    };

    protected static async borreloYa(datos: Cargos, res: Response): Promise<any> {
        pool.task((consulta) => {
            return consulta.result(SQL_CARGOS.DELETE, [datos.idCargo]);
        }).then((respuesta) => {
            res.status(200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch((miErrorcito) => {
            res.status(400).json({ error: miErrorcito.detail });
        });
    };

    protected static async borreloTodo(datos: any, res: Response): Promise<any> {
        pool.task((consulta) => {
            return consulta.result(SQL_CARGOS.DELETE_ALL, []);
        }).then((respuesta) => {
            res.status(200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch((miErrorcito) => {
            res.status(400).json({ error: miErrorcito.detail });
        });
    };

    protected static async actualizacionMasiva(datos: Cargos, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;

                // Verifica si existe el cargo antes de proceder
                const cubi = await consulta.one(SQL_CARGOS.HOW_MANY_1, [datos.nombreCargo]);
                console.log(cubi)
                if (cubi.existe != 0) {
                    queHacer = 2
                    console.log(":p");
                    // Ejecutar la actualización masiva con los dos parámetros dinámicos
                    respuBase = await consulta.none(SQL_CARGOS.MASSIVE_UPDATE, [datos.nombreCargo, datos.descripcionCargo]);
                    console.log(respuBase);
                }
                return { queHacer, respuBase };
            })
            .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita no existe la función" });
                        break;
                    case 2:
                        res.status(200).json({ actualizado: "Ok", resultado: respuBase });
                        break;
                }
            })
            .catch((err) => {
                res.status(400).json({ respuesta: err });
            });

    }


    protected static async actualiceloYa(datos: Cargos, res: Response): Promise<any> {
        pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;

            const cubi = await consulta.one(SQL_CARGOS.HOW_MANY, [datos.idCargo, datos.nombreCargo]);
            if (cubi.existe != 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_CARGOS.UPDATE, [datos.nombreCargo, datos.descripcionCargo, datos.idCargo]);
            }
            return { queHacer, respuBase };
        }).then(({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita ya existe" });
                    break;
                default:
                    res.status(200).json({ actualizado: "ok" });
                    break;
            }
        }).catch((miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
        });
    }
}

export default CargosDAO;
