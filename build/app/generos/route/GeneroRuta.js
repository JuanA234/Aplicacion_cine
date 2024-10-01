"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GeneroControlador_1 = __importDefault(require("../controller/GeneroControlador"));
class GeneroRuta {
    constructor() {
        this.apiRutaGenero = (0, express_1.Router)();
        this.apiRutaGenero.get("/getall", GeneroControlador_1.default.dameGeneros);
        this.apiRutaGenero.post("/addicto", GeneroControlador_1.default.cogeTuGenero);
        this.apiRutaGenero.delete("/delete/:idGenero", GeneroControlador_1.default.borraTuGenero);
        this.apiRutaGenero.put("/update", GeneroControlador_1.default.actualizaTuGenero);
        this.apiRutaGenero.get("/getPage", GeneroControlador_1.default.funcionesPaginadas);
    }
}
const generoRuta = new GeneroRuta();
exports.default = generoRuta.apiRutaGenero;
