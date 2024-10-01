"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FuncionDAO_1 = __importDefault(require("../DAO/FuncionDAO"));
const Funcion_1 = __importDefault(require("../entity/Funcion"));
class FuncionControlador extends FuncionDAO_1.default {
    dameFunciones(req, res) {
        FuncionDAO_1.default.obtenerTodo([], res);
    }
    cogeTuFuncion(req, res) {
        const objCubi = new Funcion_1.default(0, 0, 0);
        objCubi.idHorario = Number(req.body.idHorario);
        objCubi.idSala = Number(req.body.idSala);
        FuncionDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuFuncion(req, res) {
        if (isNaN(Number(req.params.idFuncion))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            const codiguito = Number(req.params.idFuncion);
            const objCubi = new Funcion_1.default(codiguito, 0, 0);
            FuncionDAO_1.default.borreloYa(objCubi, res);
        }
    }
    cambiarHorariosDeSalas(req, res) {
        const objCubi = new Funcion_1.default(0, 0, 0);
        objCubi.idHorario = Number(req.body.idHorario);
        objCubi.idSala = Number(req.body.idSala);
        FuncionDAO_1.default.cambiarHorarioDeLasSalas(objCubi, res);
    }
    funcionesPaginadas(req, res) {
        FuncionDAO_1.default.vistaPaginada(req, res);
    }
    actualizaTuFuncion(req, res) {
        const objCubi = new Funcion_1.default(0, 0, 0);
        objCubi.idFuncion = Number(req.body.idFuncion);
        objCubi.idHorario = Number(req.body.idHorario);
        objCubi.idSala = Number(req.body.idSala);
        FuncionDAO_1.default.actualizaloYa(objCubi, res);
    }
}
const funcionControlador = new FuncionControlador();
exports.default = funcionControlador;
