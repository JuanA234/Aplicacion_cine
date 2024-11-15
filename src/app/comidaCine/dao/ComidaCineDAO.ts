import { Response } from "express";
import { SQL_COMIDA_CINE } from "../repository/sql_comidaCine";
import pool from "../../../config/connection/dbConnection";
import ComidaCine from "../entity/ComidaCine";

class ComidaCineDAO {
    protected static async obtenerTodo(params:any, res: Response){
      await pool
      .result(SQL_COMIDA_CINE.GET_ALL, params)
      .then((resultado)=>{
          res.status(200).json(resultado.rows);
      }).catch((miError) => {
          console.log("mi error");
          res.status(400).json({
              "respuesta": "ay no sirve"
          });
      });
    }

    protected static async grabeloYa(datos: ComidaCine, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
          let queHacer = 1;
          let respuBase: any;
          const cubi = await consulta.one(SQL_COMIDA_CINE.EXISTE, [datos.idMenu]);
    
          if (cubi.existe == 0) {
            queHacer = 2;
            const validacion = await consulta.one(SQL_COMIDA_CINE.GET_NAME_REPEATED, [datos.idComida, datos.idCine]);
            
            if (validacion.repetidos == 0) {
              queHacer = 3;
              respuBase = await consulta.one(SQL_COMIDA_CINE.ADD, [datos.precio, datos.cantidadDisponible, datos.idComida, datos.idCine]);
            }
          }
    
          return { queHacer, respuBase };
        })
        .then(({ queHacer, respuBase }) => {
          switch (queHacer) {
            case 1:
              res.status(400).json({ respuesta: "Compita ya existe la sala" });
              break;
            case 2:
              res.status(400).json({ respuesta: "La comida ya está registrada en el cine" });
              break;
            default:
              res.status(200).json(respuBase);
              break;
          }
        })
        .catch((miError: any) => {
          console.log(miError);
          res.status(400).json({ respuesta: "Se totió mano" });
        });
      }

      protected static async borreloYa(datos: ComidaCine, res: Response): Promise<any>{
        pool
        .task((consulta)=>{
            return consulta. result(SQL_COMIDA_CINE.DELETE, [datos.idMenu]);
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

    protected static async actualiceloYa(datos: ComidaCine, res: Response): Promise<any> {
        pool.task(async (consulta) => {
          let queHacer = 1;
          let respuBase: any;
          const cubi = await consulta.one(SQL_COMIDA_CINE.EXISTE, [datos.idComida]);
          
          if (cubi.existe == 0) {
            queHacer = 2;
            respuBase = await consulta.none(SQL_COMIDA_CINE.UPDATE, [datos.precio, datos.cantidadDisponible, datos.idComida, datos.idCine, datos.idMenu]);
          }
      
          return { queHacer, respuBase };
        })
        .then(({ queHacer, respuBase }) => {
          switch (queHacer) {
            case 1:
              res.status(400).json({ respuesta: "Compita ya existe" });
              break;
            default:
              res.status(200).json({actualizado : "ok" })
              break;
          }
        })
        .catch((miErrorcito) => {
          console.log(miErrorcito);
          res.status(400).json({ respuesta: "Pailas, sql totiado" });
        });
      }

      protected static async massiveUpdate(datos: ComidaCine, res: Response): Promise<any> {
        pool.task(async (consulta) => {
         
            let respuBase = await consulta.none(SQL_COMIDA_CINE.UPDATE_CINES, [datos.idCine]);
          
      
          return { respuBase };
        })
        .then(({ respuBase }) => {
          res.status(200).json({actualizado : "ok" })
        })
        .catch((miErrorcito) => {
          console.log(miErrorcito);
          res.status(400).json({ respuesta: "Pailas, sql totiado" });
        });
      }

      protected static async deleteMasivo(datos: ComidaCine, res: Response): Promise<any>{
        pool
        .task((consulta)=>{
            return consulta. result(SQL_COMIDA_CINE.DELETE_MASIVO, []);
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
      
}

export default ComidaCineDAO;