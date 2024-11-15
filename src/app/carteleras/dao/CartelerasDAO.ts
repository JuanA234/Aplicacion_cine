import { Response } from "express";
import {SQL_CARTELERAS } from "../repository/sql_carteleras";
import pool from "../../../config/connection/dbConnection";
import Carteleras from "../entity/Carteleras";

class CartelerasDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_CARTELERAS.GET_ALL).then((resultado)=>{
            res.status(200).json(resultado.rows);
        }).catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "Respuesta": "No funciona"
            });
        });
    };

    protected static async grabeloYa(datos: Carteleras, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_CARTELERAS.HOW_MANY, [datos.idCartelera]);
            if (cubi.existe == 0) {
                queHacer = 2;
<<<<<<< HEAD
<<<<<<< HEAD
                respuBase = await consulta.one(SQL_CARTELERAS.ADD, [datos.idCartelera, datos.idCine]);
=======
                respuBase = await consulta.one(SQL_CARTELERAS.ADD, [datos.idCine]);
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
                respuBase = await consulta.one(SQL_CARTELERAS.ADD, [datos.idCine]);
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
            }
            return { queHacer, respuBase };
        }).then( ({ queHacer, respuBase }) => {
            switch (queHacer) {
                case 1:
<<<<<<< HEAD
<<<<<<< HEAD
                    res.status(400).json({ respuesta: "El cargo ya existe" });
=======
                    res.status(400).json({ respuesta: "La cartelera ya existe" });
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
                    res.status(400).json({ respuesta: "La cartelera ya existe" });
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
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
<<<<<<< HEAD
<<<<<<< HEAD
     
    protected static async borreloYa(datos: Carteleras, res: Response): Promise<any> {
=======
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586

    protected static async vistaPaginada(params: any, res: Response){
        await pool.task(async (consulta) => {
            const page = parseInt(params.query.page as string) || 1; // Valor por defecto a 1
            const limit = parseInt(params.query.limit as string) || 10; // Valor por defecto a 10

            if(page > limit && page <= 0)
                return res.status(400).json({respuesta: "Pagina invalida"});
            const desde = (page - 1) * limit;  
            const salas = await consulta.manyOrNone(SQL_CARTELERAS.GET_PAGE, [Number(limit), Number(desde)]);
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
     
    protected static async borreloYa(datos: Carteleras, res: Response): Promise<any> {
        console.log("hola");
<<<<<<< HEAD
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        pool.task((consulta) => {
            return consulta.result(SQL_CARTELERAS.DELETE, [datos.idCartelera]);
        }).then((respuesta) => {
            res.status (200).json({
                respuesta: "Lo borré sin miedo",
                info: respuesta.rowCount,
            });
        }).catch( (miErrorcito) => {
<<<<<<< HEAD
<<<<<<< HEAD
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
        });
    };

=======
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
            res.status(400).json({ respuesta: miErrorcito.detail});
        });
    };



<<<<<<< HEAD
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
    protected static async actualiceloYa(datos: Carteleras, res: Response): Promise<any> {
        try {
            const result = await pool.task(async (consulta) => {
                const cubi = await consulta.one(SQL_CARTELERAS.HOW_MANY, [datos.idCartelera]);
<<<<<<< HEAD
<<<<<<< HEAD
                if (cubi.existe == 0) {
=======
                if (cubi.existe != 0) {
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
                if (cubi.existe != 0) {
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
                    // Si no existe, actualizamos
                    await consulta.none(SQL_CARTELERAS.UPDATE, [datos.idCartelera, datos.idCine]);
                    return { queHacer: 2 };
                }
                return { queHacer: 1 }; // Ya existe
            });
    
            switch (result.queHacer) {
                case 1:
                    res.status(400).json({ respuesta: "Compita ya existe" });
                    break;
                case 2:
                    res.status(200).json({ actualizado: "ok" });
                    break;
            }
        } catch (miErrorcito) {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Pailas, sql totiado" });
        }
    }
}

export default CartelerasDAO;
