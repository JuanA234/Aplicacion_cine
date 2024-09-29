"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reservacion {
    constructor(idReservacion, idPersona, idFuncion, idButaca) {
        this.idReservacion = idReservacion;
        this.idButaca = idButaca;
        this.idPersona = idPersona;
        this.idFuncion = idFuncion;
    }
}
exports.default = Reservacion;
