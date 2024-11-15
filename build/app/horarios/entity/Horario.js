"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Horario {
    constructor(cod, date, time, codPel) {
        this.idHorario = cod;
        this.fecha = date;
        this.hora = time;
        this.idPelicula = codPel;
    }
}
exports.default = Horario;
