"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SalaDAO_1 = __importDefault(require("../DAO/SalaDAO"));
const Sala_1 = __importDefault(require("../entity/Sala"));
class SalaControlador extends SalaDAO_1.default {
    dameSalas(req, res) {
        SalaDAO_1.default.obtenerTodo([], res);
    }
    cogeTusala(req, res) {
        const objCubi = new Sala_1.default(0, 0, 0);
        objCubi.salaCapacidad = req.body.salaCapacidad;
        objCubi.idCine = req.body.idCine;
        SalaDAO_1.default.grabeloYa(objCubi, res);
    }
    salasPaginadas(req, res) {
        SalaDAO_1.default.vistaPaginada(req, res);
    }
    borraTuSala(req, res) {
        if (isNaN(Number(req.params.idSala))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            const codiguito = Number(req.params.idSala);
            const objCubi = new Sala_1.default(codiguito, 0, 0);
            SalaDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuTAbla(req, res) {
        const objCubi = new Sala_1.default(0, 0, 0);
        objCubi.idSala = Number(req.body.idSala);
        objCubi.salaCapacidad = Number(req.body.salaCapacidad);
        objCubi.idCine = Number(req.body.idCine);
        SalaDAO_1.default.actualiceloYa(objCubi, res);
    }
    actualizarCapacidadDeSalas(req, res) {
        /*
            Este metodo actualiza la capacidad de todas las salas de un cine
        */
        const objCubi = new Sala_1.default(0, 0, 0);
        objCubi.salaCapacidad = Number(req.body.salaCapacidad);
        objCubi.idCine = Number(req.body.idCine);
        SalaDAO_1.default.actualizarCapacidadDeSalas(objCubi, res);
    }
}
const salaControlador = new SalaControlador();
exports.default = salaControlador;
