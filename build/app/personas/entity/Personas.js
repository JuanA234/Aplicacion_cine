"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Personas {
    constructor(cod, nom, fec, ubi, cin, car, usu) {
        this.idPersona = cod;
        this.nombrePersona = nom;
        this.fechaNacimientoPersona = fec;
        this.idUbicacion = ubi;
        this.idCine = cin;
        this.idCargo = car;
        this.idUsuario = usu;
    }
}
exports.default = Personas;
