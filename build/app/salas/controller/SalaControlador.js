"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SalaDAO_1 = __importDefault(require("../dao/SalaDAO"));
const Sala_1 = __importDefault(require("../entity/Sala"));
class SalaControlador extends SalaDAO_1.default {
    dameSalas(req, res) {
        SalaDAO_1.default.obtenerTodo([], res);
    }
    cogeTuSala(req, res) {
        const objCubi = new Sala_1.default(0, 0, 0);
        objCubi.idSala = req.body.idSala;
        objCubi.salaCapacidad = req.body.salaCapacidad;
        objCubi.idCine = req.body.idCine;
        SalaDAO_1.default.grabeloYa(objCubi, res);
    }
}
const salaControlador = new SalaControlador();
exports.default = salaControlador;
