"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PersonasControlador_1 = __importDefault(require("../controller/PersonasControlador"));
class PersonasRuta {
    constructor() {
        this.apiRutaPersonas = (0, express_1.Router)();
        this.apiRutaPersonas.get("/getall", PersonasControlador_1.default.damePersonas);
        this.apiRutaPersonas.post("/addcito", PersonasControlador_1.default.obtenerPersona);
        this.apiRutaPersonas.delete("/delete/:idPersona", PersonasControlador_1.default.borrarPersona);
        this.apiRutaPersonas.put("/update", PersonasControlador_1.default.actualizarPersona);
        this.apiRutaPersonas.get("/getPage", PersonasControlador_1.default.damePersonasPaginadas);
    }
}
const personasRuta = new PersonasRuta();
exports.default = personasRuta.apiRutaPersonas;
