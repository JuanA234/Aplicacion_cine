"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UbicacionControlador_1 = __importDefault(require("../controller/UbicacionControlador"));
class UbicacionRuta {
    constructor() {
        this.apiRutaUbicacion = (0, express_1.Router)();
        this.apiRutaUbicacion.get("/getall", UbicacionControlador_1.default.dameUbicacion);
        this.apiRutaUbicacion.post("/addcito", UbicacionControlador_1.default.cogeTuUbicacion);
        this.apiRutaUbicacion.delete("/delete/: idSala", UbicacionControlador_1.default.borraTuUbicacion);
        this.apiRutaUbicacion.put("/update", UbicacionControlador_1.default.actualizaTuUbicacion);
    }
}
const ubicacion = new UbicacionRuta();
exports.default = ubicacion.apiRutaUbicacion;
