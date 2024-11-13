"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ButacaControlador_1 = __importDefault(require("../controller/ButacaControlador"));
class ButacaRuta {
    constructor() {
        this.apiRutaButaca = (0, express_1.Router)();
        this.apiRutaButaca.get("/getall", ButacaControlador_1.default.dameButacas);
        this.apiRutaButaca.post("/add", ButacaControlador_1.default.cogeTuButaca);
        this.apiRutaButaca.delete("/delete/:idButaca", ButacaControlador_1.default.borraTuButaca);
        this.apiRutaButaca.put("/update", ButacaControlador_1.default.actualizaTuButaca);
    }
}
const salaRuta = new ButacaRuta();
exports.default = salaRuta.apiRutaButaca;
