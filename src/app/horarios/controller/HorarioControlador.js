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
var HorarioDAO_1 = require("../dao/HorarioDAO");
var Horario_1 = require("../entity/Horario");
var HorarioControlador = /** @class */ (function (_super) {
    __extends(HorarioControlador, _super);
    function HorarioControlador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HorarioControlador.prototype.dameHorarios = function (req, res) {
        HorarioDAO_1.default.obtenerTodo([], res);
    };
    HorarioControlador.prototype.cogeTuHorario = function (req, res) {
        var objCubi = new Horario_1.default(0, "", "", 0);
        objCubi.idHorario = req.body.idHorario;
        objCubi.fecha = req.body.fecha;
        objCubi.hora = req.body.hora;
        objCubi.idPelicula = req.body.idPelicula;
        HorarioDAO_1.default.grabeloYa(objCubi, res);
    };
    HorarioControlador.prototype.borraTuHorario = function (req, res) {
        if (isNaN(Number(req.params.idSala))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            var codiguito = Number(req.params.idHorario);
            var objcubi = new Horario_1.default(codiguito, "", "", 0);
            HorarioDAO_1.default.borreloYa(objcubi, res);
        }
    };
    HorarioControlador.prototype.actualizaTuHorario = function (req, res) {
        var objCubi = new Horario_1.default(0, "", "", 0);
        objCubi.idHorario = Number(req.body.idHorario);
        objCubi.fecha = String(req.body.fecha);
        objCubi.hora = String(req.body.hora);
        objCubi.idPelicula = Number(req.body.idPelicula);
        HorarioDAO_1.default.actualiceloYa(objCubi, res);
    };
    return HorarioControlador;
}(HorarioDAO_1.default));
var horarioControlador = new HorarioControlador();
exports.default = horarioControlador;
