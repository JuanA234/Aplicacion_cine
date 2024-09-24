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
var CargosDAO_1 = require("../dao/CargosDAO");
var Cargos_1 = require("../entity/Cargos");
var CargosControlador = /** @class */ (function (_super) {
    __extends(CargosControlador, _super);
    function CargosControlador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CargosControlador.prototype.dameCargos = function (req, res) {
        CargosDAO_1.default.obtenerTodo([], res);
    };
    CargosControlador.prototype.obtenerCargo = function (req, res) {
        var objCubi = new Cargos_1.default(0, "", "");
        objCubi.idCargo = req.body.idCargo;
        objCubi.nombreCargo = String(req.body.nombreCargo);
        objCubi.descripcionCargo = req.body.descripcionCargo;
        CargosDAO_1.default.grabeloYa(objCubi, res);
    };
    CargosControlador.prototype.borrarCargo = function (req, res) {
        if (isNaN(Number(req.params.idCargo))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            var codiguito = Number(req.params.idCargo);
            var objcubi = new Cargos_1.default(codiguito, "", "");
            CargosDAO_1.default.borreloYa(objcubi, res);
        }
    };
    CargosControlador.prototype.actualizarCargo = function (req, res) {
        var objCubi = new Cargos_1.default(0, "", "");
        objCubi.idCargo = Number(req.body.idCargo);
        objCubi.nombreCargo = String(req.body.nombreCargo);
        objCubi.descripcionCargo = String(req.body.descripcionCargo);
        CargosDAO_1.default.actualiceloYa(objCubi, res);
    };
    return CargosControlador;
}(CargosDAO_1.default));
var cargosControlador = new CargosControlador();
exports.default = cargosControlador;
