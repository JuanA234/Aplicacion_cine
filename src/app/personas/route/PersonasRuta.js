"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PersonasControlador_1 = require("../controller/PersonasControlador");
var PersonasRuta = /** @class */ (function () {
    function PersonasRuta() {
        this.apiRutaPersonas = (0, express_1.Router)();
        this.apiRutaPersonas.get("/getall", PersonasControlador_1.default.damePersonas);
        this.apiRutaPersonas.post("/addcito", PersonasControlador_1.default.obtenerPersona);
        this.apiRutaPersonas.delete("/delete/:idPersona", PersonasControlador_1.default.borrarPersona);
        this.apiRutaPersonas.put("/update", PersonasControlador_1.default.actualizarPersona);
    }
    return PersonasRuta;
}());
var personasRuta = new PersonasRuta();
exports.default = personasRuta.apiRutaPersonas;
