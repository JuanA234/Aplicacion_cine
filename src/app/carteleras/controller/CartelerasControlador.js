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
var CartelerasDAO_1 = require("../dao/CartelerasDAO");
var Carteleras_1 = require("../entity/Carteleras");
var CartelerasControlador = /** @class */ (function (_super) {
    __extends(CartelerasControlador, _super);
    function CartelerasControlador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartelerasControlador.prototype.dameCarteleras = function (req, res) {
        CartelerasDAO_1.default.obtenerTodo([], res);
    };
    CartelerasControlador.prototype.obtenerCartelera = function (req, res) {
        var objCartelera = new Carteleras_1.default(0, 0);
        objCartelera.idCartelera = Number(req.body.idCartelera);
        objCartelera.idCine = Number(req.body.idCine);
        CartelerasDAO_1.default.grabeloYa(objCartelera, res);
    };
    CartelerasControlador.prototype.borrarCartelera = function (req, res) {
        if (isNaN(Number(req.params.idCartelera))) {
            res.status(400).json({ respuesta: "Y el código de la cartelera?" });
        }
        else {
            var idCartelera = Number(req.params.idCartelera);
            var objCartelera = new Carteleras_1.default(idCartelera, 0);
            CartelerasDAO_1.default.borreloYa(objCartelera, res);
        }
    };
    CartelerasControlador.prototype.actualizarCartelera = function (req, res) {
        var objCartelera = new Carteleras_1.default(0, 0);
        objCartelera.idCartelera = Number(req.body.idCartelera);
        objCartelera.idCine = Number(req.body.idCine);
        CartelerasDAO_1.default.actualiceloYa(objCartelera, res);
    };
    return CartelerasControlador;
}(CartelerasDAO_1.default));
var cartelerasControlador = new CartelerasControlador();
exports.default = cartelerasControlador;
