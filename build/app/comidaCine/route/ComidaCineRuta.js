"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ComidaCineControlador_1 = __importDefault(require("../controller/ComidaCineControlador"));
class ComidaCineRuta {
    constructor() {
        this.apiRutaComidaCine = (0, express_1.Router)();
        this.apiRutaComidaCine.get("/getall", ComidaCineControlador_1.default.dameComidasCines);
        this.apiRutaComidaCine.post("/add", ComidaCineControlador_1.default.cogeTuComidaCine);
        this.apiRutaComidaCine.delete("/delete/:idMenu", ComidaCineControlador_1.default.borraTuComidaCine);
        this.apiRutaComidaCine.put("/update", ComidaCineControlador_1.default.actualizaTuComidaCine);
    }
}
const comidaCineRuta = new ComidaCineRuta();
exports.default = comidaCineRuta.apiRutaComidaCine;
