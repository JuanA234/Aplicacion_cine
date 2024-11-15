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
const sql_horario_1 = require("../repository/sql_horario");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class HorarioDAO {
    static obtenerTodo(tamPag, page, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const cubi = yield consulta.many(sql_horario_1.SQL_HORARIOS.TOTAL);
                const rows = cubi[0].count;
                const offset = (page - 1) * tamPag;
                const resultado = yield consulta.result(sql_horario_1.SQL_HORARIOS.GET_ALL, [tamPag, offset]);
                return { resultado, rows };
            }))
                .then(({ resultado, rows }) => {
                res.status(200).json({
                    menus: resultado.rows,
                    totalMenus: rows
                });
                res.status(200).json({
                    totalMenus: rows,
                    menus: resultado.rows
                });
            }).catch((miError) => {
                res.status(400).json({
                    "respuesta": "ay no sirve",
                    mensaje: miError.message,
                    Error: miError,
                    NombreError: miError.name
                });
            });
        });
    }
    static grabeloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_horario_1.SQL_HORARIOS.HOW_MANY, [datos.idHorario]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    const validacion = yield consulta.one(sql_horario_1.SQL_HORARIOS.GET_REPEATED, [datos.fecha, datos.hora, datos.idPelicula]);
                    if (validacion.total_repetidos == 0) {
                        queHacer = 3;
                        respuBase = yield consulta.one(sql_horario_1.SQL_HORARIOS.ADD, [datos.fecha, datos.hora, datos.idPelicula]);
                    }
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe el horario" });
                        break;
                    case 2:
                        res.status(400).json({ respuesta: "El mismo horario ya fue creado" });
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
                return consulta.result(sql_horario_1.SQL_HORARIOS.DELETE, [datos.idHorario]);
            }).then((respuesta) => {
                res.status(200).json({
                    respuesta: "Lo borré sin miedo",
                    info: respuesta.rowCount,
                });
            }).catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "No se puede borrar ese horario." });
            });
        });
    }
    ;
    static actualiceloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_horario_1.SQL_HORARIOS.VERIFY_EXISTENCE_DATE, [datos.fecha]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_horario_1.SQL_HORARIOS.UPDATE_DATES, [datos.fecha]);
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "No existen horarios con la fecha mencionada" });
                        break;
                    default:
                        res.status(200).json({ actualizado: "ok" });
                        break;
                }
            }).catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
        });
    }
}
exports.default = HorarioDAO;
