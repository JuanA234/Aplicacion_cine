"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UbicacionDAO_1 = __importDefault(require("../dao/UbicacionDAO"));
const Ubicacion_1 = __importDefault(require("../entity/Ubicacion"));
class UbicacionControlador extends UbicacionDAO_1.default {
    dameUbicacion(req, res) {
        UbicacionDAO_1.default.obtenerTodo([], res);
    }
    cogeTuUbicacion(req, res) {
        const objCubi = new Ubicacion_1.default(0, "", 0);
        objCubi.idUbicacion = req.body.idHorario;
        objCubi.nombreUbicacion = req.body.nombreUbicacion;
        objCubi.idPadre = req.body.idPadre;
        UbicacionDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuUbicacion(req, res) {
        if (isNaN(Number(req.params.idHorario))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            const codiguito = Number(req.params.idHorario);
            const objcubi = new Ubicacion_1.default(codiguito, "", 0);
            UbicacionDAO_1.default.borreloYa(objcubi, res);
        }
    }
    actualizaTuUbicacion(req, res) {
        const objCubi = new Ubicacion_1.default(0, "", 0);
        objCubi.idUbicacion = Number(req.body.idUbicacion);
        objCubi.nombreUbicacion = String(req.body.nombreUbicacion);
        objCubi.idPadre = Number(req.body.idPadre);
        UbicacionDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const ubicacionControlador = new UbicacionControlador();
exports.default = ubicacionControlador;
