"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UbicacionDAO_1 = require("../dao/UbicacionDAO");
var Ubicacion_1 = require("../entity/Ubicacion");
var UbicacionControlador = /** @class */ (function (_super) {
    __extends(UbicacionControlador, _super);
    function UbicacionControlador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UbicacionControlador.prototype.dameSalas = function (req, res) {
        UbicacionDAO_1.default.obtenerTodo([], res);
    };
    UbicacionControlador.prototype.cogeTuSala = function (req, res) {
        var objCubi = new Ubicacion_1.default(0, "", 0);
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.nombreUbicacion = req.body.nombreUbicacion;
        objCubi.idPadre = req.body.idPadre;
        UbicacionDAO_1.default.grabeloYa(objCubi, res);
    };
    UbicacionControlador.prototype.borraTuUbicacion = function (req, res) {
        if (isNaN(Number(req.params.idUbicacion))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            var codiguito = Number(req.params.idUbicacion);
            var objcubi = new Ubicacion_1.default(codiguito, "", 0);
            UbicacionDAO_1.default.borreloYa(objcubi, res);
        }
    };
    UbicacionControlador.prototype.actualizaTuUbicacion = function (req, res) {
        var objCubi = new Ubicacion_1.default(0, "", 0);
        objCubi.idUbicacion = Number(req.body.idUbicacion);
        objCubi.nombreUbicacion = String(req.body.idCine);
        objCubi.idPadre = Number(req.body.idPadre);
        UbicacionDAO_1.default.actualiceloYa(objCubi, res);
    };
    return UbicacionControlador;
}(UbicacionDAO_1.default));
var ubicacionControlador = new UbicacionControlador();
exports.default = ubicacionControlador;
