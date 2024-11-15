"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersonasDAO_1 = __importDefault(require("../dao/PersonasDAO"));
const Personas_1 = __importDefault(require("../entity/Personas"));
class PersonasControlador extends PersonasDAO_1.default {
    damePersonas(req, res) {
        PersonasDAO_1.default.obtenerTodo([], res);
    }
    obtenerPersona(req, res) {
        const objCubi = new Personas_1.default(0, "", new Date(0), 0, 0, 0, 0);
        objCubi.idPersona = req.body.idPersona;
        objCubi.nombrePersona = String(req.body.nombrePersona);
        objCubi.fechaNacimientoPersona = req.body.fechaNacimientoPersona;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idCine = req.body.idCine;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUsuario = req.body.idUsuario;
        PersonasDAO_1.default.grabeloYa(objCubi, res);
    }
    borrarPersona(req, res) {
        if (isNaN(Number(req.params.idPersona))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            const codiguito = Number(req.params.idPersona);
            const objcubi = new Personas_1.default(codiguito, "", new Date(0), 0, 0, 0, 0);
            PersonasDAO_1.default.borreloYa(objcubi, res);
        }
    }
    actualizarPersona(req, res) {
        const objCubi = new Personas_1.default(0, "", new Date(0), 0, 0, 0, 0);
        objCubi.idPersona = req.body.idPersona;
        objCubi.nombrePersona = String(req.body.nombrePersona);
        objCubi.fechaNacimientoPersona = req.body.fechaNacimientoPersona;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.idCine = req.body.idCine;
        objCubi.idCargo = req.body.idCargo;
        objCubi.idUsuario = req.body.idUsuario;
        PersonasDAO_1.default.actualiceloYa(objCubi, res);
    }
    personasPaginadas(req, res) {
        PersonasDAO_1.default.vistaPaginada(req, res);
    }
}
const personasControlador = new PersonasControlador();
exports.default = personasControlador;
