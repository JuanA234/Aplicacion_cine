import { Response } from "express";
import { SQL_COMIDA_CINE } from "../repository/sql_comidaCine";
import pool from "../../../config/connection/dbConnection";
import ComidaCine from "../entity/ComidaCine";

class ComidaCineDAO {
    protected static async obtenerTodo(tamPag: any, page: any, res: Response){
        await pool
        .task(async(consulta)=>{
            const cubi = await consulta.many(SQL_COMIDA_CINE.TOTAL);
            const rows = cubi[0].count;
            const offset = (page-1)*tamPag;
            const resultado = await consulta.result(SQL_COMIDA_CINE.GET_ALL, [tamPag, offset]);
            return{resultado, rows};
        })
        .then(({resultado, rows}) =>{
            res.status(200).json({
                menus : resultado.rows,
                totalMenus : rows
            });
            res.status(200).json({
                totalMenus : rows,
                menus : resultado.rows
            });
        }).catch((miError:any) => {
            res.status(400).json({
                "respuesta" : "ay no sirve",
                mensaje : miError.message,
                Error : miError,
                NombreError: miError.name
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
          
          if (cubi.existe != 0) {
            queHacer = 2;
            respuBase = await consulta.none(SQL_COMIDA_CINE.UPDATE_MASIVO, [datos.precio, datos.idComida]);
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
      
}

export default ComidaCineDAO;