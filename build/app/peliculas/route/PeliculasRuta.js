"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PeliculasControlador_1 = __importDefault(require("../controller/PeliculasControlador"));
class PeliculasRuta {
    constructor() {
        this.apiRutaPeliculas = (0, express_1.Router)();
        this.apiRutaPeliculas.get("/getall", PeliculasControlador_1.default.damePeliculas);
        this.apiRutaPeliculas.get("/getPage", PeliculasControlador_1.default.peliculasPaginadas);
        this.apiRutaPeliculas.post("/addcito", PeliculasControlador_1.default.cogeTuPelicula);
        this.apiRutaPeliculas.delete("/delete/:idPelicula", PeliculasControlador_1.default.borraTuPelicula);
        this.apiRutaPeliculas.put("/update", PeliculasControlador_1.default.actualizaTuPelicula);
    }
}
const peliculasRuta = new PeliculasRuta();
exports.default = peliculasRuta.apiRutaPeliculas;
