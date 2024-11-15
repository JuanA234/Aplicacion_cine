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
const sql_comidas_1 = require("../repository/sql_comidas");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class ComidaDAO {
    static obtenerTodo(tamPag, page, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const offset = (page - 1) * tamPag;
                const resultado = yield consulta.result(sql_comidas_1.SQL_COMIDAS.GET_ALL, [
                    tamPag,
                    offset,
                ]);
                const cubi = yield consulta.manyOrNone(sql_comidas_1.SQL_COMIDAS.TOTAL);
                const totalComidas = cubi[0].count;
                return { resultado, totalComidas };
            }))
                .then(({ resultado, totalComidas }) => {
                res.status(200).json({
                    resultado: resultado.rows,
                    totalComidas: totalComidas,
                });
            })
                .catch((miError) => {
                console.log("mi error");
                res.status(400).json({
                    respuesta: "ay no sirve",
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
                const cubi = yield consulta.one(sql_comidas_1.SQL_COMIDAS.HOW_MANY, [
                    datos.idComida,
                    datos.nombreComida,
                ]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(sql_comidas_1.SQL_COMIDAS.ADD, [
                        datos.nombreComida,
                        datos.idTipoComida,
                    ]);
                    creado = true;
                }
                return { queHacer, respuBase, creado };
            }))
                .then(({ queHacer, respuBase, creado }) => {
                switch (queHacer) {
                    case 1:
                        res
                            .status(200)
                            .json({
                            respuesta: "Compita ya existe la Comida",
                            creado: creado,
                        });
                        break;
                    default:
                        res
                            .status(200)
                            .json({
                            respuBase,
                            creado: creado,
                            respuesta: "Creado con exito",
                        });
                        break;
                }
            })
                .catch((miError) => {
                res
                    .status(400)
                    .json({
                    respuesta: "Se totio mano",
                    mensaje: miError.message,
                    error: miError,
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
                const existe = yield consulta.one(sql_comidas_1.SQL_COMIDAS.EXISTE_OTRA_TABLA, [
                    datos.idComida,
                ]);
                if (existe.existe == 0) {
                    queHacer = 2;
                    respuesta = consulta.result(sql_comidas_1.SQL_COMIDAS.DELETE, [datos.idComida]);
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
                res
                    .status(400)
                    .json({
                    respuesta: "Pailas, sql totiado",
                    mensaje: miErrorcito.message,
                    error: miErrorcito,
                });
            });
        });
    }
    static actualiceloVarios(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                let actualizado = false;
                const cubi = yield consulta.one(sql_comidas_1.SQL_COMIDAS.HOW_MANY, [
                    datos.idComida,
                    datos.nombreComida,
                ]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    //const like = datos.nombreComida + "%";
                    respuBase = yield consulta.none(sql_comidas_1.SQL_COMIDAS.UPDATE_MASIVO, [
                        datos.idTipoComida,
                    ]);
                    actualizado = true;
                }
                return { queHacer, actualizado, respuBase };
            }))
                .then(({ queHacer, actualizado, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res
                            .status(200)
                            .json({
                            respuesta: "Compita no existe",
                            actualizado: actualizado,
                        });
                        break;
                    default:
                        res
                            .status(200)
                            .json({
                            respuesta: "Actualizado con exito",
                            actualizado: actualizado,
                        });
                        break;
                }
            })
                .catch((miError) => {
                res
                    .status(400)
                    .json({
                    respuesta: "Pailas, sql totiado",
                    mensaje: miError.message,
                    error: miError,
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
                const cubi = yield consulta.one(sql_comidas_1.SQL_COMIDAS.HOW_MANY, [
                    datos.idComida,
                    datos.nombreComida,
                ]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    //const like = datos.nombreComida + "%";
                    respuBase = yield consulta.none(sql_comidas_1.SQL_COMIDAS.UPDATE, [
                        datos.nombreComida,
                        datos.idTipoComida,
                        datos.idComida,
                    ]);
                    actualizado = true;
                }
                return { queHacer, actualizado, respuBase };
            }))
                .then(({ queHacer, actualizado, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res
                            .status(200)
                            .json({
                            respuesta: "Compita no existe",
                            actualizado: actualizado,
                        });
                        break;
                    default:
                        res
                            .status(200)
                            .json({
                            respuesta: "Actualizado con exito",
                            actualizado: actualizado,
                        });
                        break;
                }
            })
                .catch((miError) => {
                res
                    .status(400)
                    .json({
                    respuesta: "Pailas, sql totiado",
                    mensaje: miError.message,
                    error: miError,
                });
            });
        });
    }
}
exports.default = ComidaDAO;
