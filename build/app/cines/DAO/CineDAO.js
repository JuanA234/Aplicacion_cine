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
                const cubi = yield consulta.many(sql_cine_1.SQL_CINES.TOTAL);
                const rows = cubi[0].count;
                const offset = (page - 1) * tamPag;
                const resultado = yield consulta.result(sql_cine_1.SQL_CINES.GET_ALL, [tamPag, offset]);
                return { resultado, rows };
            }))
                .then(({ resultado, rows }) => {
                res.status(200).json({
                    cines: resultado.rows,
                    totalCines: rows
                });
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
                const cubi = yield consulta.one(sql_cine_1.SQL_CINES.HOW_MANY, [datos.idCine, datos.nombreCine]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(sql_cine_1.SQL_CINES.ADD, [datos.nombreCine, datos.idUbicacion]);
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe el cine" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
                .catch((miError) => {
                res.status(400).json({ respuesta: "Se totio mano",
                    mensaje: miError.message,
                });
            });
        });
    }
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default
                .task((consulta) => {
                return consulta.result(sql_cine_1.SQL_CINES.DELETE, [datos.idCine]);
            })
                .then((respuesta) => {
                res.status(200).json({
                    respuesta: "Lo borre sin miedo",
                    info: respuesta.rowCount,
                });
            })
                .catch((miErrorcito) => {
                res.status(400).json({ respuesta: "Pailas, sql totiado",
                    mensaje: miErrorcito.message,
                    error: miErrorcito
                });
            });
        });
    }
    static actualiceloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_cine_1.SQL_CINES.HOW_MANY, [datos.idCine, datos.nombreCine]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    const like = datos.nombreCine + "%";
                    respuBase = yield consulta.none(sql_cine_1.SQL_CINES.UPDATE_MASIVO, [datos.idUbicacion, like]);
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
                res.status(400).json({ respuesta: "Pailas, sql totiado",
                    mensaje: miError.message,
                    error: miError
                });
            });
        });
    }
}
exports.default = CineDAO;
