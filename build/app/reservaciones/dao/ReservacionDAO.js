"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_reservaciones_1 = require("../repository/sql_reservaciones");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class ReservacionDAO {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .result(sql_reservaciones_1.SQL_RESERVACIONES.GET_ALL, params)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            }).catch((miError) => {
                console.log("mi error");
                res.status(400).json({
                    "respuesta": "ay no sirve"
                });
            });
        });
    }
    static grabeloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_reservaciones_1.SQL_RESERVACIONES.HOW_MANY_ESPECIFIC, [datos.idPersona, datos.idButaca, datos.idFuncion]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    console.log(datos);
                    respuBase = yield consulta.one(sql_reservaciones_1.SQL_RESERVACIONES.ADD, [datos.idPersona, datos.idButaca, datos.idFuncion]);
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe la Reservacion" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
                .catch((miError) => {
                res.status(400).json({ respuesta: miError.detail });
            });
        });
    }
    static reservarTodo(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_reservaciones_1.SQL_RESERVACIONES.HOW_MANY_PERSONS, [datos.idPersona]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_reservaciones_1.SQL_RESERVACIONES.RESERV_ALL, [datos.idPersona]);
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "No se puede cambiar la reservación porque la persona especificada no existe" });
                        break;
                    case 2:
                        res.status(200).json({ respuesta: "Ok" });
                        break;
                }
            }).catch();
        });
    }
    static vistaPaginada(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const page = parseInt(params.query.page) || 1; // Valor por defecto a 1
                const limit = parseInt(params.query.limit) || 10; // Valor por defecto a 10
                if (page > limit && page <= 0)
                    return res.status(400).json({ respuesta: "Pagina invalida" });
                const desde = (page - 1) * limit;
                const salas = yield consulta.manyOrNone(sql_reservaciones_1.SQL_RESERVACIONES.GET_PAGE, [Number(limit), Number(desde)]);
                return salas;
            })).then((salas) => {
                res.status(200).json(salas);
            })
                .catch(err => {
                res.status(400).json({
                    "respuesta": err
                });
            });
        });
    }
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default
                .task((consulta) => {
                return consulta.result(sql_reservaciones_1.SQL_RESERVACIONES.DELETE, [datos.idReservacion]);
            })
                .then((respuesta) => {
                res.status(200).json({
                    respuesta: "Lo borre sin miedo",
                    info: respuesta.rowCount,
                });
            })
                .catch((miErrorcito) => {
                res.status(400).json({ respuesta: miErrorcito.detail });
            });
        });
    }
    static actualiceloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_reservaciones_1.SQL_RESERVACIONES.HOW_MANY, [datos.idReservacion]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_reservaciones_1.SQL_RESERVACIONES.UPDATE, [datos.idPersona, datos.idButaca, datos.idFuncion, datos.idReservacion]);
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita no existe" });
                        break;
                    default:
                        res.status(200).json({ acualizado: "Ok" });
                        break;
                }
            })
                .catch((miError) => {
                res.status(400).json({ respuesta: miError.detail });
            });
        });
    }
}
exports.default = ReservacionDAO;
