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
        objCubi.idPelicula = req.body.idPelicula;
        objCubi.nombrePelicula = req.body.nombrePelicula;
        objCubi.duracionPelicula = req.body.duracionPelicula;
        objCubi.idGenero = req.body.idGenero;
        PeliculasDAO_1.default.grabeloYa(objCubi, res);
    }
    peliculasPaginadas(req, res) {
        PeliculasDAO_1.default.vistaPaginada(req, res);
    }
    borraTuPelicula(req, res) {
        if (isNaN(Number(req.params.idPelicula))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            const codiguito = Number(req.params.idPelicula);
            const objcubi = new Peliculas_1.default(codiguito, "", "", 0);
            PeliculasDAO_1.default.borreloYa(objcubi, res);
        }
    }
    actualizaTuPelicula(req, res) {
        const objCubi = new Peliculas_1.default(0, "", "", 0);
        objCubi.idPelicula = Number(req.body.idPelicula);
        objCubi.nombrePelicula = String(req.body.nombrePelicula);
        objCubi.duracionPelicula = String(req.body.duracionPelicula);
        objCubi.idGenero = Number(req.body.idGenero);
        PeliculasDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const peliculasControlador = new PeliculasControlador();
exports.default = peliculasControlador;
