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
const sql_butacas_1 = require("../repository/sql_butacas");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
const sql_sala_1 = require("../../salas/repository/sql_sala");
class ButacaDAO {
    static obtenerTodo(tamPag, page, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const offset = (page - 1) * tamPag;
                const resultado = yield consulta.result(sql_butacas_1.SQL_BUTACAS.GET_ALL, [tamPag, offset]);
                const cubi = yield consulta.manyOrNone(sql_butacas_1.SQL_BUTACAS.TOTAL);
                const totalButacas = cubi[0].count;
                return { resultado, totalButacas };
            }))
                .then(({ resultado, totalButacas }) => {
                res.status(200).json({
                    butacas: resultado.rows,
                    totalButacas: totalButacas,
                });
            }).catch((miError) => {
                res.status(400).json({
                    "respuesta": "ay no sirve",
                    mensaje: miError.message,
                    Error: miError,
                    NombreError: miError.name,
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
                let creado = false;
                const cubi = yield consulta.oneOrNone(sql_butacas_1.SQL_BUTACAS.HOW_MANY, [datos.idButaca, datos.fila, datos.columna]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(sql_butacas_1.SQL_BUTACAS.ADD, [datos.fila, datos.columna, datos.idSala]);
                    creado = true;
                }
                return { queHacer, respuBase, creado };
            }))
                .then(({ queHacer, respuBase, creado }) => {
                switch (queHacer) {
                    case 1:
                        res.status(200).json({
                            respuesta: "Compita ya existe la butaca",
                            creado: creado
                        });
                        break;
                    default:
                        res.status(200).json({
                            respuBase,
                            respuesta: "Agregado con éxito",
                            creado: creado
                        });
                        break;
                }
            })
                .catch((miError) => {
                res.status(400).json({ respuesta: "Se totio mano",
                    mensaje: miError.message,
                    Error: miError,
                    NombreError: miError.name,
                });
            });
        });
    }
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuesta;
                let borradoSinMiedo = false;
                const existe = yield consulta.one(sql_butacas_1.SQL_BUTACAS.EXISTE_OTRA_TABLA, [datos.idButaca]);
                if (existe.existe == 0) {
                    queHacer = 2;
                    respuesta = consulta.result(sql_sala_1.SQL_SALAS.DELETE, [datos.idButaca]);
                    borradoSinMiedo = true;
                }
                return { queHacer, respuesta, borradoSinMiedo };
            }))
                .then(({ queHacer, respuesta, borradoSinMiedo }) => {
                switch (queHacer) {
                    case 1:
                        res.status(200).json({
                            respuesta: "Compita no puedes borrarlo, existe en otra tabla",
                            borradoSinMiedo: borradoSinMiedo,
                        });
                        break;
                    default:
                        res.status(200).json({
                            respuesta: "Lo borre sin miedo",
                            info: respuesta.rowCount,
                            borradoSinMiedo: borradoSinMiedo,
                        });
                        break;
                }
            })
                .catch((miErrorcito) => {
                res.status(400).json({
                    resultado: "Pailas, sql totiao",
                    mensaje: miErrorcito.message,
                    Error: miErrorcito,
                    //NombreError: miErrorcito.name,
                    //stackError: miErrorcito.stack
                });
            });
        });
    }
    static actualiceVarios(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_butacas_1.SQL_BUTACAS.HOW_MANY, [datos.idButaca, datos.fila, datos.columna]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_butacas_1.SQL_BUTACAS.UPDATE_MASIVO, [datos.fila, datos.columna, datos.idSala, datos.fila]);
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
                res.status(400).json({ respuesta: "pailas, sql totiao",
                    mensaje: miError.message,
                    NombreError: miError.name,
                    Error: miError,
                    //stackError: miError.stack
                });
            });
        });
    }
    static actualiceUno(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                let actualizado = false;
                const cubi = yield consulta.one(sql_butacas_1.SQL_BUTACAS.HOW_MANY, [datos.idButaca, datos.fila, datos.columna]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_butacas_1.SQL_BUTACAS.UPDATE, [datos.fila, datos.columna, datos.idSala, datos.idButaca]);
                    actualizado = true;
                }
                return { queHacer, respuBase, actualizado };
            }))
                .then(({ queHacer, respuBase, actualizado }) => {
                switch (queHacer) {
                    case 1:
                        res.status(200).json({ respuesta: "Compita no existe",
                            actualizado: actualizado,
                        });
                        break;
                    default:
                        res.status(200).json({ respuesta: "Actualizado",
                            actualizado: actualizado
                        });
                        break;
                }
            })
                .catch((miError) => {
                res.status(400).json({ respuesta: "pailas, sql totiao",
                    mensaje: miError.message,
                    NombreError: miError.name,
                    Error: miError,
                    //stackError: miError.stack
                });
            });
        });
    }
}
exports.default = ButacaDAO;
