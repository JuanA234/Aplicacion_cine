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
var ButacaDAO_1 = require("../DAO/ButacaDAO");
var Butacas_1 = require("../entity/Butacas");
var ButacaControlador = /** @class */ (function (_super) {
    __extends(ButacaControlador, _super);
    function ButacaControlador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButacaControlador.prototype.dameButacas = function (req, res) {
        ButacaDAO_1.default.obtenerTodo([], res);
    };
    ButacaControlador.prototype.cogeTuButaca = function (req, res) {
        var objCubi = new Butacas_1.default(0, "", 0, 0);
        objCubi.columna = req.body.columna;
        objCubi.fila = req.body.fila;
        objCubi.idSala = req.body.idSala;
        ButacaDAO_1.default.grabeloYa(objCubi, res);
    };
    ButacaControlador.prototype.borraTuButaca = function (req, res) {
        if (isNaN(Number(req.params.idButaca))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            var codiguito = Number(req.params.idButaca);
            var objCubi = new Butacas_1.default(codiguito, "", 0, 0);
            ButacaDAO_1.default.borreloYa(objCubi, res);
        }
    };
    ButacaControlador.prototype.actualizaTuButaca = function (req, res) {
        var objCubi = new Butacas_1.default(0, "", 0, 0);
        objCubi.idButaca = Number(req.body.idButaca);
        objCubi.columna = Number(req.body.columna);
        objCubi.fila = String(req.body.fila);
        objCubi.idSala = Number(req.body.idSala);
        ButacaDAO_1.default.actualiceloYa(objCubi, res);
    };
    return ButacaControlador;
}(ButacaDAO_1.default));
var butacaControlador = new ButacaControlador();
exports.default = butacaControlador;
