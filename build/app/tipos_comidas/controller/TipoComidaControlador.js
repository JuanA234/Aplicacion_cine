"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TipoComidaDAO_1 = __importDefault(require("../DAO/TipoComidaDAO"));
const TipoComida_1 = __importDefault(require("../entity/TipoComida"));
class TipoComidaControlador extends TipoComidaDAO_1.default {
    dameTipoComidas(req, res) {
        TipoComidaDAO_1.default.obtenerTodo([], res);
    }
    cogeTuTipoComida(req, res) {
        const objCubi = new TipoComida_1.default(0, "", "");
        objCubi.descripcion = req.body.descripcion;
        objCubi.nombreTipoComida = req.body.nombreTipoComida;
        TipoComidaDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuTipoComida(req, res) {
        if (isNaN(Number(req.params.idTipoComida))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            const codiguito = Number(req.params.idTipoComida);
            const objCubi = new TipoComida_1.default(codiguito, "", "");
            TipoComidaDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuTipoComida(req, res) {
        const objCubi = new TipoComida_1.default(0, "", "");
        objCubi.idTipoComida = Number(req.body.idTipoComida);
        objCubi.descripcion = String(req.body.descripcion);
        objCubi.nombreTipoComida = String(req.body.nombreTipoComida);
        TipoComidaDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const tipoComidaControlador = new TipoComidaControlador();
exports.default = tipoComidaControlador;
