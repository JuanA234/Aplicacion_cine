"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CineDAO_1 = __importDefault(require("../DAO/CineDAO"));
const Cine_1 = __importDefault(require("../entity/Cine"));
class ControladorCine extends CineDAO_1.default {
    dameCine(req, res) {
        CineDAO_1.default.obtenerTodo([], res);
    }
    cogeTuCine(req, res) {
        const objCubi = new Cine_1.default(0, "", 0);
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.nombreCine = req.body.nombreCine;
        CineDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuCine(req, res) {
        if (isNaN(Number(req.params.idCine))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            const codiguito = Number(req.params.idCine);
            const objCubi = new Cine_1.default(codiguito, "", 0);
            CineDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuCine(req, res) {
        const objCubi = new Cine_1.default(0, "", 0);
        objCubi.idCine = Number(req.body.idCine);
        objCubi.idUbicacion = Number(req.body.idUbicacion);
        objCubi.nombreCine = String(req.body.nombreCine);
        CineDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const cineControlador = new ControladorCine();
exports.default = cineControlador;
