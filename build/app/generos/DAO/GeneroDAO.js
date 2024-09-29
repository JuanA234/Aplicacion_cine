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
const sql_generos_1 = require("../repository/sql_generos");
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
class GeneroDAO {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .result(sql_generos_1.SQL_GENEROS.GET_ALL, params)
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
                const cubi = yield consulta.one(sql_generos_1.SQL_GENEROS.HOW_MANY, [datos.idGenero]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(sql_generos_1.SQL_GENEROS.ADD, [datos.nombreGenero]);
                }
                return { queHacer, respuBase };
            })).then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe el género" });
                        break;
                    case 2:
                        res.status(200).json(respuBase);
                        break;
                }
            }).catch(err => {
                console.log(err);
                res.status(400).json({ respuesta: "Se totio mano" });
            });
        });
    }
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default
                .task((consulta) => {
                return consulta.result(sql_generos_1.SQL_GENEROS.DELETE, [datos.idGenero]);
            })
                .then((respuesta) => {
                res.status(200).json({
                    respuesta: "Lo borre sin miedo",
                    info: respuesta.rowCount,
                });
            })
                .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
        });
    }
    static actualizaloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sql_generos_1.SQL_GENEROS.HOW_MANY, [datos.idGenero]);
                if (cubi.existe == 1) {
                    queHacer = 2;
                    respuBase = yield consulta.none(sql_generos_1.SQL_GENEROS.UPDATE, [datos.nombreGenero, datos.idGenero]);
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
                console.log(err);
                res.status(400).json({ respuesta: "Se totio mano" });
            });
        });
    }
}
exports.default = GeneroDAO;
