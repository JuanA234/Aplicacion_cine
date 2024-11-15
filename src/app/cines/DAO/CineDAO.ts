import { Response } from "express";
import { SQL_CINES } from "../repository/sql_cine";
import pool from "../../../config/connection/dbConnection";
import Cine from "../entity/Cine";

class CineDAO {
  protected static async obtenerTodo(tamPag: any, page: any, res: Response) {
    await pool
      .task(async (consulta) => {
        const offset = (page - 1) * tamPag;
        const resultado = await consulta.result(SQL_CINES.GET_ALL, [
          tamPag,
          offset,
        ]);
        const cubi = await consulta.manyOrNone(SQL_CINES.TOTAL);
        const totalCines = cubi[0].count;
        return { resultado, totalCines };
      })
      .then(({ resultado, totalCines }) => {
        res.status(200).json({
          cines: resultado.rows,
          totalCines: totalCines,
        });
      })
      .catch((miError) => {
        console.log("mi error");
        res.status(400).json({
          respuesta: "ay no sirve",
        });
      });
  }

  protected static async grabeloYa(datos: Cine, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        let creado: boolean = false;
        const cubi = await consulta.one(SQL_CINES.HOW_MANY, [
          datos.idCine,
          datos.nombreCine,
        ]);
        if (cubi.existe == 0) {
          queHacer = 2;
          respuBase = await consulta.one(SQL_CINES.ADD, [
            datos.nombreCine,
            datos.idUbicacion,
          ]);
          creado = true;
        }
        return { queHacer, respuBase, creado };
      })
      .then(({ queHacer, respuBase, creado }) => {
        switch (queHacer) {
          case 1:
            res.status(200).json({
              respuesta: "Compita ya existe el cine",
              creado: creado,
            });
            break;
          default:
            res
              .status(200)
              .json({
                respuBase,
                respuesta: "Creado con exito",
                creado: creado,
              });
            break;
        }
      })
      .catch((miError: any) => {
        res
          .status(400)
          .json({ respuesta: "Se totio mano", mensaje: miError.message });
      });
  }

  protected static async borreloYa(datos: Cine, res: Response): Promise<any> {
    pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuesta: any;
        let borradoSinMiedo: boolean = false;
        const existe = await consulta.one(SQL_CINES.EXISTE_OTRA_TABLA, [
          datos.idCine,
        ]);
        if (existe.existe == 0) {
          queHacer = 2;
          respuesta = consulta.result(SQL_CINES.DELETE, [datos.idCine]);
          borradoSinMiedo = true;
        }
        return { queHacer, respuesta, borradoSinMiedo };
      })
      .then(({ queHacer, respuesta, borradoSinMiedo }) => {
        switch (queHacer) {
          case 1:
            res.status(200).json({
                respuesta: "Compita no puedes borrarlo, existe en otra tabla",
                borradoSinMiedo: borradoSinMiedo,
            });
            break;

            default:
                res.status(200).json({
                    respuesta: "Lo borre sin miedo",
                    info: respuesta.rowCount,
                    borradoSinMiedo: borradoSinMiedo,
                });
                break;
        
        }
      })
      .catch((miErrorcito: any) => {
        res
          .status(400)
          .json({
            respuesta: "Pailas, sql totiado",
            mensaje: miErrorcito.message,
            error: miErrorcito,
          });
      });
  }

  protected static async actualiceVarios(
    datos: Cine,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        const cubi = await consulta.one(SQL_CINES.HOW_MANY, [
          datos.idCine,
          datos.nombreCine,
        ]);

        if (cubi.existe != 0) {
          queHacer = 2;
          const like = datos.nombreCine + "%";
          respuBase = await consulta.none(SQL_CINES.UPDATE_MASIVO, [
            datos.idUbicacion,
            like,
          ]);
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
        res
          .status(400)
          .json({
            respuesta: "Pailas, sql totiado",
            mensaje: miError.message,
            error: miError,
          });
      });
  }

  protected static async actualiceUno(
    datos: Cine,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        const cubi = await consulta.one(SQL_CINES.HOW_MANY, [
          datos.idCine,
          datos.nombreCine,
        ]);
        let actualizado: boolean = false;
        if (cubi.existe != 0) {
          queHacer = 2;
          respuBase = await consulta.none(SQL_CINES.UPDATE, [
            datos.nombreCine,
            datos.idUbicacion,
            datos.idCine,
          ]);
          actualizado = true;
        }
        return { queHacer, respuBase, actualizado };
      })
      .then(({ queHacer, respuBase, actualizado }) => {
        switch (queHacer) {
          case 1:
            res
              .status(200)
              .json({
                respuesta: "Compita no existe",
                actualizado: actualizado,
              });
            break;
          default:
            res
              .status(200)
              .json({
                respuesta: "Actualizado con éxito",
                actualizado: actualizado,
              });
            break;
        }
      })
      .catch((miError: any) => {
        res
          .status(400)
          .json({
            respuesta: "Pailas, sql totiado",
            mensaje: miError.message,
            error: miError,
          });
      });
  }
}

export default CineDAO;
