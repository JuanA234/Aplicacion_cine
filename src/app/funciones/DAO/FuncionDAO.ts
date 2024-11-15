import { Response } from "express";
import { SQL_FUNCIONES } from "../repository/sql_funciones";
import pool from "../../../config/connection/dbConnection"
import Funcion from "../entity/Funcion";

class FuncionDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool
            .result(SQL_FUNCIONES.GET_ALL, params)
            .then((resultado) => {
                res.status(200).json(resultado.rows);
            }).catch((miError) => {
                res.status(400).json({
                    "respuesta": miError
                });
            });
    }

    protected static async grabeloYa(datos: Funcion, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_FUNCIONES.HOW_MANY_SPECIFIC, [datos.idSala, datos.idHorario]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = await consulta.one(SQL_FUNCIONES.ADD, [datos.idSala, datos.idHorario]);
                }
                return { queHacer, respuBase };
            }).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe la función" });
                        break;
                    case 2:
                        res.status(200).json(respuBase);
                        break;
                }
            }).catch(err => {
                res.status(400).json({ respuesta: err });
            });
    }


    protected static async borreloYa(datos: Funcion, res: Response): Promise<any>{
        pool
        .task((consulta)=>{
            return consulta.result(SQL_FUNCIONES.DELETE, [datos.idFuncion]);
        })
        .then((respuesta)=>{
            res.status(200).json({
                respuesta: "Lo borre sin miedo",
                info: respuesta.rowCount,
            });
        })
        .catch((miErrorcito)=>{
            res.status(400).json({respuesta: miErrorcito});
        });
    }

    protected static async vistaPaginada(params: any, res: Response){
        await pool.task(async (consulta) => {
            const page = parseInt(params.query.page as string) || 1; // Valor por defecto a 1
            const limit = parseInt(params.query.limit as string) || 10; // Valor por defecto a 10
            if(page > limit && page <= 0)
                return res.status(400).json({respuesta: "Pagina invalida"});
            const desde = (page - 1) * limit;
            const salas = await consulta.manyOrNone(SQL_FUNCIONES.GET_PAGE, [Number(limit), Number(desde)]);
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

    protected static async cambiarHorarioDeLasSalas(datos: Funcion, res: Response): Promise<any> {
        await pool
        .task( async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_FUNCIONES.HOW_MANY, [datos.idSala]);
            console.log(cubi);
            if(cubi.existe != 0){
                queHacer = 2;
                respuBase = await consulta.none(SQL_FUNCIONES.MASSIVE_UPDATE, [datos.idHorario, datos.idSala ]);
            }
            return { queHacer, respuBase };
        }).then(({ queHacer, respuBase}) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita no existe la función" });
                    break;
                case 2:
                    res.status(200).json({acualizado: "Ok"});
                    break;
            }
        }).catch(err => {
            res.status(400).json({ respuesta: err });
        } )
    }

    protected static async actualizaloYa(datos: Funcion, res: Response): Promise<any> {
        await pool
        .task(async (consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_FUNCIONES.HOW_MANY, [datos.idFuncion]);
            if (cubi.existe == 1) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_FUNCIONES.UPDATE, [datos.idSala, datos.idHorario, datos.idFuncion]);
            }
            return { queHacer, respuBase };
        }).then(({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita no existe el género" });
                    break;
                case 2:
                    res.status(200).json({respuesta: "se actualizo"});
                    break;
            }
        }).catch(err => {
            res.status(400).json({ respuesta: err });
        });
    }
}

export default FuncionDAO;