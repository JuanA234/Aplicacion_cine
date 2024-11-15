"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CartelerasControlador_1 = require("../controller/CartelerasControlador");
var CartelerasRuta = /** @class */ (function () {
    function CartelerasRuta() {
        this.apiRutaCarteleras = (0, express_1.Router)();
        this.apiRutaCarteleras.get("/getall", CartelerasControlador_1.default.dameCarteleras);
        this.apiRutaCarteleras.post("/addcito", CartelerasControlador_1.default.obtenerCartelera);
        this.apiRutaCarteleras.delete("/delete/:idCartelera", CartelerasControlador_1.default.borrarCartelera);
        this.apiRutaCarteleras.put("/update", CartelerasControlador_1.default.actualizarCartelera);
    }
    return CartelerasRuta;
}());
var cartelerasRuta = new CartelerasRuta();
exports.default = cartelerasRuta.apiRutaCarteleras;
