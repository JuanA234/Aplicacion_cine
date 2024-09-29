"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SalaControlador_1 = __importDefault(require("../controller/SalaControlador"));
class SalaRuta {
    constructor() {
        this.apiRutaSala = (0, express_1.Router)();
        this.apiRutaSala.get("/getall", SalaControlador_1.default.dameSalas);
        this.apiRutaSala.get("/getPage", SalaControlador_1.default.salasPaginadas);
        this.apiRutaSala.post("/addicto", SalaControlador_1.default.cogeTusala);
        this.apiRutaSala.delete("/delete/:idSala", SalaControlador_1.default.borraTuSala);
        this.apiRutaSala.put("/update", SalaControlador_1.default.actualizaTuTAbla);
    }
}
const salaRuta = new SalaRuta();
exports.default = salaRuta.apiRutaSala;
