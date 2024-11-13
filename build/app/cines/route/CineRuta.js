"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CineControlador_1 = __importDefault(require("../controller/CineControlador"));
class CineRuta {
    constructor() {
        this.apiRutaCine = (0, express_1.Router)();
        this.apiRutaCine.get("/getall", CineControlador_1.default.dameCines);
        this.apiRutaCine.post("/addcito", CineControlador_1.default.cogeTuCine);
        this.apiRutaCine.delete("/delete/:idCine", CineControlador_1.default.borraTuCine);
        this.apiRutaCine.put("/update", CineControlador_1.default.actualizaTuCine);
    }
}
const salaRuta = new CineRuta();
exports.default = salaRuta.apiRutaCine;
