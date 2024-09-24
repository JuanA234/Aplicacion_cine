"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CartelerasCinesControlador_1 = require("../controller/CartelerasCinesControlador");
var CartelerasCinesRuta = /** @class */ (function () {
    function CartelerasCinesRuta() {
        this.apiRutaCartelerasCines = (0, express_1.Router)();
        this.apiRutaCartelerasCines.get("/getall", CartelerasCinesControlador_1.default.dameCartelerasCines);
        this.apiRutaCartelerasCines.post("/addcito", CartelerasCinesControlador_1.default.obtenerCartelerasCines);
        this.apiRutaCartelerasCines.delete("/delete/:idCartelera/:idPelicula", CartelerasCinesControlador_1.default.borrarCartelerasCines);
        this.apiRutaCartelerasCines.put("/update", CartelerasCinesControlador_1.default.actualizarCartelerasCines);
    }
    return CartelerasCinesRuta;
}());
var cartelerasCinesRuta = new CartelerasCinesRuta();
exports.default = cartelerasCinesRuta.apiRutaCartelerasCines;
