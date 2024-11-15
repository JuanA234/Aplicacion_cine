"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ButacaControlador_1 = require("../controller/ButacaControlador");
var ButacaRuta = /** @class */ (function () {
    function ButacaRuta() {
        this.apiRutaButaca = (0, express_1.Router)();
        this.apiRutaButaca.get("/getall", ButacaControlador_1.default.dameButacas);
        this.apiRutaButaca.post("/addicto", ButacaControlador_1.default.cogeTuButaca);
        this.apiRutaButaca.delete("/delete/:idButaca", ButacaControlador_1.default.borraTuButaca);
        this.apiRutaButaca.put("/update", ButacaControlador_1.default.actualizaTuButaca);
    }
    return ButacaRuta;
}());
var salaRuta = new ButacaRuta();
exports.default = salaRuta.apiRutaButaca;
