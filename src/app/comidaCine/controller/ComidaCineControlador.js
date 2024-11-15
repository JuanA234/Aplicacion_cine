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
var ComidaCineDAO_1 = require("../dao/ComidaCineDAO");
var ComidaCine_1 = require("../entity/ComidaCine");
var ComdiaCineControlador = /** @class */ (function (_super) {
    __extends(ComdiaCineControlador, _super);
    function ComdiaCineControlador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComdiaCineControlador.prototype.dameComidaCine = function (req, res) {
        ComidaCineDAO_1.default.obtenerTodo([], res);
    };
    ComdiaCineControlador.prototype.cogeTuComidaCine = function (req, res) {
        var objCubi = new ComidaCine_1.default(0, 0, 0, 0, 0);
        objCubi.idMenu = req.body.idMenu;
        objCubi.precio = req.body.precio;
        objCubi.cantidadDisponible = req.body.cantidadDisponible;
        objCubi.idComida = req.body.idComida;
        objCubi.idCine = req.body.idCine;
        ComidaCineDAO_1.default.grabeloYa(objCubi, res);
    };
    ComdiaCineControlador.prototype.borraTuComidaCine = function (req, res) {
        if (isNaN(Number(req.params.idSala))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            var codiguito = Number(req.params.idComidaCine);
            var objcubi = new ComidaCine_1.default(codiguito, 0, 0, 0, 0);
            ComidaCineDAO_1.default.borreloYa(objcubi, res);
        }
    };
    ComdiaCineControlador.prototype.actualizaTuComidaCine = function (req, res) {
        var objCubi = new ComidaCine_1.default(0, 0, 0, 0, 0);
        objCubi.idMenu = Number(req.body.idMenu);
        objCubi.precio = Number(req.body.precio);
        objCubi.cantidadDisponible = Number(req.body.cantidadDisponible);
        objCubi.idComida = Number(req.body.idComida);
        objCubi.idCine = Number(req.body.idCine);
        ComidaCineDAO_1.default.actualiceloYa(objCubi, res);
    };
    return ComdiaCineControlador;
}(ComidaCineDAO_1.default));
var comidaCineControlador = new ComdiaCineControlador();
exports.default = comidaCineControlador;
