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
const sql_sala_1 = require("../repository/sql_sala");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class SalaDAO {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .result(sql_sala_1.SQL_SALAS.GET_ALL, params)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            }).catch((miError) => {
                res.status(400).json({
                    "respuesta": miError
                });
            });
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
                const salas = yield consulta.manyOrNone(sql_sala_1.SQL_SALAS.GET_PAGE, [Number(limit), Number(desde)]);
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
    static grabeloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_sala_1.SQL_SALAS.HOW_MANY_CINE, [datos.idCine]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(sql_sala_1.SQL_SALAS.ADD, [datos.salaCapacidad, datos.idCine]);
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe la sala" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
                .catch((miError) => {
                res.status(400).json({ respuesta: miError });
            });
        });
    }
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                dbConnection_1.default
                    .task((consulta) => {
                    return consulta.result(sql_sala_1.SQL_SALAS.DELETE, [datos.idSala]);
                })
                    .then((respuesta) => {
                    res.status(200).json({
                        respuesta: "Lo borre sin miedo",
                        info: respuesta.rowCount,
                    });
                })
                    .catch((miErrorcito) => {
                    res.status(400).json({ respuesta: "Pailas, sql totiado" });
                });
            }
            catch (e) {
                res.status(400).json({ respuesta: e });
            }
        });
    }
    static actualizarCapacidadDeSalas(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_sala_1.SQL_SALAS.HOW_MANY_CINE, [datos.idCine]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_sala_1.SQL_SALAS.MASSIVE_UPDATE, [datos.salaCapacidad, datos.idCine]);
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
                res.status(400).json({ respuesta: miError });
            });
        });
    }
    static actualiceloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_sala_1.SQL_SALAS.HOW_MANY, [datos.idSala]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_sala_1.SQL_SALAS.UPDATE, [datos.salaCapacidad, datos.idCine, datos.idSala]);
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
                res.status(400).json({ respuesta: miError });
            });
        });
    }
}
exports.default = SalaDAO;
