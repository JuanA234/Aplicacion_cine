"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComidaCine = /** @class */ (function () {
    function ComidaCine(cod, price, amountAva, idCom, idCin) {
        this.idMenu = cod;
        this.precio = price;
        this.cantidadDisponible = amountAva;
        this.idComida = idCom;
        this.idCine = idCin;
    }
    return ComidaCine;
}());
exports.default = ComidaCine;
