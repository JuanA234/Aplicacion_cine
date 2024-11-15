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
const sql_cine_1 = require("../repository/sql_cine");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class CineDAO {
    static obtenerTodo(tamPag, page, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const offset = (page - 1) * tamPag;
                const resultado = yield consulta.result(sql_cine_1.SQL_CINES.GET_ALL, [
                    tamPag,
                    offset,
                ]);
                const cubi = yield consulta.manyOrNone(sql_cine_1.SQL_CINES.TOTAL);
                const totalCines = cubi[0].count;
                return { resultado, totalCines };
            }))
                .then(({ resultado, totalCines }) => {
                res.status(200).json({
                    cines: resultado.rows,
                    totalCines: totalCines,
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
                const cubi = yield consulta.one(sql_cine_1.SQL_CINES.HOW_MANY, [
                    datos.idCine,
                    datos.nombreCine,
                ]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(sql_cine_1.SQL_CINES.ADD, [
                        datos.nombreCine,
                        datos.idUbicacion,
                    ]);
                    creado = true;
                }
                return { queHacer, respuBase, creado };
            }))
                .then(({ queHacer, respuBase, creado }) => {
                switch (queHacer) {
                    case 1:
                        res.status(200).json({
                            respuesta: "Compita ya existe el cine",
                            creado: creado,
                        });
                        break;
                    default:
                        res
                            .status(200)
                            .json({
                            respuBase,
                            respuesta: "Creado con exito",
                            creado: creado,
                        });
                        break;
                }
            })
                .catch((miError) => {
                res
                    .status(400)
                    .json({ respuesta: "Se totio mano", mensaje: miError.message });
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
                const existe = yield consulta.one(sql_cine_1.SQL_CINES.EXISTE_OTRA_TABLA, [
                    datos.idCine,
                ]);
                if (existe.existe == 0) {
                    queHacer = 2;
                    respuesta = consulta.result(sql_cine_1.SQL_CINES.DELETE, [datos.idCine]);
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
    static actualiceVarios(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_cine_1.SQL_CINES.HOW_MANY, [
                    datos.idCine,
                    datos.nombreCine,
                ]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    const like = datos.nombreCine + "%";
                    respuBase = yield consulta.none(sql_cine_1.SQL_CINES.UPDATE_MASIVO, [
                        datos.idUbicacion,
                        like,
                    ]);
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
                const cubi = yield consulta.one(sql_cine_1.SQL_CINES.HOW_MANY, [
                    datos.idCine,
                    datos.nombreCine,
                ]);
                let actualizado = false;
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_cine_1.SQL_CINES.UPDATE, [
                        datos.nombreCine,
                        datos.idUbicacion,
                        datos.idCine,
                    ]);
                    actualizado = true;
                }
                return { queHacer, respuBase, actualizado };
            }))
                .then(({ queHacer, respuBase, actualizado }) => {
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
                            respuesta: "Actualizado con éxito",
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
exports.default = CineDAO;
