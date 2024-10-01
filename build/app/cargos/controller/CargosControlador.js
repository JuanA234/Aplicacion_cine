"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CargosDAO_1 = __importDefault(require("../dao/CargosDAO"));
const Cargos_1 = __importDefault(require("../entity/Cargos"));
class CargosControlador extends CargosDAO_1.default {
    dameCargos(req, res) {
        CargosDAO_1.default.obtenerTodo([], res);
    }
    funcionesPaginadas(req, res) {
        CargosDAO_1.default.vistaPaginada(req, res);
    }
    actuaizarTod(req, res) {
        const objCubi = new Cargos_1.default(0, "", "");
        objCubi.nombreCargo = req.body.nombreCargo;
        objCubi.descripcionCargo = req.body.descripcionCargo;
        CargosDAO_1.default.actualizarTodo(objCubi, res);
    }
    obtenerCargo(req, res) {
        const objCubi = new Cargos_1.default(0, "", "");
        objCubi.idCargo = req.body.idCargo;
        objCubi.nombreCargo = String(req.body.nombreCargo);
        objCubi.descripcionCargo = req.body.descripcionCargo;
        CargosDAO_1.default.grabeloYa(objCubi, res);
    }
    borrarCargo(req, res) {
        if (isNaN(Number(req.params.idCargo))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            const codiguito = Number(req.params.idCargo);
            const objcubi = new Cargos_1.default(codiguito, "", "");
            CargosDAO_1.default.borreloYa(objcubi, res);
        }
    }
    actualizarCargo(req, res) {
        const objCubi = new Cargos_1.default(0, "", "");
        objCubi.idCargo = Number(req.body.idCargo);
        objCubi.nombreCargo = String(req.body.nombreCargo);
        objCubi.descripcionCargo = String(req.body.descripcionCargo);
        CargosDAO_1.default.actualiceloYa(objCubi, res);
    }
    actualizacionMasiva(req, res) {
        const textoAReemplazar = req.body.textoAReemplazar; // Este sería el nombre_cargo
        const nuevoTexto = req.body.nuevoTexto; // Este sería la descripción   
        console.log(nuevoTexto, textoAReemplazar);
        if (!textoAReemplazar || !nuevoTexto) {
            res.status(400).json({ respuesta: "Faltan parámetros para la actualización masiva" });
        }
        else {
            // Crear el objeto `Cargos` con los datos del request
            const objCubi = new Cargos_1.default(0, textoAReemplazar, nuevoTexto);
            // Llamar al método de DAO para realizar la actualización masiva
            CargosDAO_1.default.actualizacionMasiva(objCubi, res);
        }
    }
}
const cargosControlador = new CargosControlador();
exports.default = cargosControlador;
