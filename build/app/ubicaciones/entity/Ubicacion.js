"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ubicacion {
    constructor(cod, nom, codPad) {
        this.idUbicacion = cod;
        this.nombreUbicacion = nom;
        this.idPadre = codPad;
    }
}
exports.default = Ubicacion;
