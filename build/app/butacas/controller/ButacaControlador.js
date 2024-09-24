"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ButacaDAO_1 = __importDefault(require("../DAO/ButacaDAO"));
const Butacas_1 = __importDefault(require("../entity/Butacas"));
class ButacaControlador extends ButacaDAO_1.default {
    dameButacas(req, res) {
        ButacaDAO_1.default.obtenerTodo([], res);
    }
    cogeTuButaca(req, res) {
        const objCubi = new Butacas_1.default(0, "", 0, 0);
        objCubi.columna = req.body.columna;
        objCubi.fila = req.body.fila;
        objCubi.idSala = req.body.idSala;
        ButacaDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuButaca(req, res) {
        if (isNaN(Number(req.params.idButaca))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            const codiguito = Number(req.params.idButaca);
            const objCubi = new Butacas_1.default(codiguito, "", 0, 0);
            ButacaDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuButaca(req, res) {
        const objCubi = new Butacas_1.default(0, "", 0, 0);
        objCubi.idButaca = Number(req.body.idButaca);
        objCubi.columna = Number(req.body.columna);
        objCubi.fila = String(req.body.fila);
        objCubi.idSala = Number(req.body.idSala);
        ButacaDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const butacaControlador = new ButacaControlador();
exports.default = butacaControlador;
