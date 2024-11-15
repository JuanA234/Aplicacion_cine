import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_USUARIOS } from "../Repository/sql_usuarios";
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
            const cubi = await consulta.one(SQL_USUARIOS.HOW_MANY, [datos.id_usuario]);
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
     
    protected static async borreloYa(datos: Usuarios, res: Response): Promise<any> {
        pool.task((consulta) => {
            return consulta.result(SQL_USUARIOS.DELETE, [datos.id_usuario]);
        }).then((respuesta) => {
            res.status (200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch( (miErrorcito) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
        });
    };

    protected static async actualiceloYa(datos: Usuarios, res: Response): Promise<any>{
        pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_USUARIOS.HOW_MANY, [datos.id_usuario]);
            if (cubi.existe != 0) {
                queHacer = 2;
                respuBase = await consulta.none(SQL_USUARIOS.UPDATE, [datos.correo, datos.contrasena, datos.id_usuario]);
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