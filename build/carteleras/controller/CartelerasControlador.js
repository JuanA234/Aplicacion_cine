"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartelerasDAO_1 = __importDefault(require("../dao/CartelerasDAO"));
const Carteleras_1 = __importDefault(require("../entity/Carteleras"));
class CartelerasControlador extends CartelerasDAO_1.default {
    dameCarteleras(req, res) {
        CartelerasDAO_1.default.obtenerTodo([], res);
    }
    obtenerCartelera(req, res) {
        const objCartelera = new Carteleras_1.default(0, 0);
        objCartelera.idCartelera = Number(req.body.idCartelera);
        objCartelera.idCine = Number(req.body.idCine);
        CartelerasDAO_1.default.grabeloYa(objCartelera, res);
    }
    borrarCartelera(req, res) {
        if (isNaN(Number(req.params.idCartelera))) {
            res.status(400).json({ respuesta: "Y el código de la cartelera?" });
        }
        else {
            const idCartelera = Number(req.params.idCartelera);
            const objCartelera = new Carteleras_1.default(idCartelera, 0);
            CartelerasDAO_1.default.borreloYa(objCartelera, res);
        }
    }
    actualizarCartelera(req, res) {
        const objCartelera = new Carteleras_1.default(0, 0);
        objCartelera.idCartelera = Number(req.body.idCartelera);
        objCartelera.idCine = Number(req.body.idCine);
        CartelerasDAO_1.default.actualiceloYa(objCartelera, res);
    }
}
const cartelerasControlador = new CartelerasControlador();
exports.default = cartelerasControlador;
