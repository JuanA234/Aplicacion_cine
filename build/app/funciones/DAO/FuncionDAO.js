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
const sql_funciones_1 = require("../repository/sql_funciones");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class FuncionDAO {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .result(sql_funciones_1.SQL_FUNCIONES.GET_ALL, params)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            }).catch((miError) => {
                res.status(400).json({
                    "respuesta": miError
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
                const cubi = yield consulta.one(sql_funciones_1.SQL_FUNCIONES.HOW_MANY_SPECIFIC, [datos.idSala, datos.idHorario]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(sql_funciones_1.SQL_FUNCIONES.ADD, [datos.idSala, datos.idHorario]);
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe la función" });
                        break;
                    case 2:
                        res.status(200).json(respuBase);
                        break;
                }
            }).catch(err => {
                res.status(400).json({ respuesta: err });
            });
        });
    }
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default
                .task((consulta) => {
                return consulta.result(sql_funciones_1.SQL_FUNCIONES.DELETE, [datos.idFuncion]);
            })
                .then((respuesta) => {
                res.status(200).json({
                    respuesta: "Lo borre sin miedo",
                    info: respuesta.rowCount,
                });
            })
                .catch((miErrorcito) => {
                res.status(400).json({ respuesta: miErrorcito });
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
                const salas = yield consulta.manyOrNone(sql_funciones_1.SQL_FUNCIONES.GET_PAGE, [Number(limit), Number(desde)]);
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
    static cambiarHorarioDeLasSalas(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_funciones_1.SQL_FUNCIONES.HOW_MANY, [datos.idSala]);
                console.log(cubi);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_funciones_1.SQL_FUNCIONES.MASSIVE_UPDATE, [datos.idHorario, datos.idSala]);
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita no existe la función" });
                        break;
                    case 2:
                        res.status(200).json({ acualizado: "Ok" });
                        break;
                }
            }).catch(err => {
                res.status(400).json({ respuesta: err });
            });
        });
    }
    static actualizaloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_funciones_1.SQL_FUNCIONES.HOW_MANY, [datos.idFuncion]);
                if (cubi.existe == 1) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_funciones_1.SQL_FUNCIONES.UPDATE, [datos.idSala, datos.idHorario, datos.idFuncion]);
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita no existe el género" });
                        break;
                    case 2:
                        res.status(200).json({ respuesta: "se actualizo" });
                        break;
                }
            }).catch(err => {
                res.status(400).json({ respuesta: err });
            });
        });
    }
}
exports.default = FuncionDAO;
