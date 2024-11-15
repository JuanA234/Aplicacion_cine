"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ComidaCineControlador_1 = require("../controller/ComidaCineControlador");
var ComidaCineRuta = /** @class */ (function () {
    function ComidaCineRuta() {
        this.apiRutaComidaCine = (0, express_1.Router)();
        this.apiRutaComidaCine.get("/getall", ComidaCineControlador_1.default.dameComidaCine);
        this.apiRutaComidaCine.post("/addcito", ComidaCineControlador_1.default.cogeTuComidaCine);
        this.apiRutaComidaCine.delete("/delete", ComidaCineControlador_1.default.borraTuComidaCine);
        this.apiRutaComidaCine.put("/update", ComidaCineControlador_1.default.actualizaTuComidaCine);
    }
    return ComidaCineRuta;
}());
var comidaCineRuta = new ComidaCineRuta();
exports.default = comidaCineRuta.apiRutaComidaCine;
