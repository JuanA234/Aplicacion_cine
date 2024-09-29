"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FuncionesControlador_1 = __importDefault(require("../controller/FuncionesControlador"));
class FuncionRuta {
    constructor() {
        this.apiRutaFuncion = (0, express_1.Router)();
        this.apiRutaFuncion.get("/getall", FuncionesControlador_1.default.dameFunciones);
        this.apiRutaFuncion.post("/addicto", FuncionesControlador_1.default.cogeTuFuncion);
        this.apiRutaFuncion.delete("/delete/:idFuncion", FuncionesControlador_1.default.borraTuFuncion);
        this.apiRutaFuncion.put("/update", FuncionesControlador_1.default.actualizaTuFuncion);
    }
}
const rutaFuncion = new FuncionRuta();
exports.default = rutaFuncion.apiRutaFuncion;
