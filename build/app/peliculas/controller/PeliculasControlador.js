"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PeliculasDAO_1 = __importDefault(require("../dao/PeliculasDAO"));
const Peliculas_1 = __importDefault(require("../entity/Peliculas"));
class PeliculasControlador extends PeliculasDAO_1.default {
    damePeliculas(req, res) {
        PeliculasDAO_1.default.obtenerTodo([], res);
    }
    cogeTuPelicula(req, res) {
        console.log(req.body);
        const objCubi = new Peliculas_1.default(0, "", "", 0);
        objCubi.id_pelicula = req.body.id_pelicula;
        objCubi.nombre_pelicula = req.body.nombre_pelicula;
        objCubi.duracion_pelicula = req.body.duracion_pelicula;
        objCubi.id_genero = req.body.id_genero;
        PeliculasDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuPelicula(req, res) {
        if (isNaN(Number(req.params.id_pelicula))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            const codiguito = Number(req.params.id_pelicula);
            const objcubi = new Peliculas_1.default(codiguito, "", "", 0);
            PeliculasDAO_1.default.borreloYa(objcubi, res);
        }
    }
    actualizaTuPelicula(req, res) {
        const objCubi = new Peliculas_1.default(0, "", "", 0);
        objCubi.id_pelicula = Number(req.body.id_pelicula);
        objCubi.nombre_pelicula = String(req.body.nombre_pelicula);
        objCubi.duracion_pelicula = String(req.body.duracion_pelicula);
        objCubi.id_genero = Number(req.body.id_genero);
        PeliculasDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const peliculasControlador = new PeliculasControlador();
exports.default = peliculasControlador;
