"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SalaDAO_1 = __importDefault(require("../DAO/SalaDAO"));
class SalaControlador extends SalaDAO_1.default {
    dameSalas(req, res) {
        SalaDAO_1.default.obtenerTodo([], res);
    }
}
const salaControlador = new SalaControlador();
exports.default = salaControlador;
