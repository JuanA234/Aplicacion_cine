"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ubicacion = /** @class */ (function () {
    function Ubicacion(cod, nom, codPad) {
        this.idUbicacion = cod;
        this.nombreUbicacion = nom;
        this.idPadre = codPad;
    }
    return Ubicacion;
}());
exports.default = Ubicacion;
