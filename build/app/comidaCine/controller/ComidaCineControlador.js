"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComidaCineDAO_1 = __importDefault(require("../dao/ComidaCineDAO"));
const ComidaCine_1 = __importDefault(require("../entity/ComidaCine"));
class ComidaCineControlador extends ComidaCineDAO_1.default {
    dameComidasCines(req, res) {
        let { tamPag, page } = req.query;
        ComidaCineDAO_1.default.obtenerTodo(tamPag, page, res);
    }
    cogeTuComidaCine(req, res) {
        const objCubi = new ComidaCine_1.default(0, 0, 0, 0, 0);
        objCubi.precio = req.body.precio;
        objCubi.cantidadDisponible = req.body.cantidadDisponible;
        objCubi.idComida = req.body.idComida;
        objCubi.idCine = req.body.idCine;
        ComidaCineDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuComidaCine(req, res) {
        if (isNaN(Number(req.params.idMenu))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            const codiguito = Number(req.params.idMenu);
            const objCubi = new ComidaCine_1.default(codiguito, 0, 0, 0, 0);
            ComidaCineDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuComidaCine(req, res) {
        const objCubi = new ComidaCine_1.default(0, 0, 0, 0, 0);
        objCubi.idMenu = Number(req.body.idMenu);
        objCubi.precio = Number(req.body.precio);
        objCubi.cantidadDisponible = Number(req.body.cantidadDisponible);
        objCubi.idComida = Number(req.body.idComida);
        objCubi.idCine = Number(req.body.idCine);
        ComidaCineDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const comidaCineControlador = new ComidaCineControlador();
exports.default = comidaCineControlador;
