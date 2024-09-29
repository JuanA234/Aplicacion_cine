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
                console.log("mi error");
                res.status(400).json({
                    "respuesta": "ay no sirve"
                });
            });
    }

    protected static async grabeloYa(datos: Funcion, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_FUNCIONES.HOW_MANY, [datos.idFuncion]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = await consulta.one(SQL_FUNCIONES.ADD, [datos.idSala, datos.idHorario]);
                }
                return { queHacer, respuBase };
            }).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe el género" });
                        break;
                    case 2:
                        res.status(200).json(respuBase);
                        break;
                }
            }).catch(err => {
                console.log(err);
                res.status(400).json({ respuesta: "Se totio mano" });
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
            console.log(miErrorcito);
            res.status(400).json({respuesta: "Pailas, sql totiado"});
        });
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
            console.log(err);
            res.status(400).json({ respuesta: "Se totio mano" });
        });
    }
}

export default FuncionDAO;