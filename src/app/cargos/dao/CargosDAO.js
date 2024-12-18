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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sql_cargos_1 = require("../repository/sql_cargos");
var dbConnection_1 = require("../../../config/connection/dbConnection");
var CargosDAO = /** @class */ (function () {
    function CargosDAO() {
    }
    CargosDAO.obtenerTodo = function (params, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbConnection_1.default.result(sql_cargos_1.SQL_CARGOS.GET_ALL).then(function (resultado) {
                            res.status(200).json(resultado.rows);
                        }).catch(function (miError) {
                            console.log(miError);
                            res.status(400).json({
                                "Respuesta": "No funciona"
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    CargosDAO.grabeloYa = function (datos, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbConnection_1.default.task(function (consulta) { return __awaiter(_this, void 0, void 0, function () {
                            var queHacer, respuBase, cubi;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        queHacer = 1;
                                        return [4 /*yield*/, consulta.one(sql_cargos_1.SQL_CARGOS.HOW_MANY, [datos.idCargo])];
                                    case 1:
                                        cubi = _a.sent();
                                        if (!(cubi.existe == 0)) return [3 /*break*/, 3];
                                        queHacer = 2;
                                        return [4 /*yield*/, consulta.one(sql_cargos_1.SQL_CARGOS.ADD, [datos.nombreCargo, datos.descripcionCargo])];
                                    case 2:
                                        respuBase = _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/, { queHacer: queHacer, respuBase: respuBase }];
                                }
                            });
                        }); }).then(function (_a) {
                            var queHacer = _a.queHacer, respuBase = _a.respuBase;
                            switch (queHacer) {
                                case 1:
                                    res.status(400).json({ respuesta: "El cargo ya existe" });
                                    break;
                                default:
                                    res.status(200).json(respuBase);
                                    break;
                            }
                        }).catch(function (miError) {
                            console.log(miError);
                            res.status(400).json({ respuesta: "Ocurrio un error" });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    CargosDAO.borreloYa = function (datos, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                dbConnection_1.default.task(function (consulta) {
                    return consulta.result(sql_cargos_1.SQL_CARGOS.DELETE, [datos.idCargo]);
                }).then(function (respuesta) {
                    res.status(200).json({
                        respuesta: "Lo borré sin miedo",
                        info: respuesta.rowCount,
                    });
                }).catch(function (miErrorcito) {
                    console.log(miErrorcito);
                    res.status(400).json({ respuesta: "Pailas, sql totiado" });
                });
                return [2 /*return*/];
            });
        });
    };
    ;
    CargosDAO.actualiceloYa = function (datos, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                dbConnection_1.default.task(function (consulta) { return __awaiter(_this, void 0, void 0, function () {
                    var queHacer, respuBase, cubi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                queHacer = 1;
                                return [4 /*yield*/, consulta.one(sql_cargos_1.SQL_CARGOS.HOW_MANY, [datos.idCargo])];
                            case 1:
                                cubi = _a.sent();
                                if (!(cubi.existe != 0)) return [3 /*break*/, 3];
                                queHacer = 2;
                                return [4 /*yield*/, consulta.none(sql_cargos_1.SQL_CARGOS.UPDATE, [datos.nombreCargo, datos.descripcionCargo, datos.idCargo])];
                            case 2:
                                respuBase = _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/, { queHacer: queHacer, respuBase: respuBase }];
                        }
                    });
                }); }).then(function (_a) {
                    var queHacer = _a.queHacer, respuBase = _a.respuBase;
                    switch (queHacer) {
                        case 1:
                            res.status(400).json({ respuesta: "Compita ya existe" });
                            break;
                        default:
                            res.status(200).json({ actualizado: "ok" });
                            break;
                    }
                }).catch(function (miErrorcito) {
                    console.log(miErrorcito);
                    res.status(400).json({ respuesta: "Pailas, sql totiado" });
                });
                return [2 /*return*/];
            });
        });
    };
    return CargosDAO;
}());
exports.default = CargosDAO;
