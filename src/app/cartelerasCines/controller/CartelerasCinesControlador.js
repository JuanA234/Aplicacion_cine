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
var CartelerasCinesDAO_1 = require("../dao/CartelerasCinesDAO");
var CartelerasCines_1 = require("../entity/CartelerasCines");
var CartelerasCinesControlador = /** @class */ (function (_super) {
    __extends(CartelerasCinesControlador, _super);
    function CartelerasCinesControlador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartelerasCinesControlador.prototype.dameCartelerasCines = function (req, res) {
        CartelerasCinesDAO_1.default.obtenerTodo([], res);
    };
    CartelerasCinesControlador.prototype.obtenerCartelerasCines = function (req, res) {
        var objCubi = new CartelerasCines_1.default(0, 0, new Date(0), new Date(0), 0);
        objCubi.idCartelera = req.body.idCartelera;
        objCubi.idPelicula = Number(req.body.idPelicula);
        objCubi.fechaDesde = req.body.fechaDesde;
        objCubi.fechaHasta = req.body.fechaHasta;
        objCubi.idCine = req.body.idCine;
        CartelerasCinesDAO_1.default.grabeloYa(objCubi, res);
    };
    CartelerasCinesControlador.prototype.borrarCartelerasCines = function (req, res) {
        var idCartelera = Number(req.params.idCartelera);
        var idPelicula = Number(req.params.idPelicula);
        if (isNaN(idCartelera) || isNaN(idPelicula)) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            var objcubi = new CartelerasCines_1.default(idCartelera, idPelicula, new Date(0), new Date(0), 0);
            CartelerasCinesDAO_1.default.borreloYa(objcubi, res);
        }
    };
    CartelerasCinesControlador.prototype.actualizarCartelerasCines = function (req, res) {
        var objCubi = new CartelerasCines_1.default(0, 0, new Date(0), new Date(0), 0);
        objCubi.idCartelera = req.body.idCartelera;
        objCubi.idPelicula = Number(req.body.idPelicula);
        objCubi.fechaDesde = req.body.fechaDesde;
        objCubi.fechaHasta = req.body.fechaHasta;
        objCubi.idCine = req.body.idCine;
        CartelerasCinesDAO_1.default.actualiceloYa(objCubi, res);
    };
    return CartelerasCinesControlador;
}(CartelerasCinesDAO_1.default));
var cartelerasCinesControlador = new CartelerasCinesControlador();
exports.default = cartelerasCinesControlador;
