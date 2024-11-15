"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HorarioControlador_1 = __importDefault(require("../controller/HorarioControlador"));
class HorarioRuta {
    constructor() {
        this.apiRutaHorario = (0, express_1.Router)();
        this.apiRutaHorario.get("/getall", HorarioControlador_1.default.dameHorarios);
        this.apiRutaHorario.post("/addcito", HorarioControlador_1.default.cogeTuHorario);
        this.apiRutaHorario.delete("/delete/:idHorario", HorarioControlador_1.default.borraTuHorario);
        this.apiRutaHorario.put("/update", HorarioControlador_1.default.actualizaTuHorario);
    }
}
const horarioRuta = new HorarioRuta();
exports.default = horarioRuta.apiRutaHorario;
