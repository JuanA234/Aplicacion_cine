import { Response } from "express";
import { SQL_GENEROS } from "../repository/sql_generos";
import pool from "../../../config/connection/dbConnection"
import Genero from "../entity/Genero";

class GeneroDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool
            .result(SQL_GENEROS.GET_ALL, params)
            .then((resultado) => {
                res.status(200).json(resultado.rows);
            }).catch((miError) => {
                res.status(400).json({
                    miError
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
            const salas = await consulta.manyOrNone(SQL_GENEROS.GET_PAGE, [Number(limit), Number(desde)]);
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

    protected static async grabeloYa(datos: Genero, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_GENEROS.HOW_MANY, [datos.idGenero, datos.nombreGenero]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = await consulta.one(SQL_GENEROS.ADD, [datos.nombreGenero]);
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
                res.status(400).json({ respuesta: err });
            });
    }

    protected static async borreloYa(datos: Genero, res: Response): Promise<any>{
        pool
        .task((consulta)=>{
            return consulta.result(SQL_GENEROS.DELETE, [datos.idGenero]);
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

    protected static async actualizaloYa(datos: Genero, res: Response): Promise<any> {
        await pool
        .task(async (consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_GENEROS.HOW_MANY, [datos.idGenero]);
            if (cubi.existe == 1) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_GENEROS.UPDATE, [datos.nombreGenero, datos.idGenero]);
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

export default GeneroDAO;