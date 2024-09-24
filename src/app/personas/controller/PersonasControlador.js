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
var PersonasDAO_1 = require("../dao/PersonasDAO");
var Personas_1 = require("../entity/Personas");
var PersonasControlador = /** @class */ (function (_super) {
    __extends(PersonasControlador, _super);
    function PersonasControlador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonasControlador.prototype.damePersonas = function (req, res) {
        PersonasDAO_1.default.obtenerTodo([], res);
    };
    PersonasControlador.prototype.obtenerPersona = function (req, res) {
        var objCubi = new Personas_1.default(0, "", new Date(0), 0, 0, 0, 0);
        objCubi.idPersona = req.body.idPersona;
        objCubi.nombrePersona = String(req.body.nombrePersona);
        objCubi.fechaNacimientoPersona = req.body.fechaNacimientoPersona;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idCine = req.body.idCine;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUsuario = req.body.idUsuario;
        PersonasDAO_1.default.grabeloYa(objCubi, res);
    };
    PersonasControlador.prototype.borrarPersona = function (req, res) {
        if (isNaN(Number(req.params.idPersona))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            var codiguito = Number(req.params.idPersona);
            var objcubi = new Personas_1.default(codiguito, "", new Date(0), 0, 0, 0, 0);
            PersonasDAO_1.default.borreloYa(objcubi, res);
        }
    };
    PersonasControlador.prototype.actualizarPersona = function (req, res) {
        var objCubi = new Personas_1.default(0, "", new Date(0), 0, 0, 0, 0);
        objCubi.idPersona = req.body.idPersona;
        objCubi.nombrePersona = String(req.body.nombrePersona);
        objCubi.fechaNacimientoPersona = req.body.fechaNacimientoPersona;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idCine = req.body.idCine;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUsuario = req.body.idUsuario;
        PersonasDAO_1.default.actualiceloYa(objCubi, res);
    };
    return PersonasControlador;
}(PersonasDAO_1.default));
var personasControlador = new PersonasControlador();
exports.default = personasControlador;
