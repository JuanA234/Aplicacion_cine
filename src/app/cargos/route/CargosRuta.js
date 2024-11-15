"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CargosControlador_1 = require("../controller/CargosControlador");
var CargosRuta = /** @class */ (function () {
    function CargosRuta() {
        this.apiRutaCargos = (0, express_1.Router)();
        this.apiRutaCargos.get("/getall", CargosControlador_1.default.dameCargos);
        this.apiRutaCargos.post("/addcito", CargosControlador_1.default.obtenerCargo);
        this.apiRutaCargos.delete("/delete/:idCargo", CargosControlador_1.default.borrarCargo);
        this.apiRutaCargos.put("/update", CargosControlador_1.default.actualizarCargo);
    }
    return CargosRuta;
}());
var cargosRuta = new CargosRuta();
exports.default = cargosRuta.apiRutaCargos;
