"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartelerasControlador_1 = __importDefault(require("../controller/CartelerasControlador"));
class CartelerasRuta {
    constructor() {
        this.apiRutaCarteleras = (0, express_1.Router)();
        this.apiRutaCarteleras.get("/getall", CartelerasControlador_1.default.dameCarteleras);
        this.apiRutaCarteleras.post("/addcito", CartelerasControlador_1.default.obtenerCartelera);
        this.apiRutaCarteleras.delete("/delete/:idCartelera", CartelerasControlador_1.default.borrarCartelera);
        this.apiRutaCarteleras.put("/update", CartelerasControlador_1.default.actualizarCartelera);
    }
}
const cartelerasRuta = new CartelerasRuta();
exports.default = cartelerasRuta.apiRutaCarteleras;
