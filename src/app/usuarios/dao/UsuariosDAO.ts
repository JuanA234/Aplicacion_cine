import { Response } from "express";
import {SQL_USUARIOS } from "../repository/sql_usuarios";
import pool from "../../../config/connection/dbConnection";
import Usuarios from "../entity/Usuarios";

class UsuariosDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_USUARIOS.GET_ALL).then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "No funciona"
            });
        });
    };

    protected static async grabeloYa(datos: Usuarios, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_USUARIOS.HOW_MANY, [datos.idUsuario,datos.correo]);
            if (cubi.existe == 0) {
                queHacer = 2;
                respuBase = await consulta.one(SQL_USUARIOS.ADD, [datos.correo, datos.contrasena]);
            }
            return { queHacer, respuBase };
        }).then( ({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "El usuario ya existe" });
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

    protected static async vistaPaginada(params: any, res: Response){
        await pool.task(async (consulta) => {
            const page = parseInt(params.query.page as string) || 1; // Valor por defecto a 1
            const limit = parseInt(params.query.limit as string) || 10; // Valor por defecto a 10

            if(page > limit && page <= 0)
                return res.status(400).json({respuesta: "Pagina invalida"});
            const desde = (page - 1) * limit;  
            const salas = await consulta.manyOrNone(SQL_USUARIOS.GET_PAGE, [Number(limit), Number(desde)]);
            return salas
        }).then((salas) => {
            res.status(200).json(salas);
        })
        .catch(err => {
            console.log("mi error");
            res.status(400).json({
                "respuesta": "Se estalló"
                });
            }
        );
    }
     
    protected static async borreloYa(datos: Usuarios, res: Response): Promise<any> {
        console.log("hola");
        pool.task((consulta) => {
            return consulta.result(SQL_USUARIOS.DELETE, [datos.idUsuario]);
        }).then((respuesta) => {
            res.status (200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch( (miErrorcito) => {
            res.status(400).json({ respuesta: miErrorcito.detail});
        });
    };

    protected static async actualiceloYa(datos: Usuarios, res: Response): Promise<any>{
        pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_USUARIOS.HOW_MANY, [datos.idUsuario]);
            if (cubi.existe != 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_USUARIOS.UPDATE, [datos.correo, datos.contrasena, datos.idUsuario]);
            }
            return { queHacer, respuBase };
            }).then( ({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe" });
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

export default UsuariosDAO;
