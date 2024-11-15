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
var SalaDAO_1 = require("../DAO/SalaDAO");
var Sala_1 = require("../entity/Sala");
var SalaControlador = /** @class */ (function (_super) {
    __extends(SalaControlador, _super);
    function SalaControlador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SalaControlador.prototype.dameSalas = function (req, res) {
        SalaDAO_1.default.obtenerTodo([], res);
    };
    SalaControlador.prototype.cogeTusala = function (req, res) {
        var objCubi = new Sala_1.default(0, 0, 0);
        objCubi.salaCapacidad = req.body.salaCapacidad;
        objCubi.idCine = req.body.idCine;
        SalaDAO_1.default.grabeloYa(objCubi, res);
    };
    SalaControlador.prototype.borraTuSala = function (req, res) {
        if (isNaN(Number(req.params.idSala))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            var codiguito = Number(req.params.idSala);
            var objCubi = new Sala_1.default(codiguito, 0, 0);
            SalaDAO_1.default.borreloYa(objCubi, res);
        }
    };
    SalaControlador.prototype.actualizaTuTAbla = function (req, res) {
        var objCubi = new Sala_1.default(0, 0, 0);
        objCubi.idSala = Number(req.body.idSala);
        objCubi.salaCapacidad = Number(req.body.salaCapacidad);
        objCubi.idCine = Number(req.body.idCine);
        SalaDAO_1.default.actualiceloYa(objCubi, res);
    };
    return SalaControlador;
}(SalaDAO_1.default));
var salaControlador = new SalaControlador();
exports.default = salaControlador;
