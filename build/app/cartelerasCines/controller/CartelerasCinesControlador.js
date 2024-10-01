"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartelerasCinesDAO_1 = __importDefault(require("../dao/CartelerasCinesDAO"));
const CartelerasCines_1 = __importDefault(require("../entity/CartelerasCines"));
class CartelerasCinesControlador extends CartelerasCinesDAO_1.default {
    dameCartelerasCines(req, res) {
        CartelerasCinesDAO_1.default.obtenerTodo([], res);
    }
    cartelerasCinesPaginadas(req, res) {
        CartelerasCinesDAO_1.default.vistaPaginada(req, res);
    }
    obtenerCartelerasCines(req, res) {
        const objCubi = new CartelerasCines_1.default(0, 0, new Date(0), new Date(0), 0);
        objCubi.idCartelera = req.body.idCartelera;
        objCubi.idPelicula = Number(req.body.idPelicula);
        objCubi.fechaDesde = req.body.fechaDesde;
        objCubi.fechaHasta = req.body.fechaHasta;
        objCubi.idCine = req.body.idCine;
        CartelerasCinesDAO_1.default.grabeloYa(objCubi, res);
    }
    borrarCartelerasCines(req, res) {
        const idCartelera = Number(req.params.idCartelera);
        const idPelicula = Number(req.params.idPelicula);
        if (isNaN(idCartelera) || isNaN(idPelicula)) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            const objcubi = new CartelerasCines_1.default(idCartelera, idPelicula, new Date(0), new Date(0), 0);
            CartelerasCinesDAO_1.default.borreloYa(objcubi, res);
        }
    }
    actualizarCartelerasCines(req, res) {
        const objCubi = new CartelerasCines_1.default(0, 0, new Date(0), new Date(0), 0);
        objCubi.idCartelera = req.body.idCartelera;
        objCubi.idPelicula = Number(req.body.idPelicula);
        objCubi.fechaDesde = req.body.fechaDesde;
        objCubi.fechaHasta = req.body.fechaHasta;
        objCubi.idCine = req.body.idCine;
        CartelerasCinesDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const cartelerasCinesControlador = new CartelerasCinesControlador();
exports.default = cartelerasCinesControlador;
