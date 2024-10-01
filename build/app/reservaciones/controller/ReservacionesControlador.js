"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReservacionDAO_1 = __importDefault(require("../dao/ReservacionDAO"));
const Reservacion_1 = __importDefault(require("../entity/Reservacion"));
class ReservacionControlador extends ReservacionDAO_1.default {
    dameReservaciones(req, res) {
        ReservacionDAO_1.default.obtenerTodo([], res);
    }
    cogeTuReservacion(req, res) {
        const objCubi = new Reservacion_1.default(0, 0, 0, 0);
        objCubi.idReservacion = req.body.idReservacion;
        objCubi.idPersona = req.body.idPersona;
        objCubi.idFuncion = req.body.idFuncion;
        objCubi.idButaca = req.body.idButaca;
        ReservacionDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuReservacion(req, res) {
        if (isNaN(Number(req.params.idReservacion))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            const codiguito = Number(req.params.idReservacion);
            const objCubi = new Reservacion_1.default(codiguito, 0, 0, 0);
            ReservacionDAO_1.default.borreloYa(objCubi, res);
        }
    }
    funcionesPaginadas(req, res) {
        ReservacionDAO_1.default.vistaPaginada(req, res);
    }
    actualizaTuTAbla(req, res) {
        const objCubi = new Reservacion_1.default(0, 0, 0, 0);
        objCubi.idReservacion = Number(req.body.idReservacion);
        objCubi.idPersona = Number(req.body.idPersona);
        objCubi.idFuncion = Number(req.body.idFuncion);
        objCubi.idButaca = Number(req.body.idButaca);
        ReservacionDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const reservacionControlador = new ReservacionControlador();
exports.default = reservacionControlador;
