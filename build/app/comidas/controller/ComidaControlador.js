"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comidas_1 = __importDefault(require("../entity/Comidas"));
const ComidaDAO_1 = __importDefault(require("../DAO/ComidaDAO"));
class ComidaControlador extends ComidaDAO_1.default {
    dameComidas(req, res) {
        let { tamPag, page } = req.query;
        ComidaDAO_1.default.obtenerTodo(tamPag, page, res);
    }
    cogeTuComida(req, res) {
        const objCubi = new Comidas_1.default(0, "", 0);
        objCubi.idTipoComida = req.body.idTipoComida;
        objCubi.nombreComida = req.body.nombreComida;
        ComidaDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuComida(req, res) {
        if (isNaN(Number(req.params.idComida))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            const codiguito = Number(req.params.idComida);
            const objCubi = new Comidas_1.default(codiguito, "", 0);
            ComidaDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuComida(req, res) {
        const objCubi = new Comidas_1.default(0, "", 0);
        objCubi.idComida = Number(req.body.idComida);
        objCubi.idTipoComida = Number(req.body.idTipoComida);
        objCubi.nombreComida = String(req.body.nombreComida);
        ComidaDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const comidaControlador = new ComidaControlador();
exports.default = comidaControlador;
