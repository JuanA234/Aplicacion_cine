"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ComidaCine {
    constructor(cod, price, amountAva, idCom, idCin) {
        this.idMenu = cod;
        this.precio = price;
        this.cantidadDisponible = amountAva;
        this.idComida = idCom;
        this.idCine = idCin;
    }
}
exports.default = ComidaCine;
