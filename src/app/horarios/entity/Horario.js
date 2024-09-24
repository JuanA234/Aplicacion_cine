"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Horario = /** @class */ (function () {
    function Horario(cod, date, time, codPel) {
        this.idHorario = cod;
        this.fecha = date;
        this.hora = time;
        this.idPelicula = codPel;
    }
    return Horario;
}());
exports.default = Horario;
