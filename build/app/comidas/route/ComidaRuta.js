"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ComidaControlador_1 = __importDefault(require("../controller/ComidaControlador"));
class ComidaRuta {
    constructor() {
        this.apiRutaComida = (0, express_1.Router)();
        this.apiRutaComida.get("/getall", ComidaControlador_1.default.dameComidas);
        this.apiRutaComida.post("/addicto", ComidaControlador_1.default.cogeTuComida);
        this.apiRutaComida.delete("/delete/:idComida", ComidaControlador_1.default.borraTuComida);
        this.apiRutaComida.put("/update", ComidaControlador_1.default.actualizaTuComida);
    }
}
const salaRuta = new ComidaRuta();
exports.default = salaRuta.apiRutaComida;
