"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UbicacionControlador_1 = require("../controller/UbicacionControlador");
var UbicacionRuta = /** @class */ (function () {
    function UbicacionRuta() {
        this.apiRutaUbicacion = (0, express_1.Router)();
        this.apiRutaUbicacion.get("/getall", UbicacionControlador_1.default.dameSalas);
        this.apiRutaUbicacion.post("/addcito", UbicacionControlador_1.default.cogeTuSala);
        this.apiRutaUbicacion.delete("/delete", UbicacionControlador_1.default.borraTuUbicacion);
        this.apiRutaUbicacion.put("/update", UbicacionControlador_1.default.actualizaTuUbicacion);
    }
    return UbicacionRuta;
}());
var ubicacionRuta = new UbicacionRuta();
exports.default = ubicacionRuta.apiRutaUbicacion;
