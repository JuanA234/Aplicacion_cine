import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import TipoComida from "../Entity/TipoComidas";
import { SQL_TIPOS_COMIDAS } from "../Repository/sql_tipo_comida";

class TipoComidaDAO {
  protected static async obtenerTodo(tamPag: any, page: any, res: Response) {
    await pool
      .task(async (consulta) => {
        const offset = (page - 1) * tamPag;
        const resultado = await consulta.result(SQL_TIPOS_COMIDAS.GET_ALL, [
          tamPag,
          offset,
        ]);

        const cubi = await consulta.manyOrNone(SQL_TIPOS_COMIDAS.TOTAL);
        const totalTiposComidas = cubi[0].count;

        return { resultado, totalTiposComidas };
      })
      .then(({ resultado, totalTiposComidas }) => {
        res.status(200).json({
          resultado: resultado.rows,
          totalComidas: totalTiposComidas,
        });
      })
      .catch((miError) => {
        console.log("mi error");
        res.status(400).json({
          respuesta: "ay no sirve",
        });
      });
  }

  protected static async grabeloYa(
    datos: TipoComida,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        let creado: boolean = false;
        const cubi = await consulta.one(SQL_TIPOS_COMIDAS.HOW_MANY, [
          datos.idTipoComida,
          datos.nombreTipoComida,
        ]);
        if (cubi.existe == 0) {
          queHacer = 2;
          respuBase = await consulta.one(SQL_TIPOS_COMIDAS.ADD, [
            datos.nombreTipoComida,
            datos.descripcion,
          ]);
          creado = true;
        }
        return { queHacer, respuBase, creado };
      })
      .then(({ queHacer, respuBase, creado }) => {
        switch (queHacer) {
          case 1:
            res.status(200).json({
              respuesta: "Compita ya existe el TipoComida",
              creado: creado,
            });
            break;
          default:
            res.status(200).json({
              respuBase,
              creado: creado,
              respuesta: "Creado con exito",
            });
            break;
        }
      })
      .catch((miError: any) => {
        res
          .status(400)
          .json({
            respuesta: "Se totio mano",
            mensaje: miError.message,
            error: miError,
          });
      });
  }

  protected static async borreloYa(
    datos: TipoComida,
    res: Response
  ): Promise<any> {
    pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuesta: any;
        let borradoSinMiedo: boolean = false;
        const existe = await consulta.one(SQL_TIPOS_COMIDAS.EXISTE_OTRA_TABLA, [
          datos.idTipoComida,
        ]);
        if (existe.existe == 0) {
          queHacer = 2;
          respuesta = consulta.result(SQL_TIPOS_COMIDAS.DELETE, [
            datos.idTipoComida,
          ]);
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
              borradoSinMiedo: borradoSinMiedo,
            });
            break;
        }
      })
      .catch((miErrorcito) => {
        res.status(400).json({ respuesta: "Pailas, sql totiado" });
      });
  }

  protected static async actualiceVarios(
    datos: TipoComida,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        const cubi = await consulta.one(SQL_TIPOS_COMIDAS.HOW_MANY, [
          datos.idTipoComida,
          datos.nombreTipoComida,
        ]);
        if (cubi.existe != 0) {
          queHacer = 2;
          const like = datos.nombreTipoComida + "%";
          respuBase = await consulta.none(SQL_TIPOS_COMIDAS.UPDATE_MASIVO, [
            datos.descripcion,
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
    datos: TipoComida,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        let actualizado: boolean = false;
        const cubi = await consulta.one(SQL_TIPOS_COMIDAS.HOW_MANY, [
          datos.idTipoComida,
          datos.nombreTipoComida,
        ]);
        if (cubi.existe != 0) {
          queHacer = 2;
          respuBase = await consulta.none(SQL_TIPOS_COMIDAS.UPDATE, [
            datos.nombreTipoComida,
            datos.descripcion,
            datos.idTipoComida,
          ]);
          actualizado = true;
        }
        return { queHacer, respuBase, actualizado };
      })
      .then(({ queHacer, respuBase, actualizado }) => {
        switch (queHacer) {
          case 1:
            res.status(200).json({
                respuesta: "Compita no existe",
                actualizado: actualizado,
            });
            break;
          default:
            res.status(200).json({
                respuesta: "Actualizado con exito",
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

export default TipoComidaDAO;