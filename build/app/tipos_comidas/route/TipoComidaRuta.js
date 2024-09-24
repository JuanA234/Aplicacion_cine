"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TipoComidaControlador_1 = __importDefault(require("../controller/TipoComidaControlador"));
class TipoComidaRuta {
    constructor() {
        this.apiRutaTipoComida = (0, express_1.Router)();
        this.apiRutaTipoComida.get("/getall", TipoComidaControlador_1.default.dameTipoComidas);
        this.apiRutaTipoComida.post("/addicto", TipoComidaControlador_1.default.cogeTuTipoComida);
        this.apiRutaTipoComida.delete("/delete/:idTipoComida", TipoComidaControlador_1.default.borraTuTipoComida);
        this.apiRutaTipoComida.put("/update", TipoComidaControlador_1.default.actualizaTuTipoComida);
    }
}
const salaRuta = new TipoComidaRuta();
exports.default = salaRuta.apiRutaTipoComida;
