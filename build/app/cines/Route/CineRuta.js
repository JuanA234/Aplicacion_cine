"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorCines_1 = __importDefault(require("../Controller/ControladorCines"));
class CineRuta {
    constructor() {
        this.apiRutaCine = (0, express_1.Router)();
        this.apiRutaCine.get("/getall", ControladorCines_1.default.dameCine);
        this.apiRutaCine.post("/addcito", ControladorCines_1.default.cogeTuCine);
        this.apiRutaCine.delete("/delete/:idCine", ControladorCines_1.default.borraTuCine);
        this.apiRutaCine.put("/update", ControladorCines_1.default.actualizaTuCine);
    }
}
const salaRuta = new CineRuta();
exports.default = salaRuta.apiRutaCine;
