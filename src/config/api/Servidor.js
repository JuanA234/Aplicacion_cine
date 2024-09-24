"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = require("cors");
var express_1 = require("express");
var morgan_1 = require("morgan");
var SalaRuta_1 = require("../../app/salas/route/SalaRuta");
var ButacaRuta_1 = require("../../app/butacas/route/ButacaRuta");
var Servidor = /** @class */ (function () {
    function Servidor() {
        this.app = (0, express_1.default)();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }
    Servidor.prototype.exponerEndPoint = function () {
        this.app.use("/room", SalaRuta_1.default);
        this.app.use("/butaca", ButacaRuta_1.default);
    };
    Servidor.prototype.cargarConfiguracion = function () {
        this.app.set("PORT", 3123);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: "50mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
    };
    Servidor.prototype.iniciar = function () {
        var _this = this;
        this.app.listen(this.app.get("PORT"), function () {
            console.log("Listo me fui", _this.app.get("PORT"));
        });
    };
    return Servidor;
}());
exports.default = Servidor;
