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
const sql_ubicaciones_1 = require("../repository/sql_ubicaciones");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class UbicacionDAO {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.result(sql_ubicaciones_1.SQL_UBICACIONES.GET_ALL).then((resultado) => {
                res.status(200).json(resultado.rows);
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({
                    "Respuesta": "No funciona"
                });
            });
        });
    }
    ;
    static grabeloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_ubicaciones_1.SQL_UBICACIONES.HOW_MANY, [datos.idUbicacion]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    const validacion = yield consulta.one(sql_ubicaciones_1.SQL_UBICACIONES.GET_REPEATED, [datos.nombreUbicacion, datos.idPadre]);
                    if (validacion.total_repetidos == 0) {
                        queHacer = 3;
                        respuBase = yield consulta.one(sql_ubicaciones_1.SQL_UBICACIONES.ADD, [datos.nombreUbicacion, datos.idPadre]);
                    }
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe la ubicación" });
                        break;
                    case 2:
                        res.status(400).json({ respuesta: "La misma ubicación ya fue creada" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Se totió mano" });
            });
        });
    }
    ;
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default.task((consulta) => {
                return consulta.result(sql_ubicaciones_1.SQL_UBICACIONES.DELETE, [datos.idUbicacion]);
            }).then((respuesta) => {
                res.status(200).json({
                    respuesta: "Lo borré sin miedo",
                    info: respuesta.rowCount,
                });
            }).catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "No se puede borrar esa ubicacion." });
            });
        });
    }
    ;
    static actualiceloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_ubicaciones_1.SQL_UBICACIONES.HOW_MANY, [datos.idUbicacion]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_ubicaciones_1.SQL_UBICACIONES.UPDATE, [datos.nombreUbicacion, datos.idPadre]);
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
                console.log(miError);
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
        });
    }
}
exports.default = UbicacionDAO;
