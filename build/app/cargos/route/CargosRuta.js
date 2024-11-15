"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CargosControlador_1 = __importDefault(require("../controller/CargosControlador"));
class CargosRuta {
    constructor() {
        this.apiRutaCargos = (0, express_1.Router)();
        this.apiRutaCargos.get("/getall", CargosControlador_1.default.dameCargos);
        this.apiRutaCargos.post("/addcito", CargosControlador_1.default.obtenerCargo);
        this.apiRutaCargos.delete("/delete/:idCargo", CargosControlador_1.default.borrarCargo);
        this.apiRutaCargos.put("/update", CargosControlador_1.default.actualizarCargo);
        this.apiRutaCargos.get("/getPage", CargosControlador_1.default.personasPaginadas);
    }
}
const cargosRuta = new CargosRuta();
exports.default = cargosRuta.apiRutaCargos;
