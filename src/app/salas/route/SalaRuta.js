"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SalaControlador_1 = require("../controller/SalaControlador");
var SalaRuta = /** @class */ (function () {
    function SalaRuta() {
        this.apiRutaSala = (0, express_1.Router)();
        this.apiRutaSala.get("/getall", SalaControlador_1.default.dameSalas);
        this.apiRutaSala.post("/addicto", SalaControlador_1.default.cogeTusala);
        this.apiRutaSala.delete("/delete/:idSala", SalaControlador_1.default.borraTuSala);
        this.apiRutaSala.put("/update", SalaControlador_1.default.actualizaTuTAbla);
    }
    return SalaRuta;
}());
var salaRuta = new SalaRuta();
exports.default = salaRuta.apiRutaSala;
