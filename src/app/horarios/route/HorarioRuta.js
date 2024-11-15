"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var HorarioControlador_1 = require("../controller/HorarioControlador");
var HorarioRuta = /** @class */ (function () {
    function HorarioRuta() {
        this.apiRutaHorario = (0, express_1.Router)();
        this.apiRutaHorario.get("/getall", HorarioControlador_1.default.dameHorarios);
        this.apiRutaHorario.post("/addcito", HorarioControlador_1.default.cogeTuHorario);
        this.apiRutaHorario.delete("/delete", HorarioControlador_1.default.borraTuHorario);
        this.apiRutaHorario.put("update", HorarioControlador_1.default.actualizaTuHorario);
    }
    return HorarioRuta;
}());
var horarioRuta = new HorarioRuta();
exports.default = horarioRuta.apiRutaHorario;
