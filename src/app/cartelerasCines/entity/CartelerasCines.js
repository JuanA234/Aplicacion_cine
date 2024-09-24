"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CartelerasCines = /** @class */ (function () {
    function CartelerasCines(car, pel, fed, feh, cin) {
        this.idCartelera = car;
        this.idPelicula = pel;
        this.fechaDesde = fed;
        this.fechaHasta = feh;
        this.idCine = cin;
    }
    return CartelerasCines;
}());
exports.default = CartelerasCines;
