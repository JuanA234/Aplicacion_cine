"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartelerasCinesControlador_1 = __importDefault(require("../controller/CartelerasCinesControlador"));
class CartelerasCinesRuta {
    constructor() {
        this.apiRutaCartelerasCines = (0, express_1.Router)();
        this.apiRutaCartelerasCines.get("/getall", CartelerasCinesControlador_1.default.dameCartelerasCines);
        this.apiRutaCartelerasCines.post("/addcito", CartelerasCinesControlador_1.default.obtenerCartelerasCines);
        this.apiRutaCartelerasCines.delete("/delete/:idCartelera/:idPelicula", CartelerasCinesControlador_1.default.borrarCartelerasCines);
        this.apiRutaCartelerasCines.put("/update", CartelerasCinesControlador_1.default.actualizarCartelerasCines);
    }
}
const cartelerasCinesRuta = new CartelerasCinesRuta();
exports.default = cartelerasCinesRuta.apiRutaCartelerasCines;
