"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HorarioDAO_1 = __importDefault(require("../dao/HorarioDAO"));
const Horario_1 = __importDefault(require("../entity/Horario"));
class HorarioControlador extends HorarioDAO_1.default {
    dameHorarios(req, res) {
        HorarioDAO_1.default.obtenerTodo([], res);
    }
    cogeTuHorario(req, res) {
        const objCubi = new Horario_1.default(0, "", "", 0);
        objCubi.idHorario = req.body.idHorario;
        objCubi.fecha = req.body.fecha;
        objCubi.hora = req.body.hora;
        objCubi.idPelicula = req.body.idPelicula;
        HorarioDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuHorario(req, res) {
        if (isNaN(Number(req.params.idSala))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            const codiguito = Number(req.params.idHorario);
            const objcubi = new Horario_1.default(codiguito, "", "", 0);
            HorarioDAO_1.default.borreloYa(objcubi, res);
        }
    }
    actualizaTuSala(req, res) {
        const objCubi = new Horario_1.default(0, "", "", 0);
        objCubi.idHorario = Number(req.body.idHorario);
        objCubi.fecha = String(req.body.fecha);
        objCubi.hora = String(req.body.hora);
        objCubi.idPelicula = Number(req.body.idPelicula);
        HorarioDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const horarioControlador = new HorarioControlador();
exports.default = horarioControlador;
