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
const sql_cargos_1 = require("../repository/sql_cargos");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class CargosDAO {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.result(sql_cargos_1.SQL_CARGOS.GET_ALL, params).then((resultado) => {
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
    static vistaPaginada(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const page = parseInt(params.query.page) || 1; // Valor por defecto a 1
                const limit = parseInt(params.query.limit) || 10; // Valor por defecto a 10
                if (page > limit && page <= 0)
                    return res.status(400).json({ respuesta: "Pagina invalida" });
                const desde = (page - 1) * limit;
                const cargos = yield consulta.manyOrNone(sql_cargos_1.SQL_CARGOS.GET_PAGE, [Number(limit), Number(desde)]);
                return cargos;
            })).then((cargos) => {
                res.status(200).json(cargos);
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
            yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_cargos_1.SQL_CARGOS.HOW_MANY, [datos.idCargo, datos.nombreCargo]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(sql_cargos_1.SQL_CARGOS.ADD, [datos.nombreCargo, datos.descripcionCargo]);
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "El cargo ya existe" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Ocurrio un error" });
            });
        });
    }
    ;
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default.task((consulta) => {
                return consulta.result(sql_cargos_1.SQL_CARGOS.DELETE, [datos.idCargo]);
            }).then((respuesta) => {
                res.status(200).json({
                    respuesta: "Lo borré sin miedo",
                    info: respuesta.rowCount,
                });
            }).catch((miErrorcito) => {
                res.status(400).json({ error: miErrorcito.detail });
            });
        });
    }
    ;
    static actualizacionMasiva(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                // Verifica si existe el cargo antes de proceder
                const cubi = yield consulta.one(sql_cargos_1.SQL_CARGOS.HOW_MANY_1, [datos.nombreCargo]);
                console.log(cubi);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    console.log(":p");
                    // Ejecutar la actualización masiva con los dos parámetros dinámicos
                    respuBase = yield consulta.none(sql_cargos_1.SQL_CARGOS.MASSIVE_UPDATE, [datos.nombreCargo, datos.descripcionCargo]);
                    console.log(respuBase);
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita no existe la función" });
                        break;
                    case 2:
                        res.status(200).json({ actualizado: "Ok", resultado: respuBase });
                        break;
                }
            })
                .catch((err) => {
                res.status(400).json({ respuesta: err });
            });
        });
    }
    static actualiceloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_cargos_1.SQL_CARGOS.HOW_MANY, [datos.idCargo, datos.nombreCargo]);
                if (cubi.existe != 0) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_cargos_1.SQL_CARGOS.UPDATE, [datos.nombreCargo, datos.descripcionCargo, datos.idCargo]);
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe" });
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
exports.default = CargosDAO;
